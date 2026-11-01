import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, RotateCcw } from 'lucide-react';
import { resetStoredAppData } from '../utils/logic';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ZYPAC Uncaught App Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetAndReload = () => {
    resetStoredAppData();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1F3D33] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white/90 backdrop-blur-md border border-[#E5E0D8] rounded-md p-8 shadow-lg">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#1F3D33] mb-2">
              ZYPAC Portal Restored
            </h1>
            <p className="text-sm text-[#6B6B6B] mb-6 leading-relaxed">
              The portal encountered a temporary rendering condition. You can reload the page or reset the local view to pristine defaults.
            </p>
            {this.state.error && (
              <pre className="text-xs bg-[#FAF8F5] text-red-700 p-3 rounded mb-6 text-left overflow-x-auto border border-[#E5E0D8] max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1F3D33] text-[#FAF8F5] font-display text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#2A4F42] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleResetAndReload}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-[#B08D57] text-[#B08D57] font-display text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#B08D57]/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
