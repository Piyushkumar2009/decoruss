/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/interiors';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: string;
  sourceText?: string;
}

export default function LeadModal({ isOpen, onClose, preselectedCategory = 'Complete Home Interior', sourceText = 'General' }: LeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(preselectedCategory);
  const [propertySize, setPropertySize] = useState('2 BHK (800 - 1200 sq ft)');
  const [budgetRange, setBudgetRange] = useState('₹3.5L - ₹5L');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Sync state if category changes
  React.useEffect(() => {
    if (preselectedCategory) {
      // map categories from services to dropdown choices
      if (preselectedCategory.toLowerCase().includes('kitchen')) {
        setProjectType('Modular Kitchen Design');
      } else if (preselectedCategory.toLowerCase().includes('bedroom')) {
        setProjectType('Bedroom Design');
      } else if (preselectedCategory.toLowerCase().includes('office') || preselectedCategory.toLowerCase().includes('commercial')) {
        setProjectType('Office Interiors');
      } else if (preselectedCategory.toLowerCase().includes('living')) {
        setProjectType('Living Room Design');
      } else {
        setProjectType('Complete Home Interior');
      }
    }
  }, [preselectedCategory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim() || !phone.trim()) {
      setErrorText('Please fill out all required fields.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorText('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Capture Lead
    const newLead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      email: 'Not Provided',
      projectType,
      budgetRange,
      propertySize,
      source: sourceText,
      createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      status: 'New' as const
    };

    // Store in LocalStorage
    try {
      const existingLeadsRaw = localStorage.getItem('decoruss_leads');
      const existingLeads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      localStorage.setItem('decoruss_leads', JSON.stringify([newLead, ...existingLeads]));

      // Dispatch event to update administrative tracker if active
      window.dispatchEvent(new Event('decoruss_leads_updated'));
    } catch (err) {
      console.error('Failed to save lead local', err);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setPropertySize('2 BHK (800 - 1200 sq ft)');
    setBudgetRange('₹3.5L - ₹5L');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm"
          />

          {/* Modal Container: Compact Card Design & Scroll-free layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-[480px] md:max-w-[500px] overflow-hidden rounded-xl bg-white shadow-2xl z-10 mx-auto border border-neutral-100 flex flex-col"
          >
            {/* Elegant Header Accent */}
            <div className="h-[4px] w-full bg-[#C8A45D]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 hover:scale-105 transition-all p-1.5 rounded-full hover:bg-neutral-50 z-20"
              aria-label="Close"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {!isSubmitted ? (
              <div className="p-4 sm:p-5 flex flex-col justify-between">
                {/* Visual context header compact */}
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F8F5EE] rounded text-[#C8A45D] text-[9px] font-bold tracking-widest uppercase">
                    <Sparkles className="h-2.5 w-2.5" />
                    Estimate Pricing Form
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 tracking-tight leading-tight">
                  Calculate Instant Design Quotes
                </h3>
                <p className="text-[10px] text-neutral-500 mt-0.5 mb-3.5 font-sans leading-relaxed">
                  Lucknow’s gold standard on-site spatial planning. Submit details to review real material price charts.
                </p>

                {errorText && (
                  <div className="mb-3 text-[10px] font-semibold text-red-600 bg-red-50 py-1.5 px-2.5 rounded border border-red-100">
                    {errorText}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-2.5 font-sans text-xs">
                  {/* Name field */}
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-neutral-200 outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all bg-neutral-50 focus:bg-white text-neutral-800 text-xs"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 99366 28880"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-neutral-200 outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all bg-neutral-50 focus:bg-white text-neutral-800 text-xs"
                    />
                  </div>

                  {/* Dropdowns row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[9px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-2.5 py-1.5 md:py-2 rounded border border-neutral-200 outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all bg-white text-neutral-800 text-xs"
                      >
                        <option value="Complete Home Interior">Complete Home</option>
                        <option value="Modular Kitchen Design">Modular Kitchen</option>
                        <option value="Bedroom Design">Bespoke Bedroom</option>
                        <option value="Living Room Design">Living Lounge</option>
                        <option value="Office Interiors">Commercial/Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Property Size
                      </label>
                      <select
                        value={propertySize}
                        onChange={(e) => setPropertySize(e.target.value)}
                        className="w-full px-2.5 py-1.5 md:py-2 rounded border border-neutral-200 outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all bg-white text-neutral-800 text-xs"
                      >
                        <option value="1 BHK (500 - 800 sq ft)">1 BHK (500-800 sq ft)</option>
                        <option value="2 BHK (800 - 1200 sq ft)">2 BHK (800-1200 sq ft)</option>
                        <option value="3 BHK (1200 - 1800 sq ft)">3 BHK (1200-1800 sq ft)</option>
                        <option value="4 BHK / Villa (1800+ sq ft)">4 BHK / Villa (1800+ sq ft)</option>
                        <option value="Commercial / Other">Commercial / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Dropdown */}
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Estimated Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-2.5 py-2 rounded border border-neutral-200 outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all bg-white text-neutral-800 text-xs"
                    >
                      <option value="₹1.5L - ₹3.5L">₹1.5 Lakh - ₹3.5 Lakh</option>
                      <option value="₹3.5L - ₹5L">₹3.5 Lakh - ₹5 Lakh</option>
                      <option value="₹5L - ₹8L">₹5 Lakh - ₹8 Lakh</option>
                      <option value="₹8L - ₹15L">₹8 Lakh - ₹15 Lakh</option>
                      <option value="₹15L+">Premium Turnkey (₹15 Lakh+)</option>
                    </select>
                  </div>

                  {/* Submission Action - Compact & always visible */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-neutral-950 text-white rounded font-bold uppercase tracking-widest hover:bg-[#C8A45D] transition-all duration-300 text-[10px] flex items-center justify-center gap-1.5 shadow-md active:translate-y-0.5 cursor-pointer"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#C8A45D]" />
                      Calculate My Estimate
                    </button>
                  </div>

                  <div className="text-center font-mono text-[9px] text-neutral-400 mt-1">
                    ✓ Verified BWR Core Ply • 10-Year official Warranty
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-5 text-center font-sans">
                <div className="w-11 h-11 bg-[#F8F5EE] text-[#C8A45D] rounded-full flex items-center justify-center mx-auto mb-3.5">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg text-neutral-900 tracking-tight leading-tight">
                  Estimate Submitted!
                </h3>
                <p className="text-[11px] text-neutral-600 mt-1.5 mb-4 max-w-sm mx-auto leading-relaxed">
                  Excellent, <strong>{name}</strong>! We are analyzing quotes for a <strong>{propertySize}</strong> size project with category <strong>{projectType}</strong>. An on-site engineer will reach you on <strong>{phone}</strong> directly to offer free blueprints.
                </p>

                <div className="bg-[#F8F5EE] p-3 rounded-lg text-left border border-[#C8A45D]/20 mb-4 text-[10px]">
                  <h4 className="font-bold text-[#C8A45D] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    Bespoke Layout Parameters:
                  </h4>
                  <ul className="space-y-0.5 font-mono text-neutral-700">
                    <li><strong>Layout Category:</strong> {projectType}</li>
                    <li><strong>Space Dimension:</strong> {propertySize}</li>
                    <li><strong>Budget Range:</strong> {budgetRange}</li>
                  </ul>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-neutral-950 text-white hover:bg-[#C8A45D] rounded text-[10px] font-bold uppercase tracking-widest cursor-pointer"
                >
                  Configure Another Space
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
