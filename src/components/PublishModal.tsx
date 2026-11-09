/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppData } from '../types';
import {
  downloadLiveIndexHtml,
  downloadNetlifyDeployZip,
  downloadDefaultDataTs,
  downloadDataJson,
} from '../utils/publishHelper';
import {
  pushDataToGitHub,
  getSavedGitHubConfig,
  saveGitHubConfig,
} from '../utils/githubSync';
import {
  Globe,
  Download,
  FileCode,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  HelpCircle,
  ExternalLink,
  GitCommit,
  GitBranch,
  Key,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppData;
  onImportData: (data: AppData) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  data,
  onImportData,
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'zip' | 'manual'>('github');

  // GitHub Direct Sync State
  const [owner, setOwner] = useState('joshith498-crypto');
  const [repo, setRepo] = useState('ZHSYP1');
  const [branch, setBranch] = useState('main');
  const [token, setToken] = useState('');
  const [showTokenHelp, setShowTokenHelp] = useState(false);
  const [pushingGit, setPushingGit] = useState(false);
  const [gitStatusMessage, setGitStatusMessage] = useState('');
  const [gitSuccessResult, setGitSuccessResult] = useState<{ commitSha?: string; commitUrl?: string } | null>(null);
  const [gitError, setGitError] = useState<string | null>(null);

  // Download states
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedGitHubConfig();
      if (saved.owner) setOwner(saved.owner);
      if (saved.repo) setRepo(saved.repo);
      if (saved.branch) setBranch(saved.branch);
      if (saved.token) setToken(saved.token);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePushToGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    setGitError(null);
    setGitSuccessResult(null);

    if (!token.trim()) {
      setGitError('Please enter your GitHub Personal Access Token to commit changes directly.');
      return;
    }

    setPushingGit(true);
    saveGitHubConfig(owner, repo, branch, token);

    const result = await pushDataToGitHub(
      data,
      {
        token,
        owner,
        repo,
        branch,
      },
      (msg) => setGitStatusMessage(msg)
    );

    setPushingGit(false);

    if (result.success) {
      setGitSuccessResult({
        commitSha: result.commitSha,
        commitUrl: result.commitUrl,
      });
      setGitStatusMessage('');
    } else {
      setGitError(result.error || 'Failed to push commit to GitHub.');
    }
  };

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      await downloadNetlifyDeployZip(data);
      setDownloadSuccess('zypac_netlify_deploy.zip downloaded! Ready to drag onto Netlify.');
      setTimeout(() => setDownloadSuccess(null), 8000);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadHtml = async () => {
    try {
      setDownloadingHtml(true);
      await downloadLiveIndexHtml(data);
      setDownloadSuccess('index.html downloaded with all your edits embedded!');
      setTimeout(() => setDownloadSuccess(null), 8000);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingHtml(false);
    }
  };

  const handleDownloadTs = () => {
    downloadDefaultDataTs(data);
    setDownloadSuccess('defaultData.ts downloaded! Replace src/data/defaultData.ts in your repo.');
    setTimeout(() => setDownloadSuccess(null), 8000);
  };

  const handleDownloadJson = () => {
    downloadDataJson(data);
    setDownloadSuccess('zypac_portal_data.json exported successfully!');
    setTimeout(() => setDownloadSuccess(null), 8000);
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.home && parsed.schedule) {
          onImportData(parsed);
          setDownloadSuccess('Data imported successfully! Edits are now loaded in the portal.');
          setTimeout(() => setDownloadSuccess(null), 8000);
        } else {
          alert('Invalid ZYPAC data file format.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#FAF8F5] border border-[#B08D57]/40 rounded-xl shadow-2xl max-w-2xl w-full p-6 text-[#1F3D33] my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#1F3D33]/10 text-[#1F3D33] flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#B08D57]" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-[#1F3D33]">
              Publish Changes to Netlify &amp; Git
            </h2>
            <p className="text-xs text-stone-500">
              Push your edits directly into your Git repository so Netlify automatically updates for everyone.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 mt-4 mb-5">
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'border-[#1F3D33] text-[#1F3D33]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <GitCommit className="w-4 h-4 text-[#B08D57]" />
            <span>Direct Git Push (Auto-Deploy)</span>
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-bold">
              Automated
            </span>
          </button>

          <button
            onClick={() => setActiveTab('zip')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'zip'
                ? 'border-[#1F3D33] text-[#1F3D33]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#B08D57]" />
            <span>Netlify Drag &amp; Drop (.ZIP)</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'manual'
                ? 'border-[#1F3D33] text-[#1F3D33]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Download Files</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* TAB 1: Direct GitHub Sync */}
        {activeTab === 'github' && (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-[#E5E0D8] shadow-xs">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#1F3D33] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#B08D57]" />
                    <span>Push Directly to Your GitHub Repository</span>
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    This updates <code className="bg-stone-100 text-[#1F3D33] px-1 py-0.5 rounded text-[11px]">src/data/defaultData.ts</code> in your repo. Netlify will immediately detect the commit and deploy live!
                  </p>
                </div>
              </div>

              {gitSuccessResult && (
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Pushed successfully to GitHub! (Commit {gitSuccessResult.commitSha})</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-7">
                    Netlify is now automatically building your site with your latest admin edits. In about 20–30 seconds, your changes will be visible to all visitors worldwide.
                  </p>
                  <div className="pt-1 pl-7 flex items-center gap-3">
                    {gitSuccessResult.commitUrl && (
                      <a
                        href={gitSuccessResult.commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#1F3D33] font-semibold underline"
                      >
                        <span>View Commit on GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href="https://app.netlify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1F3D33] font-semibold underline"
                    >
                      <span>Check Netlify Deploy Status</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {gitError && (
                <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-900">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">GitHub Push Error:</strong>
                    <span>{gitError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handlePushToGitHub} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      GitHub Owner / Username
                    </label>
                    <input
                      type="text"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      placeholder="e.g. joshith498-crypto"
                      required
                      className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded text-xs font-mono text-stone-800 focus:outline-hidden focus:border-[#1F3D33]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Repository Name
                    </label>
                    <input
                      type="text"
                      value={repo}
                      onChange={(e) => setRepo(e.target.value)}
                      placeholder="e.g. ZHSYP1"
                      required
                      className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded text-xs font-mono text-stone-800 focus:outline-hidden focus:border-[#1F3D33]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Branch
                    </label>
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="main"
                        required
                        className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded text-xs font-mono text-stone-800 focus:outline-hidden focus:border-[#1F3D33]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-stone-700 flex items-center gap-1">
                      <Key className="w-3 h-3 text-[#B08D57]" />
                      <span>GitHub Personal Access Token</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowTokenHelp(!showTokenHelp)}
                      className="text-[11px] text-[#B08D57] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>How to get a token (30s)</span>
                      {showTokenHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    required
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-300 rounded text-xs font-mono text-stone-800 focus:outline-hidden focus:border-[#1F3D33]"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    Stored safely only inside your local browser. Never shared or sent anywhere except directly to api.github.com.
                  </p>
                </div>

                {showTokenHelp && (
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-700 space-y-1.5">
                    <div className="font-semibold text-stone-900">How to create a free GitHub Token:</div>
                    <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1">
                      <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-[#1F3D33] font-semibold underline inline-flex items-center gap-0.5">github.com/settings/tokens <ExternalLink className="w-2.5 h-2.5" /></a></li>
                      <li>Click <strong>Generate new token (classic)</strong>.</li>
                      <li>Note: &quot;ZYPAC Admin Sync&quot; &rarr; check the <strong>repo</strong> checkbox (Full control of repositories).</li>
                      <li>Click <strong>Generate token</strong> at the bottom &rarr; copy and paste it into the box above.</li>
                    </ol>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    {pushingGit && (
                      <span className="flex items-center gap-1.5 text-[#1F3D33] font-medium animate-pulse">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B08D57]" />
                        <span>{gitStatusMessage || 'Communicating with GitHub...'}</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={pushingGit}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F3D33] hover:bg-[#2A4F42] text-[#FAF8F5] rounded-md font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {pushingGit ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B08D57]" />
                        <span>Pushing to GitHub...</span>
                      </>
                    ) : (
                      <>
                        <GitCommit className="w-3.5 h-3.5 text-[#B08D57]" />
                        <span>Push to GitHub &amp; Trigger Netlify Deploy</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Netlify Drag & Drop ZIP */}
        {activeTab === 'zip' && (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-[#E5E0D8] shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                <div>
                  <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#B08D57]/20 text-[#1F3D33] rounded-xs mb-1">
                    No GitHub Token Needed
                  </span>
                  <h3 className="text-sm font-bold text-[#1F3D33]">
                    Download Netlify Deploy ZIP
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Download this pre-built package with your edits baked in, then drag it straight onto Netlify.
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  disabled={downloadingZip}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#1F3D33] hover:bg-[#2A4F42] text-[#FAF8F5] rounded-md font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>{downloadingZip ? 'Packaging ZIP...' : 'Download Netlify ZIP'}</span>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1.5 bg-stone-50/80 p-3 rounded-md">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <UploadCloud className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>How to drop it onto Netlify (takes 5 seconds):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1">
                  <li>Click <strong>&quot;Download Netlify ZIP&quot;</strong> above.</li>
                  <li>Go to your Netlify Dashboard (<a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#1F3D33] font-semibold underline inline-flex items-center gap-0.5">app.netlify.com <ExternalLink className="w-2.5 h-2.5" /></a>).</li>
                  <li>Click your site &rarr; go to the <strong>&quot;Deploys&quot;</strong> tab.</li>
                  <li>Drag &amp; drop <strong>zypac_netlify_deploy.zip</strong> onto the <em>&quot;Need to update your site? Drag and drop here&quot;</em> box.</li>
                  <li>Netlify publishes in 5 seconds for all visitors!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Manual File Downloads & Backup */}
        {activeTab === 'manual' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-white rounded-lg border border-[#E5E0D8]">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#B08D57]" />
                  <h4 className="text-xs font-bold text-[#1F3D33]">defaultData.ts (for Git repo)</h4>
                </div>
                <p className="text-[11px] text-stone-500 mb-2.5 leading-relaxed">
                  Download and manually commit into <code className="bg-stone-100 px-1 py-0.5 rounded text-[10px]">src/data/defaultData.ts</code> in your GitHub repo.
                </p>
                <button
                  onClick={handleDownloadTs}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download defaultData.ts</span>
                </button>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#E5E0D8]">
                <div className="flex items-center gap-2 mb-1">
                  <FileCode className="w-4 h-4 text-[#B08D57]" />
                  <h4 className="text-xs font-bold text-[#1F3D33]">Single index.html</h4>
                </div>
                <p className="text-[11px] text-stone-500 mb-2.5 leading-relaxed">
                  Self-contained HTML file with all your edits embedded.
                </p>
                <button
                  onClick={handleDownloadHtml}
                  disabled={downloadingHtml}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-[#1F3D33] text-[#1F3D33] hover:bg-[#1F3D33] hover:text-[#FAF8F5] rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>{downloadingHtml ? 'Generating...' : 'Download index.html'}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-100/70 rounded-lg text-xs text-stone-600">
              <span className="font-medium text-stone-700">Backup &amp; Sync across devices:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadJson}
                  className="px-2.5 py-1 bg-white border border-stone-300 hover:border-stone-400 rounded text-stone-700 font-medium transition-colors cursor-pointer text-[11px]"
                >
                  Export JSON
                </button>
                <label className="px-2.5 py-1 bg-white border border-stone-300 hover:border-stone-400 rounded text-stone-700 font-medium transition-colors cursor-pointer text-[11px]">
                  Import JSON
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleJsonUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
          <div className="flex items-center gap-1 text-stone-500 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Pushing to GitHub triggers Netlify to automatically build and deploy to all visitors.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F3D33] text-[#FAF8F5] rounded text-xs font-semibold hover:bg-[#2A4F42] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
