import React, { useState, useEffect } from 'react';
import { ReservedLead } from '../../types/lead';
import {
  X,
  Users,
  Search,
  MessageCircle,
  ExternalLink,
  Trash2,
  Calendar,
  Globe,
  Building,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Sparkles,
  Lock,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'codezilla_reserved_leads';
const ADMIN_PASSWORD = '08030795206';

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<ReservedLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Password lock state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadLeads();
      setIsAuthenticated(false);
      setPasswordInput('');
      setPasswordError('');
    }
  }, [isOpen]);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch {
      setLeads([]);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = passwordInput.replace(/\D/g, '');
    if (
      passwordInput.trim() === ADMIN_PASSWORD ||
      cleaned === '08030795206' ||
      cleaned === '2348030795206'
    ) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Invalid Password / PIN. Access denied.');
    }
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter(l =>
    l.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.slotCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.includes(searchQuery)
  );

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all stored lead records?')) {
      localStorage.removeItem(STORAGE_KEY);
      setLeads([]);
    }
  };

  const getDirectChatUrl = (lead: ReservedLead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const priceDisplay = lead.lockedPriceCAD ? `$${lead.lockedPriceCAD} CAD` : '$10 CAD';
    const text = encodeURIComponent(
      `Hello ${lead.contactName}, thank you for reserving your ${priceDisplay} website slot (${lead.slotCode}) for ${lead.businessName} on SalesWithOlaide! Our engineering team is ready to begin your 48-hour setup.`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161310] border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-white">
        {!isAuthenticated ? (
          /* Locked Password Gate */
          <div>
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-white">
                    Protected Leads Desk
                  </h2>
                  <p className="text-xs text-stone-400">
                    Enter Admin Security Password to access captured lead reservations
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-lg">
                <KeyRound className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-2xl text-white">
                  Enter Admin Password
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  This portal holds reserved customer contact records. Enter your admin password to view the dashboard.
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4 text-left">
                <div>
                  <label className="block text-stone-300 text-xs font-semibold mb-1">
                    Agency Admin Password:
                  </label>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Enter Admin Password..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-white font-mono placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>

                {passwordError && (
                  <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-98"
                >
                  <Lock className="w-4 h-4 fill-stone-950" />
                  <span>Unlock Leads Desk</span>
                </button>
              </form>
            </div>

            <div className="p-4 border-t border-stone-800 bg-stone-950 text-center text-xs text-stone-500">
              Authorized Personnel Only · Password Protected
            </div>
          </div>
        ) : (
          /* Unlocked Lead Records View */
          <>
            {/* Header */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-white">
                    Captured Leads & Reserved Slots ({leads.length})
                  </h2>
                  <p className="text-xs text-stone-400">
                    Prospective business owners who reserved the $10 CAD subsidized launch offer
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar & Stats */}
            <div className="p-4 bg-stone-900/60 border-b border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by business, name or slot code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-stone-400">
                  Total Captured: <strong className="text-amber-400 font-mono">{leads.length}</strong>
                </span>

                {leads.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-stone-500 hover:text-rose-400 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Lead List Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Users className="w-12 h-12 text-stone-700 mx-auto" />
                  <h3 className="font-serif font-bold text-lg text-stone-300">
                    {leads.length === 0 ? 'No Leads Captured Yet' : 'No matching leads found'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    {leads.length === 0
                      ? 'Submit the reservation form on the homepage to generate your first test lead and reservation ticket!'
                      : 'Try searching with another keyword.'}
                  </p>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 bg-stone-900/90 border border-stone-800 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {lead.slotCode}
                        </span>
                        <h3 className="font-serif font-bold text-base text-white">
                          {lead.businessName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-500" />
                          <span>{new Date(lead.timestamp).toLocaleDateString()} at {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {lead.status}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">Contact / Owner</span>
                        <span className="text-stone-200 font-semibold">{lead.contactName}</span>
                        <div className="text-stone-400 font-mono mt-0.5">{lead.phone}</div>
                        {lead.email && <div className="text-stone-400 text-[11px]">{lead.email}</div>}
                      </div>

                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">Subdomain & Region</span>
                        <span className="font-mono text-amber-300 font-bold block mt-0.5 break-all">
                          https://{lead.subdomain}
                        </span>
                        <span className="text-stone-400 text-[11px]">{lead.region}</span>
                      </div>

                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">Template & Price</span>
                        <span className="text-stone-200 font-medium">{lead.templateName}</span>
                        <div className="text-emerald-400 font-mono font-bold mt-0.5">
                          {lead.lockedPriceCAD ? `$${lead.lockedPriceCAD} CAD` : '$10 CAD'} (Saved ${(lead.originalPriceCAD || 180) - (lead.lockedPriceCAD || 10)} CAD)
                        </div>
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="p-2.5 bg-stone-950/70 rounded-lg text-xs text-stone-300 border border-stone-850">
                        <span className="text-stone-500 font-semibold mr-1.5">Notes:</span>
                        <span>{lead.notes}</span>
                      </div>
                    )}

                    {/* Direct Action */}
                    <div className="pt-1 flex items-center justify-end gap-2">
                      <a
                        href={getDirectChatUrl(lead)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-stone-950" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
              <span>All lead reservations are safely persisted locally in real time.</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
