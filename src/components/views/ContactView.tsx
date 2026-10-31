/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContactData, RoleContact, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Edit2, ShieldAlert } from 'lucide-react';

interface ContactViewProps {
  data: ContactData;
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onEditContact: (contact: RoleContact) => void;
  onEditHeader: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  data,
  isAdmin,
  onNavigate,
  onEditContact,
  onEditHeader,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleOrSchool: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
    // Persist or log inquiry
    setFormData({
      name: '',
      email: '',
      roleOrSchool: '',
      subject: '',
      message: '',
    });
    setTimeout(() => {
      // Keep feedback visible for clarity
    }, 4000);
  };

  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#E5E0D8] bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>Secretariat Inquiries</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] tracking-tight mb-4">
          Role-Wise Secretariat Contacts
        </h1>

        <p className="max-w-2xl mx-auto text-base text-[#6B6B6B] leading-relaxed">
          For specialized questions regarding credentials, rules, technical facilities, or academic escalation, reach out directly to the responsible officer.
        </p>

        {/* Official Email Banner */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 p-4 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs text-sm">
          <span className="text-xs uppercase tracking-wider font-bold text-[#1F3D33]">
            Official Dispatch Desk:
          </span>
          <a
            href={`mailto:${data.officialEmail}`}
            className="font-medium text-[#1F3D33] hover:text-[#B08D57] underline"
          >
            {data.officialEmail}
          </a>
          {isAdmin && (
            <button
              onClick={onEditHeader}
              className="text-xs text-[#B08D57] hover:text-[#1F3D33] ml-2 flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Email/Address</span>
            </button>
          )}
        </div>
      </section>

      {/* Grid: Role-wise Contacts (5 designated roles) */}
      <section>
        <div className="text-center max-w-md mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold">
            Designated Portfolios
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F3D33] mt-1">
            Committee Directory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.roleContacts.map((contact) => (
            <div
              key={contact.id}
              className="card-subtle p-6 rounded-sm border border-[#E5E0D8] hover:border-[#1F3D33] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B08D57]">
                    {contact.scope}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => onEditContact(contact)}
                      className="text-xs text-[#B08D57] hover:text-[#1F3D33] cursor-pointer"
                      title="Edit officer details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-[#1F3D33]">
                  {contact.role}
                </h3>
                <p className="text-sm font-medium text-[#2B2B2B] mt-1">
                  {contact.personName}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5E0D8] space-y-2 text-xs text-[#6B6B6B]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-[#1F3D33] underline truncate"
                  >
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Contact Form */}
      <section className="card-subtle p-8 sm:p-10 rounded-sm border border-[#E5E0D8] max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
            Direct Dispatch
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F3D33] mt-1">
            Send an Official Message
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-1">
            Inquiries will be routed to the respective desk officer within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#1F3D33]/10 border border-[#1F3D33]/20 rounded-xs text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#1F3D33] mx-auto" />
            <h4 className="font-heading text-xl font-bold text-[#1F3D33]">
              Dispatch Transmitted Successfully
            </h4>
            <p className="text-sm text-[#2B2B2B]">
              Thank you. Your message has been logged with the ZYPAC Secretariat. The designated desk officer will follow up via your email.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 text-xs text-[#1F3D33] underline font-medium cursor-pointer"
            >
              Send another dispatch
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3D33] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Delegate or Guest Name"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3D33] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.com"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3D33] mb-1">
                  Institutional Affiliation / Role
                </label>
                <input
                  type="text"
                  value={formData.roleOrSchool}
                  onChange={(e) => setFormData({ ...formData, roleOrSchool: e.target.value })}
                  placeholder="e.g., Lok Sabha Delegate / Faculty"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3D33] mb-1">
                  Inquiry Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Schedule clarification or RoP inquiry"
                  className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F3D33] mb-1">
                Message Body *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="State your question or procedural notice clearly..."
                className="w-full px-3 py-2 bg-white border border-[#E5E0D8] rounded-xs text-sm text-[#2B2B2B] focus:outline-none focus:border-[#1F3D33]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-sm font-medium rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#B08D57]" />
              <span>Submit Dispatch to Secretariat</span>
            </button>
          </form>
        )}
      </section>

      {/* Page Flow: Next link loops back to Home */}
      <PageFlowNext currentPage="contact" onNavigate={onNavigate} />
    </div>
  );
};
