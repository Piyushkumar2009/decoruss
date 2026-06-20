/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Database, X, Trash2, CheckCircle2, User, Phone, Mail, Award, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead } from '../types';

export default function LeadTrackerDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [unseenCount, setUnseenCount] = useState(0);

  // Load leads from localStorage
  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('decoruss_leads');
      if (stored) {
        const parsed = JSON.parse(stored) as Lead[];
        setLeads(parsed);
      } else {
        // Hydrate with 1 realistic initial lead for illustrative design if empty
        const sampleLead: Lead = {
          id: 'lead-sample',
          name: 'Sanjeev Goel (Demo)',
          phone: '9936628880',
          email: 'sanjeev@decoruss.com',
          projectType: 'Residential Interior',
          budgetRange: '₹8L - ₹15L',
          message: 'Interested in designing my 4BHK villa at Gomti Nagar, Lucknow.',
          source: 'Sample Lead',
          createdAt: '10:15 AM Today',
          status: 'New'
        };
        localStorage.setItem('decoruss_leads', JSON.stringify([sampleLead]));
        setLeads([sampleLead]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLeads();

    // Listen to custom local storage update events
    const handleUpdate = () => {
      loadLeads();
      setUnseenCount(prev => prev + 1);
    };

    // Keyboard Hotkey Listener to open Lead Tracker internally (Alt + L or Ctrl + Shift + L)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'l') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setUnseenCount(0);
      }
    };

    // Custom window event dispatch interface
    const handleOpenConsole = () => {
      setIsOpen(true);
      setUnseenCount(0);
    };

    window.addEventListener('decoruss_leads_updated', handleUpdate);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open_lead_tracker', handleOpenConsole);

    return () => {
      window.removeEventListener('decoruss_leads_updated', handleUpdate);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open_lead_tracker', handleOpenConsole);
    };
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'New' | 'Contacted' | 'Meeting Booked' | 'Closed') => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('decoruss_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (id: string) => {
    const filtered = leads.filter(l => l.id !== id);
    setLeads(filtered);
    localStorage.setItem('decoruss_leads', JSON.stringify(filtered));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all session captured leads?')) {
      localStorage.removeItem('decoruss_leads');
      setLeads([]);
    }
  };

  return (
    <>
      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Soft Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-[#C8A45D]/20 overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 bg-[#1E1E1E] text-white flex items-center justify-between border-b border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <Database className="h-5 w-5 text-[#C8A45D]" />
                    <div>
                      <h3 className="font-serif text-lg tracking-tight text-white">Decoruss Lead Pipeline</h3>
                      <p className="text-[10px] text-neutral-400 font-mono">Real-time local state engine (LocalStorage)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50">
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pb-2 border-b border-neutral-200">
                    <span>STATUS PANEL</span>
                    {leads.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Clear Leads
                      </button>
                    )}
                  </div>

                  {leads.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-dashed border-neutral-300">
                      <Clock className="h-8 w-8 text-neutral-300 mb-2 animate-pulse" />
                      <p className="text-sm font-semibold text-neutral-600">No active leads captured yet</p>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-normal">
                        Fill out any of the consultation forms on the page to see live leads added here instantaneously.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white border border-[#C8A45D]/10 rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#C8A45D]/30 transition-all"
                        >
                          {/* Banner Source Badge */}
                          <div className="absolute right-0 top-0 text-[9px] font-mono font-bold bg-[#F8F5EE] text-[#C8A45D] px-2.5 py-1 rounded-bl-lg">
                            Via: {lead.source}
                          </div>

                          {/* Lead Information */}
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-neutral-400" />
                              <h4 className="font-semibold text-neutral-800 text-sm">{lead.name}</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-600">
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-[#C8A45D]" />
                                <span>{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-1 overflow-hidden text-ellipsis">
                                <Mail className="h-3 w-3 text-[#C8A45D]" />
                                <span className="truncate">{lead.email}</span>
                              </div>
                            </div>

                            <div className="bg-[#F8F5EE] p-2 rounded-lg text-xs space-y-1 border border-neutral-100">
                              <div className="text-neutral-500 flex justify-between">
                                <span>Project Interest:</span>
                                <span className="font-semibold text-neutral-800">{lead.projectType}</span>
                              </div>
                              <div className="text-neutral-500 flex justify-between">
                                <span>Selected Budget:</span>
                                <span className="font-semibold text-indigo-600 font-mono">{lead.budgetRange}</span>
                              </div>
                              {lead.message && (
                                <div className="text-[11px] text-neutral-600 italic border-t border-neutral-200 pt-1 mt-1 font-sans">
                                  "{lead.message}"
                                </div>
                              )}
                            </div>

                            {/* Status and Action bar */}
                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                              <span className="text-[10px] text-neutral-400 font-mono">Captured {lead.createdAt}</span>

                              <div className="flex items-center gap-2">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                  className="text-xs border border-neutral-200 rounded px-1.5 py-0.5 bg-neutral-50 text-neutral-700 outline-none focus:border-[#C8A45D]"
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Meeting Booked">Meeting Done</option>
                                  <option value="Closed">Closed</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1 text-neutral-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="p-4 bg-[#F8F5EE] border-t border-[#C8A45D]/20 text-xs text-neutral-600 space-y-2 font-sans">
                  <div className="flex items-start gap-1.5">
                    <Award className="h-4 w-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <span>
                      <strong>Conversion Rule:</strong> Every click on buttons like <em>Call Now</em>, <em> WhatsApp</em>, or <em>Book Consultation</em> fires beautiful tracking alerts.
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
