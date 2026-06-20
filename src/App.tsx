/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Compass, 
  Clock, 
  Sparkles, 
  ChefHat, 
  Briefcase, 
  Armchair, 
  Home, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowUpRight, 
  Star, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight, 
  Menu, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  MessageSquare, 
  Calendar,
  ThumbsUp,
  Sliders,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BUSINESS_INFO, 
  HERO_SLIDES, 
  SERVICES, 
  PROJECTS, 
  TESTIMONIALS, 
  CASE_STUDIES, 
  CONTRACTOR_COMPARISON, 
  PROCESS_STEPS, 
  KITCHEN_SHOWCASE_ITEMS, 
  FAQS 
} from './data/interiors';
import LeadModal from './components/LeadModal';
import LeadTrackerDrawer from './components/LeadTrackerDrawer';

// Custom lightweight counter animation for statistics
function CountUp({ end, decimals = 0, suffix = "" }: { end: number; decimals?: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const stepTime = 30; // 30ms step size
    const totalSteps = duration / stepTime;
    const stepIncrement = end / totalSteps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <>{value.toFixed(decimals)}{suffix}</>;
}

export default function App() {
  // Navigation & Menu Status
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Hero Carousel State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Lead Collection Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('Residential Interior');
  const [modalSource, setModalSource] = useState('General');

  // Portfolio Filters
  const [activePortfolioFilter, setActivePortfolioFilter] = useState<'All' | 'Homes' | 'Modular Kitchens' | 'Bedrooms' | 'Living Rooms' | 'Office Interiors'>('All');

  // Case Studies Active Tab / Toggle (Before vs After)
  const [caseStudyBeforeMap, setCaseStudyBeforeMap] = useState<Record<string, boolean>>({
    'cs-1': false,
    'cs-2': false
  });

  // Custom Kitchen Showcase Hover Details
  const [selectedKitchenIndex, setSelectedKitchenIndex] = useState(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Testimonials Carousel State
  const [testiIndex, setTestiIndex] = useState(0);
  const [testiAutoplay, setTestiAutoplay] = useState(true);
  const [testiTouchStart, setTestiTouchStart] = useState<number | null>(null);
  const [testiTouchEnd, setTestiTouchEnd] = useState<number | null>(null);

  // Dynamic Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactProject, setContactProject] = useState('Complete Home Interior');
  const [contactBudget, setContactBudget] = useState('₹5L - ₹8L');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // Auto-scroll hero background timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll testimonials carousel timer (every 4 seconds)
  useEffect(() => {
    if (!testiAutoplay) return;
    const timer = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testiAutoplay]);

  // Sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CTA Click Helper
  const triggerLeadCapture = (category: string, source: string) => {
    setModalCategory(category);
    setModalSource(source);
    setModalOpen(true);
  };

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const id = href.replace("#", "");

    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Direct Lead Submit from the main Contact section
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');

    if (!contactName || !contactPhone || !contactEmail) {
      setContactError('Please complete all required fields.');
      return;
    }

    if (contactPhone.replace(/\D/g, '').length < 10) {
      setContactError('Please enter a valid 10-digit telephone number.');
      return;
    }

    const newLead = {
      id: `lead-contact-${Date.now()}`,
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      projectType: contactProject,
      budgetRange: contactBudget,
      message: contactMsg,
      source: 'Main Contact Form',
      createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      status: 'New' as const
    };

    try {
      const existing = localStorage.getItem('decoruss_leads');
      const parsed = existing ? JSON.parse(existing) : [];
      localStorage.setItem('decoruss_leads', JSON.stringify([newLead, ...parsed]));
      
      // Notify the lead tracker
      window.dispatchEvent(new Event('decoruss_leads_updated'));
    } catch (e) {
      console.error(e);
    }

    setContactSubmitted(true);
  };

  const resetContactForm = () => {
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactProject('Complete Home Interior');
    setContactBudget('₹5L - ₹8L');
    setContactMsg('');
    setContactSubmitted(false);
  };

  const filteredProjects = activePortfolioFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activePortfolioFilter);

  // Toggle before / after image state
  const toggleCaseStudyBefore = (id: string) => {
    setCaseStudyBeforeMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2B2B2B] font-sans selection:bg-[#C8A45D] selection:text-white relative">
      
      {/* HEADER & STICKY NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-[#C8A45D]/20' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo area */}
            <a 
              href="#home" 
              onClick={(e) => handleScrollToSection(e, '#home')}
              className="flex items-center gap-2 group"
            >
              <div className="h-8 w-8 bg-[#1E1E1E] text-[#C8A45D] rounded-sm flex items-center justify-center font-serif text-lg font-bold shadow-md transition-colors duration-300">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-widest text-[#1E1E1E] uppercase leading-none">
                  DECORUSS
                </span>
                <span className="text-[8px] text-[#C8A45D] tracking-[0.2em] font-bold uppercase font-sans mt-0.5">
                  Lucknow
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  className="text-[11px] font-bold text-[#1E1E1E]/70 hover:text-[#C8A45D] tracking-[0.2em] transition-all uppercase duration-250 font-sans"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Header Right Action Button */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                onClick={() => {
                  // Fire standard lead tracking trace for clicking call
                  const eventLead = {
                    id: `call-click-${Date.now()}`,
                    name: 'Direct Visitor',
                    phone: BUSINESS_INFO.displayPhone,
                    email: 'visitor@call.com',
                    projectType: 'Direct Phone Call',
                    budgetRange: 'Varies',
                    message: 'Clicked Call Now button from top navigation bar.',
                    source: 'Nav Call Now Button',
                    createdAt: new Date().toLocaleTimeString(),
                    status: 'Contacted'
                  };
                  localStorage.setItem('decoruss_leads', JSON.stringify([eventLead, ...(JSON.parse(localStorage.getItem('decoruss_leads') || '[]'))]));
                  window.dispatchEvent(new Event('decoruss_leads_updated'));
                }}
                className="flex items-center gap-2 px-4 py-2 border border-[#C8A45D]/20 text-[#1E1E1E] hover:bg-[#C8A45D] hover:text-white hover:border-[#C8A45D] rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
              >
                <Phone className="h-3 w-3 text-[#C8A45D]" />
                {BUSINESS_INFO.displayPhone}
              </a>

              <button
                onClick={() => triggerLeadCapture('Residential Interior', 'Sticky Navbar CTA')}
                className="bg-[#C8A45D] text-white px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-[#b5904f] rounded-sm transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                Call 9936628880
              </button>
            </div>

            {/* Mobile hamburger menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="p-2 bg-[#F8F5EE] text-[#C8A45D] rounded-full border border-[#C8A45D]/20 mr-1"
                title="Call Decoruss"
              >
                <Phone className="h-4 w-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-100 py-4 shadow-inner"
            >
              <div className="max-w-7xl mx-auto px-4 space-y-2 flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      handleScrollToSection(e, link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3 rounded-lg hover:bg-[#F8F5EE] hover:text-[#C8A45D] text-sm font-semibold tracking-wide text-neutral-800 uppercase text-xs"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-3 px-3">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="flex items-center justify-center gap-2 py-3 bg-[#F8F5EE] text-[#1E1E1E] border border-[#C8A45D]/30 rounded-xl text-xs font-bold tracking-wider"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#C8A45D]" />
                    Call Now
                  </a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      triggerLeadCapture('Residential Interior', 'Mobile Drawer CTA');
                    }}
                    className="py-3 bg-[#1E1E1E] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
                  >
                    Free Consult
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION WITH PROJECTS SLIDER */}
      {/* HERO SECTION WITH BENTO GRID LAYOUT */}
      <section id="home" className="relative pt-24 pb-6 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
          
          {/* Bento Hero left block: col-span-8 with rich premium UX */}
          <div className="lg:col-span-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-[#C8A45D]/10 relative min-h-[500px] flex flex-col justify-between p-8 md:p-12 group transition-all duration-300">
            
            {/* Background Images with fading transitions inside card */}
            <div className="absolute inset-0 z-0 bg-[#F2EDE4]/30 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-10000"
                  style={{ 
                    backgroundImage: `url(${HERO_SLIDES[currentHeroSlide].image})` 
                  }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-white/85 to-white/20" />
            </div>

            {/* Floating Statistic Badge 1 - Top Right - Oscillating */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#C8A45D]/25 shadow-lg flex items-center gap-2.5 hover:shadow-xl transition-shadow cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-[#F8F5EE] flex items-center justify-center text-[#C8A45D]">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div className="font-sans text-left">
                <div className="text-xs font-bold text-neutral-900 leading-none">15+ Years</div>
                <div className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest leading-none mt-1">Lucknow Legacy</div>
              </div>
            </motion.div>

            {/* Floating Statistic Badge 2 - Bottom Right - Oscillating opposite */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-16 right-4 sm:right-6 md:right-8 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#C8A45D]/25 shadow-lg flex items-center gap-2.5 hover:shadow-xl transition-shadow cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-[#F8F5EE] flex items-center justify-center text-[#C8A45D]">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div className="font-sans text-left">
                <div className="text-xs font-bold text-neutral-900 leading-none">10-Yr Warranty</div>
                <div className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest leading-none mt-1">Verified BWR Ply</div>
              </div>
            </motion.div>

            {/* Inner Content */}
            <div className="relative z-10 my-auto flex flex-col justify-center items-start">
              
              {/* Tagline */}
              <span className="text-[#C8A45D] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3">
                {BUSINESS_INFO.tagline}
              </span>

              {/* Header Title */}
              <div className="min-h-[110px] md:min-h-[130px] mb-2 z-10">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentHeroSlide}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-neutral-900 font-light"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {HERO_SLIDES[currentHeroSlide].title.split(' Lucknow').map((part, i) => (
                      <React.Fragment key={i}>
                        {part}
                        {i === 0 && <span className="text-[#C8A45D] font-normal"> Lucknow</span>}
                      </React.Fragment>
                    ))}
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Subtitle */}
              <div className="min-h-[45px] mb-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentHeroSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed font-light"
                  >
                    {HERO_SLIDES[currentHeroSlide].subtitle}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Animated Trust Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-7">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/70 border border-[#C8A45D]/15 rounded-full text-[9px] text-neutral-800 font-bold uppercase tracking-wide hover:shadow-sm hover:border-[#C8A45D]/40 transition-all cursor-default">
                  <CheckCircle2 className="h-3 w-3 text-[#C8A45D]" />
                  Blum Partner Fittings
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/70 border border-[#C8A45D]/15 rounded-full text-[9px] text-neutral-800 font-bold uppercase tracking-wide hover:shadow-sm hover:border-[#C8A45D]/40 transition-all cursor-default">
                  <ShieldCheck className="h-3 w-3 text-[#C8A45D]" />
                  100% On-Site Safety
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/70 border border-[#C8A45D]/15 rounded-full text-[9px] text-neutral-800 font-bold uppercase tracking-wide hover:shadow-sm hover:border-[#C8A45D]/40 transition-all cursor-default">
                  <Sparkles className="h-3 w-3 text-[#C8A45D]" />
                  ₹0 Cost 3D Blueprints
                </div>
              </div>

              {/* Actions stack */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  onClick={(e) => handleScrollToSection(e, '#projects')}
                  className="bg-neutral-950 text-white hover:bg-[#C8A45D] px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  View Selected Work
                </a>
                
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-6.5 h-6.5 rounded-full bg-neutral-200 border-2 border-white overflow-hidden shadow-sm">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="review 1" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                    </div>
                    <div className="w-6.5 h-6.5 rounded-full bg-neutral-300 border-2 border-white overflow-hidden shadow-sm">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="review 2" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                    </div>
                    <div className="w-6.5 h-6.5 rounded-full bg-neutral-400 border-2 border-white overflow-hidden shadow-sm">
                      <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&h=80&q=80" alt="review 3" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">
                    326+ Verified Google Reviews
                  </span>
                </div>
              </div>

            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-1.5 mt-4 self-start relative z-10">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-1.5 transition-all duration-300 ${
                    currentHeroSlide === idx ? 'w-6 bg-[#C8A45D]' : 'w-1.5 bg-neutral-350 hover:bg-neutral-500'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Bento Hero right block (Lead Form Card): col-span-4 */}
          <div className="lg:col-span-4 bg-[#1E1E1E] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl border border-[#C8A45D]/30 text-white min-h-[460px]">
            <div>
              <h2 className="text-[#C8A45D] text-2xl font-light mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                Free Consultation
              </h2>
              <p className="text-white/60 text-xs mb-6">Receive certified 3D design plans at no cost.</p>
              
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:border-[#C8A45D] outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 99366 28880"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:border-[#C8A45D] outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Project Type</label>
                    <select
                      value={contactProject}
                      onChange={(e) => setContactProject(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 p-2.5 rounded text-white/80 text-xs focus:border-[#C8A45D] outline-none transition-colors"
                    >
                      <option value="Complete Home Interior">Residential Interior</option>
                      <option value="Modular Kitchen Planning">Modular Kitchen</option>
                      <option value="Corporate/Commercial Office">Commercial Workspace</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Budget Range</label>
                    <select
                      value={contactBudget}
                      onChange={(e) => setContactBudget(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 p-2.5 rounded text-white/80 text-xs focus:border-[#C8A45D] outline-none transition-colors"
                    >
                      <option value="₹3.5L - ₹5L">5L - 10L</option>
                      <option value="₹5L - ₹8L">10L - 25L+</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#C8A45D] text-white py-3 rounded text-xs font-bold uppercase tracking-widest mt-4 shadow-lg shadow-[#C8A45D]/20 transition-all hover:bg-[#b5904f] active:scale-95 cursor-pointer"
                  >
                    Book Site Visit Now
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <span className="text-[#C8A45D] text-4xl block mb-2">✓</span>
                  <p className="text-sm font-bold text-[#C8A45D]">We've Received Your Request!</p>
                  <p className="text-xs text-white/60 mt-2">Our spatial lead coordinator will contact you at {contactPhone} immediately.</p>
                  <button onClick={() => setContactSubmitted(false)} className="text-[10px] uppercase font-bold tracking-widest text-[#C8A45D] hover:underline mt-4">Edit Form</button>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center space-x-4 opacity-75">
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-white/80 uppercase font-bold tracking-widest">Expert Available Now</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION (BENTO GRID STYLE UNDER HERO) */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 flex items-center space-x-4 border border-[#C8A45D]/10 shadow-sm">
            <span className="text-3xl font-bold font-serif text-[#C8A45D]" style={{ fontFamily: 'Georgia, serif' }}>15+</span>
            <div className="border-l border-neutral-100 pl-4 font-sans">
              <p className="text-[10px] uppercase font-bold text-[#1E1E1E]/60 tracking-widest">Years Of</p>
              <p className="text-[10px] uppercase font-bold text-[#1E1E1E]">Excellence</p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-4 flex items-center space-x-4 border border-[#C8A45D]/10 shadow-sm">
            <span className="text-3xl font-bold font-serif text-[#1E1E1E]" style={{ fontFamily: 'Georgia, serif' }}>1K+</span>
            <div className="border-l border-neutral-100 pl-4 font-sans">
              <p className="text-[10px] uppercase font-bold text-[#1E1E1E]/60 tracking-widest">Completed</p>
              <p className="text-[10px] uppercase font-bold text-[#1E1E1E]">Projects</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl p-4 flex items-center justify-center border border-[#C8A45D]/10 shadow-sm">
            <div className="text-center font-sans">
              <div className="text-[#C8A45D] flex justify-center space-x-0.5 mb-1 text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-[10px] uppercase font-bold text-[#1E1E1E]">4.4 Rating</p>
            </div>
          </div>

          {/* Expert available info placeholder to fill the grid row span cleanly */}
          <div className="lg:col-span-4 bg-[#F2EDE4] rounded-2xl p-4 flex items-center justify-between border border-[#C8A45D]/10 shadow-sm">
            <div className="font-sans">
              <p className="text-[9px] uppercase font-bold tracking-widest text-[#1E1E1E]/60">LUXURY REGISTRATION</p>
              <p className="text-[10px] font-bold text-[#1E1E1E]">Registered Interior Design Agency</p>
            </div>
            <span className="text-xs text-[#C8A45D] font-bold font-mono">LUCKNOW</span>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 bg-[#F8F5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Visuals Left */}
            <div className="lg:col-span-5 bg-white border border-[#C8A45D]/10 rounded-2xl p-4 shadow-sm relative flex flex-col justify-center">
              <div className="relative rounded-xl overflow-hidden group shadow-md h-[450px]">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" 
                  alt="Decoruss design workspace" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Floating Stamp */}
                <div className="absolute bottom-6 left-6 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#C8A45D]/20 z-15 font-sans flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#F8F5EE] border border-[#C8A45D]/30 rounded-full flex items-center justify-center text-[#C8A45D]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-xs">Top-Tier Awarded</h4>
                    <p className="text-[9px] text-[#C8A45D]/80 font-bold uppercase tracking-widest">Certified Creators</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Text Right */}
            <div className="lg:col-span-7 bg-white border border-[#C8A45D]/10 rounded-2xl p-6 sm:p-10 shadow-sm font-sans flex flex-col justify-between space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F5EE] border border-[#C8A45D]/10 rounded-full text-[#C8A45D] text-[10px] font-bold uppercase tracking-[0.15em]">
                  <Compass className="h-3 w-3" />
                  Lucknow's Design Legacy
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-3xl text-[#1E1E1E] tracking-tight leading-tight mt-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Why Homeowners & Organizations Trust Decoruss
                </h2>

                <p className="text-neutral-600 leading-relaxed font-light text-xs sm:text-sm mt-3">
                  Decoruss has been transforming premier residential and commercial properties across Lucknow since 2010. Our elite internal architecture studio combines creative mastery, deep ergonomics study, and master-level industrial manufacturing to deliver spaces that are uniquely yours.
                </p>
              </div>

              {/* About Grid Perks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                <div className="flex gap-3 bg-[#F8F5EE]/30 p-3 rounded-xl border border-[#C8A45D]/5 hover:border-[#C8A45D]/20 transition-colors">
                  <div className="h-8 w-8 shrink-0 bg-[#F8F5EE] border border-[#C8A45D]/15 text-[#C8A45D] rounded flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1E1E1E]">Bespoke 3D Previews</h3>
                    <p className="text-[10px] text-neutral-500 mt-1 leading-normal font-light">
                      Walk virtually before starting carpentry.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-[#F8F5EE]/30 p-3 rounded-xl border border-[#C8A45D]/5 hover:border-[#C8A45D]/20 transition-colors">
                  <div className="h-8 w-8 shrink-0 bg-[#F8F5EE] border border-[#C8A45D]/15 text-[#C8A45D] rounded flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1E1E1E]">Dedicated Architects</h3>
                    <p className="text-[10px] text-neutral-500 mt-1 leading-normal font-light">
                      Vetted timeline spatial tracking coordinators.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-[#F8F5EE]/30 p-3 rounded-xl border border-[#C8A45D]/5 hover:border-[#C8A45D]/20 transition-colors">
                  <div className="h-8 w-8 shrink-0 bg-[#F8F5EE] border border-[#C8A45D]/15 text-[#C8A45D] rounded flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1E1E1E]">10-Year BWR Warranty</h3>
                    <p className="text-[10px] text-neutral-500 mt-1 leading-normal font-light">
                      Termite-resistant industrial grade plywood.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-[#F8F5EE]/30 p-3 rounded-xl border border-[#C8A45D]/5 hover:border-[#C8A45D]/20 transition-colors">
                  <div className="h-8 w-8 shrink-0 bg-[#F8F5EE] border border-[#C8A45D]/15 text-[#C8A45D] rounded flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1E1E1E]">Turnkey Execution</h3>
                    <p className="text-[10px] text-neutral-500 mt-1 leading-normal font-light">
                      Civil, lighting, to premium post-cleanup.
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => triggerLeadCapture('Residential Interior', 'About Learn More Call')}
                  className="bg-[#1E1E1E] text-white hover:bg-[#C8A45D] px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 rounded-sm shadow-sm cursor-pointer animate-pulse"
                >
                  Schedule Site Audit
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-5 py-3 border border-[#C8A45D]/25 text-[#1E1E1E] hover:bg-[#C8A45D] hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-widest text-center transition-all duration-300"
                >
                  Call Head Architect
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 bg-[#F8F5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Text */}
          <div className="max-w-3xl mx-auto text-center mb-12 font-sans">
            <span className="text-[#C8A45D] text-[10px] font-bold uppercase tracking-[0.25em]">What We Perfect</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1E1E] mt-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Bespoke Spaces Crafted with Architectural Rigour
            </h2>
            <p className="text-neutral-500 font-light mt-3 text-xs">
              Each service division manages exclusive materials, dedicated factory floor assembly lines, and specialized local design engineers.
            </p>
          </div>

          {/* Premium Cards Grid in Bento style (4 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv) => {
              // Icon selector helper
              const renderIcon = (type: string) => {
                switch(type) {
                  case 'Home': return <Home className="h-5 w-5" />;
                  case 'ChefHat': return <ChefHat className="h-5 w-5" />;
                  case 'Briefcase': return <Briefcase className="h-5 w-5" />;
                  case 'Armchair': return <Armchair className="h-5 w-5" />;
                  default: return <Sparkles className="h-5 w-5" />;
                }
              };

              return (
                <motion.div
                  key={srv.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-5 border border-[#C8A45D]/10 hover:border-[#C8A45D]/40 shadow-sm transition-all duration-300 flex flex-col justify-between font-sans relative overflow-hidden group"
                >
                  {/* Subtle top decoration corner line */}
                  <div className="absolute top-0 left-0 w-12 h-[2.5px] bg-[#C8A45D]" />
                  
                  <div>
                    {/* Header line icon & name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 bg-[#F8F5EE] group-hover:bg-[#C8A45D] text-[#C8A45D] group-hover:text-white rounded flex items-center justify-center transition-colors duration-300">
                        {renderIcon(srv.icon)}
                      </div>
                      <h3 className="font-serif text-base text-[#1E1E1E] font-medium leading-tight">
                        {srv.title}
                      </h3>
                    </div>

                    <p className="text-[11px] text-neutral-500 font-light leading-relaxed mb-4">
                      {srv.description}
                    </p>

                    {/* Sub bullet checklist items compact */}
                    <ul className="grid grid-cols-1 gap-1.5 mb-6 text-[10px] font-mono text-neutral-600">
                      {srv.items.map((it, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-[#C8A45D] shrink-0" />
                          <span className="truncate">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic Pre-fill lead button */}
                  <button
                    onClick={() => triggerLeadCapture(srv.title, `Services Card - ${srv.title}`)}
                    className="w-full py-2.5 bg-[#F8F5EE] hover:bg-[#1E1E1E] text-[#1E1E1E] hover:text-white rounded text-[10px] font-bold uppercase tracking-widest text-center transition-all duration-300 group-hover:shadow-sm cursor-pointer"
                  >
                    {srv.ctaText}
                  </button>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PORTFOLIO SECTION (LUXURY FILTERING GALLERY) */}
      <section id="projects" className="py-20 md:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div className="max-w-2xl font-sans">
              <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]">Craft Portfolio</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-950 mt-2 tracking-tight">
                Our Signature Lucknow Residences
              </h2>
              <p className="text-neutral-500 font-light text-sm mt-3">
                Filters represent our specialized design cells. Swipe or click to view bespoke structural transformations.
              </p>
            </div>

            {/* Google review rating stamp badge right */}
            <div className="mt-6 md:mt-0 px-4.5 py-3 bg-[#F8F5EE] rounded-xl border border-[#C8A45D]/20 flex items-center gap-3.5 shadow-sm">
              <div className="text-[#C8A45D]">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <div className="text-[10px] font-mono font-bold mt-1 uppercase text-neutral-400">Google Verified Verified</div>
              </div>
              <div className="text-right border-l border-neutral-200 pl-3.5">
                <span className="text-xl font-bold font-serif text-neutral-900">{BUSINESS_INFO.googleRating}★</span>
                <span className="text-[10px] block text-neutral-500 font-medium font-sans">({BUSINESS_INFO.googleReviewsCount} Reviews)</span>
              </div>
            </div>
          </div>

          {/* Filtering navigation headers */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-neutral-100 pb-5 overflow-x-auto hide-scrollbar">
            {(['All', 'Homes', 'Modular Kitchens', 'Bedrooms', 'Living Rooms', 'Office Interiors'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActivePortfolioFilter(filter)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activePortfolioFilter === filter 
                    ? 'bg-[#1E1E1E] text-white shadow-md' 
                    : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Luxury Masonry Grid list */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  key={proj.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-900 shadow-md border border-[#C8A45D]/5 hover:border-[#C8A45D]/20 flex flex-col justify-end min-h-[360px]"
                >
                  {/* High quality visual */}
                  <img 
                    src={proj.image} 
                    alt={proj.name} 
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-108 transition-all duration-700 opacity-80 group-hover:opacity-65"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent z-10" />

                  {/* Portfolio Badge Hover detail overlay */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[9px] uppercase font-bold tracking-widest bg-white/95 backdrop-blur-md text-[#1E1E1E] px-3 py-1 rounded-full shadow-sm">
                      {proj.category}
                    </span>
                  </div>

                  {/* Text Description Bottom */}
                  <div className="p-5 relative z-20 text-white font-sans space-y-2">
                    <div className="text-[10px] font-mono text-[#C8A45D] font-bold flex items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {proj.location}
                    </div>
                    
                    <h3 className="font-serif text-base tracking-tight font-medium text-white group-hover:text-[#C8A45D] transition-colors leading-tight">
                      {proj.name}
                    </h3>

                    {proj.description && (
                      <p className="text-[10px] text-neutral-300 font-light leading-relaxed line-clamp-2">
                        {proj.description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] font-mono text-neutral-300 pt-2 border-t border-white/10 mt-1.5">
                      <div>
                        <span className="text-neutral-500 block">SQUARE FEET:</span>
                        <span className="font-bold text-white block mt-0.5">{proj.area}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">DESIGN STYLE:</span>
                        <span className="font-bold text-white block mt-0.5 truncate" title={proj.designStyle}>{proj.designStyle}</span>
                      </div>
                      <div className="col-span-2 flex justify-between border-t border-white/5 pt-1.5 mt-0.5">
                        <span className="text-neutral-500">COMPLETION TIMELINE:</span>
                        <span className="font-bold text-[#C8A45D]">{proj.timeline || '35 Days'}</span>
                      </div>
                    </div>

                    {/* Book Site Visit quick action button */}
                    <button
                      onClick={() => triggerLeadCapture(proj.category, `Portfolio Quick - ${proj.name}`)}
                      className="w-full mt-3 py-2 bg-[#C8A45D] hover:bg-white hover:text-[#1E1E1E] text-white text-[9px] font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Inquire Design Layout</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* CASE STUDY SECTION (BEFORE vs AFTER INTERACTIVE SLIDERS/TABS) */}
      <section className="py-20 md:py-28 bg-[#F8F5EE]/40 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16 font-sans">
            <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]">Real Transformation</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-950 mt-2 tracking-tight">
              Interactive Design Transformations
            </h2>
            <p className="text-neutral-500 font-light mt-3">
              Explore the actual spatial problems, bespoke planning solutions, and stunning visual results. Use the toggle buttons to compare original sites against finished masterpieces.
            </p>
          </div>

          <div className="space-y-16">
            {CASE_STUDIES.map((cs) => {
              const isShowingBefore = caseStudyBeforeMap[cs.id] || false;

              return (
                <div 
                  key={cs.id}
                  className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border border-[#C8A45D]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Photo Section Left Column (Interactive Before-After toggling) */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="relative rounded-xl overflow-hidden shadow-md group h-[300px] sm:h-[400px]">
                      
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={isShowingBefore ? 'before' : 'after'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          src={isShowingBefore ? cs.imageBefore : cs.imageAfter}
                          alt={isShowingBefore ? 'Before rehabilitation state' : 'After finished state'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>

                      {/* Floating Indicator */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white ${
                          isShowingBefore ? 'bg-red-600' : 'bg-emerald-600'
                        }`}>
                          {isShowingBefore ? 'Original Skeletal / Damp Site (BEFORE)' : 'Furnished Masters Suite (AFTER)'}
                        </span>
                      </div>

                      {/* Toggle Controller Widget inside frame */}
                      <div className="absolute top-4 right-4 z-20 flex gap-1 bg-black/50 backdrop-blur-md p-1 rounded-lg">
                        <button
                          onClick={() => setCaseStudyBeforeMap(prev => ({ ...prev, [cs.id]: true }))}
                          className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md transition-colors ${
                            isShowingBefore ? 'bg-[#C8A45D] text-white' : 'text-neutral-300 hover:text-white'
                          }`}
                        >
                          Before
                        </button>
                        <button
                          onClick={() => setCaseStudyBeforeMap(prev => ({ ...prev, [cs.id]: false }))}
                          className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md transition-colors ${
                            !isShowingBefore ? 'bg-[#C8A45D] text-white' : 'text-neutral-300 hover:text-white'
                          }`}
                        >
                          After
                        </button>
                      </div>

                    </div>

                    <div className="flex items-center justify-between font-sans text-xs text-neutral-400">
                      <span>Swipe or click standard selectors to verify</span>
                      <button 
                        onClick={() => toggleCaseStudyBefore(cs.id)}
                        className="text-neutral-700 hover:text-[#C8A45D] font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sliders className="h-3.5 w-3.5" /> Toggle Before/After
                      </button>
                    </div>
                  </div>

                  {/* Description Right Column */}
                  <div className="lg:col-span-6 font-sans space-y-5">
                    
                    <div>
                      <div className="text-xs font-mono text-[#C8A45D] font-bold flex items-center gap-1.5">
                        <Award className="h-4 w-4 shrink-0Color text-[#C8A45D]" />
                        {cs.clientName} • Located {cs.location}
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-900 mt-2.5 leading-tight">
                        {cs.title}
                      </h3>
                    </div>

                    {/* Challenges table details */}
                    <div className="space-y-3.5 pt-2">
                      <div className="p-3 bg-red-50/70 border-l-4 border-red-500 rounded-r-lg">
                        <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-0.5">The Technical Challenge:</h4>
                        <p className="text-xs leading-relaxed text-neutral-600">{cs.challenge}</p>
                      </div>

                      <div className="p-3 bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-lg">
                        <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-0.5">The Architectural Solution:</h4>
                        <p className="text-xs leading-relaxed text-neutral-600">{cs.solution}</p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-lg">
                        <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">The Operational Outcome:</h4>
                        <p className="text-xs leading-relaxed text-neutral-600">{cs.outcome}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => triggerLeadCapture(cs.title, `Case Study - ${cs.clientName}`)}
                        className="px-6 py-3.5 bg-[#1E1E1E] text-white hover:bg-[#C8A45D] rounded-xl text-xs font-bold uppercase tracking-widest font-sans shadow-md cursor-pointer"
                      >
                        Get Estimated Pricing of This Project
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* COMPARISON CHART: DECORUSS VS TYPICAL CONTRACTOR */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]"> Lucknow Standards</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-950 mt-2 tracking-tight">
              Decoruss vs. Typical Local Contractors
            </h2>
            <p className="text-neutral-500 font-light mt-4">
              Do not leave your dream home to guesswork or unaccountable daily carpenters. Compare our certified industrial execution processes.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-xl bg-white max-w-5xl mx-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[#1E1E1E] text-white text-xs font-bold uppercase tracking-widest border-b border-neutral-800">
                  <th className="p-5 md:p-6">Project Parameter</th>
                  <th className="p-5 md:p-6 text-[#C8A45D]">Decoruss Premium Service</th>
                  <th className="p-5 md:p-6 text-neutral-400">Typical Local Carpenters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-xs sm:text-sm">
                {CONTRACTOR_COMPARISON.map((row, index) => (
                  <tr key={index} className="hover:bg-[#F8F5EE]/30 transition-colors">
                    <td className="p-5 md:p-6 font-bold text-neutral-800">{row.benefit}</td>
                    <td className="p-5 md:p-6 bg-[#F8F5EE]/40">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-800 font-medium">{row.decoruss}</span>
                      </div>
                    </td>
                    <td className="p-5 md:p-6 text-neutral-500 font-light">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.typical}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => triggerLeadCapture('Decoruss vs Contractor', 'Comparison Pricing CTA')}
              className="px-8 py-4.5 bg-[#C8A45D] text-white hover:bg-neutral-900 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg cursor-pointer"
            >
              Consult On-Site Standard Engineers
            </button>
          </div>

        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section id="process" className="py-20 md:py-28 bg-[#F8F5EE]/40 border-y border-neutral-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]">Our Methodology</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-950 mt-2 tracking-tight">
              Six Steps to Your Dream Space
            </h2>
            <p className="text-neutral-500 font-light mt-4">
              We manage every technical phase under standard manufacturing SLAs, keeping you updated via Whatsapp at each key block.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center spine connector timeline line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#C8A45D]/30 -translate-x-1/2" />

            <div className="space-y-12">
              {PROCESS_STEPS.map((ps, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div key={ps.step} className="flex flex-col lg:flex-row items-stretch gap-6 relative">
                    
                    {/* Left Column (Content vs Spacer) */}
                    <div className={`w-full lg:w-1/2 ${isEven ? 'lg:text-right flex items-center justify-end' : 'order-1 lg:order-2'}`}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-6 md:p-8 bg-white border border-[#C8A45D]/15 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-2.5"
                      >
                        <span className="text-3xl font-serif text-[#C8A45D] font-bold">{ps.step}</span>
                        <h3 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">{ps.title}</h3>
                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">{ps.description}</p>
                      </motion.div>
                    </div>

                    {/* Timeline Center Bullet Node */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="h-10 w-10 bg-white border-2 border-[#C8A45D] rounded-full flex items-center justify-center font-bold font-serif text-xs text-[#C8A45D] shadow-md group">
                        {ps.step}
                      </div>
                    </div>

                    {/* Right Column (Spacer or content) */}
                    <div className="hidden lg:block w-full lg:w-1/2" />

                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => triggerLeadCapture('Process Briefing', 'Timeline CTA')}
              className="px-8 py-4 bg-neutral-900 hover:bg-[#C8A45D] text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl transition-colors cursor-pointer"
            >
              Schedule Measurements Site Visit
            </button>
          </div>

        </div>
      </section>

      {/* MODULAR KITCHEN SHOWCASE SECTION */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]">Cuisine Centerpiece</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-950 mt-2 tracking-tight leading-tight">
                Specially Configured Architectural Modular Kitchens
              </h2>
              <p className="text-neutral-500 font-light mt-4">
                We design high-gloss cabinetry featuring original BLUM runners. Our specialized carcass panels are engineered with marine plywood to secure absolute moisture structural block with 10Y warranty.
              </p>
            </div>
            <div className="lg:col-span-4 text-left lg:text-right">
              <button
                onClick={() => triggerLeadCapture('Modular Kitchen Design', 'Modular Kitchen Hero Section')}
                className="px-8 py-4.5 bg-[#C8A45D] hover:bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer"
              >
                Inquire Modular Kitchen Price
              </button>
            </div>
          </div>

          {/* Large Image Showcase cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KITCHEN_SHOWCASE_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedKitchenIndex(idx)}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-end min-h-[340px] cursor-pointer ${
                  selectedKitchenIndex === idx ? 'border-[#C8A45D] ring-2 ring-[#C8A45D]/20 shadow-lg' : 'border-neutral-200 hover:border-neutral-300 shadow-sm'
                }`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                <div className="p-5 relative z-20 text-white space-y-1">
                  <span className="text-[10px] text-[#C8A45D] uppercase tracking-wider font-bold block">{item.subtitle}</span>
                  <h3 className="font-serif text-lg font-medium tracking-tight text-white">{item.title}</h3>
                  
                  {/* Technology details shown always/hover */}
                  <div className="space-y-1 pt-2 border-t border-white/15 mt-2 text-[9px] font-mono text-neutral-300">
                    <div><span className="text-[#C8A45D]">WOOD:</span> {item.finish}</div>
                    <div><span className="text-[#C8A45D]">HARDWARE:</span> {item.tech}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating warning alert banner */}
          <div className="mt-8 bg-[#F8F5EE] p-4.5 rounded-2xl border border-[#C8A45D]/20 flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto">
            <div className="h-10 w-10 bg-white rounded-full border border-[#C8A45D]/30 flex items-center justify-center text-[#C8A45D] shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div className="text-xs text-neutral-600 leading-relaxed text-center sm:text-left">
              <strong> Lucknow Termite Proof Warning:</strong> Lucknow's clay soils are prone to termite attacks. We exclusively use **Termite Repellent Chemical Impregnated Carcasses**. Never compromise for particle boards.
            </div>
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-xs font-bold text-[#C8A45D] underline tracking-wider whitespace-nowrap uppercase hover:text-neutral-900 shrink-0"
            >
              Verify Wood Specs
            </a>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION (PREMIUM AUTO-SLIDING TESTIMONIAL CAROUSEL) */}
      <section id="testimonials" className="py-20 md:py-24 bg-[#FBF9F5] border-y border-neutral-200/60 font-sans relative z-10 overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A45D]/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#C8A45D] text-[10px] font-bold uppercase tracking-[0.25em]">Customer Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E1E] mt-2 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              What Our Clients Say
            </h2>
            <p className="text-neutral-500 font-light text-xs sm:text-sm">
              Trusted by hundreds of homeowners and businesses across Lucknow.
            </p>
          </div>

          {/* Premium Trust Analytics Bar Above Carousel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-5 rounded-[20px] border border-[#C8A45D]/12 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C8A45D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 flex items-center justify-center gap-1.5">
                <span className="text-[#C8A45D] text-xl sm:text-2xl">⭐</span>
                <CountUp end={4.4} decimals={1} />
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.18em] block mt-1.5">Google Rating</span>
            </div>

            <div className="bg-white p-5 rounded-[20px] border border-[#C8A45D]/12 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C8A45D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                <CountUp end={326} suffix="+" />
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.18em] block mt-1.5">Verified Reviews</span>
            </div>

            <div className="bg-white p-5 rounded-[20px] border border-[#C8A45D]/12 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C8A45D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                <CountUp end={15} suffix="+" />
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.18em] block mt-1.5">Years Experience</span>
            </div>

            <div className="bg-white p-5 rounded-[20px] border border-[#C8A45D]/12 text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C8A45D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                <CountUp end={1000} suffix="+" />
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.18em] block mt-1.5">Projects Delivered</span>
            </div>
          </div>

          {/* Carousel Slider Cards Container with Gesture Swipes */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-4 px-1 select-none"
            onTouchStart={(e) => setTestiTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTestiTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (testiTouchStart === null || testiTouchEnd === null) return;
              const diff = testiTouchStart - testiTouchEnd;
              if (diff > 55) {
                // Next
                setTestiIndex((prev) => (prev + 1) % TESTIMONIALS.length);
              } else if (diff < -55) {
                // Prev
                setTestiIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
              }
              setTestiTouchStart(null);
              setTestiTouchEnd(null);
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {[
                testiIndex,
                (testiIndex + 1) % TESTIMONIALS.length,
                (testiIndex + 2) % TESTIMONIALS.length
              ].map((globalIdx, localIdx) => {
                const t = TESTIMONIALS[globalIdx];
                return (
                  <motion.div
                    key={`${t.id}-${localIdx}`}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.45, ease: "easeInOut", delay: localIdx * 0.08 }}
                    onMouseEnter={() => setTestiAutoplay(false)}
                    onMouseLeave={() => setTestiAutoplay(true)}
                    className={`bg-white border border-[#C8A45D]/12 rounded-[20px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_-15px_rgba(43,43,43,0.06)] hover:shadow-[0_20px_45px_-20px_rgba(200,164,93,0.18)] hover:-translate-y-2 transition-all duration-500 relative group overflow-hidden h-[340px] md:h-[365px] ${
                      localIdx === 1 ? 'hidden md:flex' : localIdx === 2 ? 'hidden lg:flex' : 'flex'
                    }`}
                  >
                    {/* Glassmorphic border glow accent */}
                    <div className="absolute top-0 left-0 w-20 h-[3px] bg-[#C8A45D] group-hover:w-full transition-all duration-700 ease-out" />
                    
                    <div className="space-y-4">
                      {/* Rating bar & design style tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#C8A45D] gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-[#C8A45D] text-[#C8A45D]" />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-[#C8A45D] bg-[#F8F5EE] px-3 py-1 rounded-full border border-[#C8A45D]/10">
                          {t.designStyle}
                        </span>
                      </div>

                      {/* Review quotation body */}
                      <p className="text-zinc-600 text-xs sm:text-xs leading-relaxed font-light italic line-clamp-6 pt-1">
                        "{t.review}"
                      </p>
                    </div>

                    {/* Customer Info segment */}
                    <div className="flex items-center gap-3.5 pt-5 border-t border-neutral-100 mt-5 shrink-0">
                      <div className="relative">
                        <img 
                          src={t.photo} 
                          alt={t.name} 
                          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover border border-[#C8A45D]/25"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-neutral-900 border border-white text-[#C8A45D] p-0.5 rounded-full">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                      </div>
                      <div className="text-left">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 leading-tight">{t.name}</h4>
                        <p className="text-[9px] font-bold text-[#C8A45D] uppercase mt-0.5 tracking-wider">{t.projectType}</p>
                        <p className="text-[9px] text-zinc-405 font-mono flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 text-[#C8A45D]/75" />
                          {t.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Unified Carousel Pagination Controls Box */}
          <div 
            className="flex items-center justify-center gap-6 mt-8"
            onMouseEnter={() => setTestiAutoplay(false)}
            onMouseLeave={() => setTestiAutoplay(true)}
          >
            <button 
              onClick={() => {
                setTestiIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
              }}
              className="h-10 w-10 rounded-full border border-[#C8A45D]/20 bg-white text-[#C8A45D] hover:bg-[#C8A45D] hover:text-white flex items-center justify-center shadow-sm hover:shadow active:scale-90 transition-all duration-350 cursor-pointer shrink-0"
              title="Previous Review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Micro Dot Indicators */}
            <div className="flex justify-center items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTestiIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-350 ${
                    testiIndex === idx 
                      ? 'w-7 bg-[#C8A45D]' 
                      : 'w-1.5 bg-[#C8A45D]/20 hover:bg-[#C8A45D]/50'
                  }`}
                  aria-label={`Show slide group starting at index ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => {
                setTestiIndex((prev) => (prev + 1) % TESTIMONIALS.length);
              }}
              className="h-10 w-10 rounded-full border border-[#C8A45D]/20 bg-white text-[#C8A45D] hover:bg-[#C8A45D] hover:text-white flex items-center justify-center shadow-sm hover:shadow active:scale-90 transition-all duration-350 cursor-pointer shrink-0"
              title="Next Review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Luxury Bottom Trust Banner Card */}
          <div className="mt-14 max-w-2xl mx-auto">
            <div className="bg-white border border-[#C8A45D]/15 rounded-[24px] p-6 sm:p-8 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden group hover:border-[#C8A45D]/30 transition-colors duration-550">
              {/* Glassmorphic decor loop background */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#C8A45D]/5 rounded-full -translate-y-8 translate-x-8 blur-sm pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-[#C8A45D] uppercase">Lucknow's Gold Standard</span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">Rated 4.4/5 by 326+ Happy Clients</h4>
                  <p className="text-[11px] text-zinc-405 font-light">Experience Lucknow's premium and bespoke architectural design workflow.</p>
                </div>

                <button
                  onClick={() => triggerLeadCapture('Residential Interior', 'Testimonials Bottom CTA')}
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-[#C8A45D] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg shadow-md hover:shadow-lg transition-all duration-350 active:scale-95 shrink-0"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 md:py-28 bg-[#FFFFFF] font-sans border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]">Queries & Clarifications</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 mt-2 tracking-tight">
              Honest Answers for Intending Builders
            </h2>
            <p className="text-neutral-500 font-light mt-3">
              Have doubts on material standards, timelines, or billing codes? Explore our structural responses.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div 
                  key={faq.id} 
                  className={`border rounded-2xl overflow-hidden transition-all ${
                    isOpen ? 'border-[#C8A45D] bg-[#F8F5EE]/25' : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-neutral-800 text-sm sm:text-base cursor-pointer"
                  >
                    <span className="font-serif">{faq.question}</span>
                    <div className={`h-6.5 w-6.5 bg-[#F8F5EE] border border-neutral-200 rounded-full flex items-center justify-center text-neutral-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#C8A45D] text-white' : ''
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-5 sm:p-6 pt-0 border-t border-neutral-200 text-xs sm:text-sm leading-relaxed text-neutral-500 font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-[#F8F5EE] p-5 rounded-2xl text-center border border-[#C8A45D]/15">
            <p className="text-xs text-neutral-600">
              Have specific layouts, blueprint queries, or budget-allocation worries not listed?
            </p>
            <button
              onClick={() => triggerLeadCapture('FAQ Assistance Call', 'FAQ Call CTA')}
              className="mt-3 text-xs font-bold uppercase tracking-wider text-[#C8A45D] hover:text-neutral-900 border-b-2 border-dotted border-[#C8A45D] pb-0.5 cursor-pointer"
            >
              Consult with our Architectural Team Directly
            </button>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION (HIGH LUXURY GRID FORM + BUSINESS META) */}
      <section id="contact" className="py-20 md:py-28 bg-[#F8F5EE]/40 border-y border-neutral-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Information Left Panel Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em]">Contact Agency</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-950 tracking-tight leading-tight">
                  Let’s Translate Your Space Vision Into Timeless Art
                </h2>
                <p className="text-neutral-550 font-light leading-relaxed text-sm md:text-base">
                  Ready to experience true turnkey luxury? Pop by our engineering studio, call us directly, or configure your bespoke project parameters on the form to secure a free horizontal layout consultation.
                </p>
              </div>

              {/* Verified Contact Methods */}
              <div className="space-y-4 pt-4">
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200/50">
                  <div className="h-10 w-10 bg-[#F8F5EE] text-[#C8A45D] rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block tracking-wider font-bold">TELEPHONE DIRECT LINE</span>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-sm font-bold text-neutral-900 hover:text-[#C8A45D] transition-colors">{BUSINESS_INFO.displayPhone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200/50">
                  <div className="h-10 w-10 bg-[#F8F5EE] text-[#C8A45D] rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block tracking-wider font-bold">CLIENT COMMUNICATIONS EMAIL</span>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm font-bold text-neutral-900 hover:text-[#C8A45D] transition-colors">{BUSINESS_INFO.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200/50">
                  <div className="h-10 w-10 bg-[#F8F5EE] text-[#C8A45D] rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block tracking-wider font-bold">LUCKNOW STUDIO ADDDRESS</span>
                    <span className="text-sm font-bold text-neutral-900">{BUSINESS_INFO.address}</span>
                  </div>
                </div>

              </div>

              {/* Direct Instant Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={`https://wa.me/91${BUSINESS_INFO.phone}?text=Hi%20Decoruss,%20I'm%20interested%20in%20a%20luxury%20interior%20design%20consultation%20for%20my%20space.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    // Track WhatsApp trace
                    const eventLead = {
                      id: `whatsapp-${Date.now()}`,
                      name: 'WhatsApp Enquirer',
                      phone: BUSINESS_INFO.displayPhone,
                      email: 'whatsapp@visitor.com',
                      projectType: 'WhatsApp Chat',
                      budgetRange: 'TBD',
                      message: 'Fired chat inquiry from WhatsApp direct links.',
                      source: 'WhatsApp CTA',
                      createdAt: new Date().toLocaleTimeString(),
                      status: 'Contacted'
                    };
                    localStorage.setItem('decoruss_leads', JSON.stringify([eventLead, ...(JSON.parse(localStorage.getItem('decoruss_leads') || '[]'))]));
                    window.dispatchEvent(new Event('decoruss_leads_updated'));
                  }}
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                
                <button
                  onClick={() => triggerLeadCapture('Site Visit Requested', 'Call Site inspector')}
                  className="px-6 py-3.5 bg-neutral-950 hover:bg-[#C8A45D] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  Book Instant Site Visit
                </button>
              </div>

            </div>

            {/* High Converting Form Right Panel Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-[#C8A45D]/15 flex flex-col justify-center">
              
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-5 text-sm">
                  
                  <div className="border-b border-neutral-100 pb-4 mb-2">
                    <h3 className="font-serif text-2xl text-neutral-900 tracking-tight font-medium">Configure Your Space parameters</h3>
                    <p className="text-xs text-neutral-400 mt-1">Fill this secure localized form. Assigned architect will respond with 3D design quotes.</p>
                  </div>

                  {contactError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{contactError}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Shrivastava"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 bg-neutral-0 rounded-lg outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all text-neutral-800"
                    />
                  </div>

                  {/* Telephone & Email side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-1.5">
                        WhatsApp Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 99366 28880"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 bg-neutral-0 rounded-lg outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all text-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-1.5">
                        Email Coordinates *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. anand@gmail.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 bg-neutral-0 rounded-lg outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all text-neutral-800"
                      />
                    </div>
                  </div>

                  {/* Categories drop down & budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-1.5">
                        Required Project Type
                      </label>
                      <select
                        value={contactProject}
                        onChange={(e) => setContactProject(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 bg-white rounded-lg outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all text-neutral-800"
                      >
                        <option value="Complete Home Interior">Complete Home Turnkey (Villa/Flat)</option>
                        <option value="Modular Kitchen Planning">Luxury Modular Kitchen</option>
                        <option value="Living Room Renovation">Living Room Accent Design</option>
                        <option value="Bespoke Bedroom Design">Master Bedroom & Wardrobes</option>
                        <option value="Corporate/Commercial Office">Commercial or Office Space</option>
                        <option value="Custom Furniture Suite">Bespoke Loose Furniture</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-1.5">
                        Target Resource Allocation
                      </label>
                      <select
                        value={contactBudget}
                        onChange={(e) => setContactBudget(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 bg-white rounded-lg outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all text-neutral-800"
                      >
                        <option value="Below ₹3.5L">Under ₹3.5 Lakh</option>
                        <option value="₹3.5L - ₹5L">₹3.5 Lakh - ₹5 Lakh</option>
                        <option value="₹5L - ₹8L">₹5 Lakh - ₹8 Lakh</option>
                        <option value="₹8L - ₹15L">₹8 Lakh - ₹15 Lakh</option>
                        <option value="₹15L+">Luxury Premium (₹15 Lakh+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1E1E1E] mb-1.5">
                      Tell us more about your Lucknow address context
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. I have just bought an apartment in Sushant Golf City and looking to design open layouts for living, dining and a modular parallel kitchen."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 bg-neutral-0 rounded-lg outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-all text-neutral-800 resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-4.5 bg-neutral-900 text-white hover:bg-[#C8A45D] rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 text-[#C8A45D] group-hover:text-white" />
                    Book Free Architect Consultation
                  </button>

                  <p className="text-center font-mono text-[10px] text-neutral-400">
                    🔒 Certified BWR Ply Wood guarantee • Zero post agreement price hikes
                  </p>

                </form>
              ) : (
                <div className="p-8 text-center text-neutral-800">
                  <div className="h-16 w-16 bg-[#F8F5EE] border border-[#C8A45D]/30 rounded-full flex items-center justify-center mx-auto text-[#C8A45D] mb-6 shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-medium tracking-tight mb-2">Bespoke Consultation Arranged!</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                    Sensational choices, <strong>{contactName}</strong>! Our design studio has indexed your information regarding <strong>{contactProject}</strong> interest. We will contact you at <strong>{contactPhone}</strong> immediately.
                  </p>
                  
                  <div className="bg-[#F8F5EE] p-5 rounded-xl text-left border border-neutral-200 max-w-sm mx-auto space-y-2 mb-6">
                    <h4 className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">SYSTEM LOG CAPTURED:</h4>
                    <ul className="text-xs space-y-1 text-mono text-neutral-700">
                      <li><strong>Assigned Office:</strong> Lucknow Main Hub</li>
                      <li><strong>Architect Name:</strong> Senior Spatial Director</li>
                      <li><strong>Allocated Budget tier:</strong> {contactBudget}</li>
                    </ul>
                  </div>

                  <button
                    onClick={resetContactForm}
                    className="px-6 py-3.5 bg-neutral-900 hover:bg-[#C8A45D] text-white rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Add Another Room Profile
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* VISIT OUR DESIGN STUDIO SECTION (PREMIUM GOOGLE MAPS INTEGRATION) */}
      <section id="location" className="py-16 md:py-24 bg-[#FBF9F5] border-t border-neutral-200/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 font-sans">
            <span className="text-[#C8A45D] text-[10px] font-bold uppercase tracking-[0.25em]">Find Our Studio</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E1E] mt-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Visit Our Design Studio
            </h2>
            <p className="text-neutral-500 font-light mt-3 text-xs sm:text-sm">
              Meet our experts and explore innovative interior design solutions tailored for your home and office.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Embedded Google Map - Col span 7 */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="relative w-full rounded-[24px] overflow-hidden shadow-xl border border-[#C8A45D]/15 bg-white p-2">
                <div className="rounded-[20px] overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=Decoruss%20Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="450"
                    style={{ border: 0, borderRadius: '20px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Decoruss - Best Interior Designer in Lucknow"
                    className="w-full shrink-0"
                  />
                </div>
                
                {/* Floating Map Actions inside Container */}
                <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8F5EE]/45 rounded-b-[20px] border-t border-[#C8A45D]/10">
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-600">
                    📍 Lat: 26.8529 • Long: 80.9472
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href="https://maps.google.com/?q=Decoruss+Lucknow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-[#C8A45D] text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all duration-300"
                    >
                      <Compass className="h-3.5 w-3.5" />
                      Get Directions
                    </a>
                    <a
                      href="https://maps.google.com/?q=Decoruss+Lucknow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 text-[10px] font-bold uppercase tracking-widest rounded border border-neutral-200 transition-all duration-300"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open Map
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Studio Information Desk - Col span 5 */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-white border border-[#C8A45D]/15 rounded-[24px] p-6 md:p-8 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
                {/* Subtle top decoration */}
                <div className="absolute top-0 left-0 w-24 h-[4px] bg-[#C8A45D]" />
                
                <div className="space-y-6">
                  {/* Studio Banner */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#F8F5EE] text-[#C8A45D] rounded-xl flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-neutral-950 font-bold tracking-tight">
                        Decoruss
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-600 font-bold mt-0.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Open 24 Hours
                      </div>
                    </div>
                  </div>

                  {/* Business Details Area */}
                  <div className="space-y-4 font-sans text-xs">
                    
                    {/* Address Detail Block */}
                    <div className="flex items-start gap-3.5 pb-4 border-b border-neutral-100">
                      <div className="h-8 w-8 bg-[#F8F5EE] text-[#C8A45D] rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                          Design Studio Office
                        </span>
                        <p className="text-neutral-800 text-[12px] leading-relaxed font-light">
                          <strong>Decoruss</strong><br />
                          503 A, Jewel Apartment, 6 Way Lane, Jopling Rd,<br />
                          Gokhale Vihar, Butler Colony,<br />
                          Lucknow, Uttar Pradesh 226001
                        </p>
                      </div>
                    </div>

                    {/* Phone Detail Block */}
                    <div className="flex items-start gap-3.5 pb-4 border-b border-neutral-100">
                      <div className="h-8 w-8 bg-[#F8F5EE] text-[#C8A45D] rounded-full flex items-center justify-center shrink-0">
                        <Phone className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                          General Hotline
                        </span>
                        <a 
                          href="tel:+919936628880"
                          className="text-neutral-950 text-sm font-semibold hover:text-[#C8A45D] transition-colors inline-flex items-center gap-1"
                        >
                          +91 99366 28880
                          <ArrowUpRight className="h-3 w-3 text-neutral-400" />
                        </a>
                        <p className="text-neutral-450 text-[10px] mt-0.5">Contact senior architectural planning desk 24/7</p>
                      </div>
                    </div>

                    {/* Hours Detail Block */}
                    <div className="flex items-start gap-3.5">
                      <div className="h-8 w-8 bg-[#F8F5EE] text-[#C8A45D] rounded-full flex items-center justify-center shrink-0">
                        <Clock className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                          Operational Hours
                        </span>
                        <p className="text-neutral-900 font-semibold text-[12px]">Open 24 Hours • Seven Days a Week</p>
                        <p className="text-neutral-450 text-[10px] mt-0.5">Prior schedule is recommended for 3D walkthroughs</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Direct Action Drawer Suite */}
                <div className="pt-6 mt-6 border-t border-neutral-100 space-y-2.5">
                  <a
                    href="https://maps.google.com/?q=Decoruss+Lucknow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-neutral-950 hover:bg-[#C8A45D] text-white text-[10px] font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow transition-all duration-300"
                  >
                    <Compass className="h-4 w-4 text-[#C8A45D]" />
                    Get Studio Directions
                  </a>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="tel:+919936628880"
                      className="py-2.5 bg-white hover:bg-neutral-50 text-neutral-900 hover:text-[#C8A45D] text-[9px] font-bold uppercase tracking-widest rounded border border-neutral-200 flex items-center justify-center gap-1.5 transition-all duration-300"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call Now
                    </a>
                    
                    <a
                      href="https://wa.me/919936628880?text=Hi%20Decoruss,%20I'm%20interested%2520in%2520visiting%2520your%2520design%252520studio."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-[9px] font-bold uppercase tracking-widest rounded flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-white py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Logo and Tagline block */}
            <div className="lg:col-span-4 space-y-4">
              <a 
                href="#home" 
                onClick={(e) => handleScrollToSection(e, '#home')}
                className="flex items-center gap-2"
              >
                <div className="h-9 w-9 bg-[#C8A45D] text-white rounded-lg flex items-center justify-center font-serif text-lg font-bold">
                  D
                </div>
                <span className="font-serif text-lg font-bold tracking-widest">DECORUSS</span>
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Premium interior design studio of Lucknow configuring luxury spaces into masterpiece homes. Built with water-resistant materials, elite finishes, and legally-backed on-time handovers.
              </p>
              
              {/* Google Review Badging */}
              <div className="pt-2 flex items-center gap-2">
                <div className="flex text-[#C8A45D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#C8A45D] font-bold uppercase tracking-wider">{BUSINESS_INFO.googleRating}★ Overall ({BUSINESS_INFO.googleReviewsCount} Reviews)</span>
              </div>
            </div>

            {/* Quick Navigation links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">Menu Navigation</h4>
              <ul className="text-xs space-y-2.5 text-neutral-400 font-light font-sans">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className="hover:text-white transition-colors uppercase text-[10px] tracking-wide"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services navigation */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">Our Lucknow Services</h4>
              <ul className="text-xs space-y-2.5 text-neutral-400 font-light font-sans">
                <li><a href="#services" onClick={(e) => handleScrollToSection(e, '#services')} className="hover:text-white transition-colors">Residential Home Turnkey</a></li>
                <li><a href="#services" onClick={(e) => handleScrollToSection(e, '#services')} className="hover:text-white transition-colors">Premium BWR Modular Kitchens</a></li>
                <li><a href="#services" onClick={(e) => handleScrollToSection(e, '#services')} className="hover:text-white transition-colors">Contemporary Master Bedroom</a></li>
                <li><a href="#services" onClick={(e) => handleScrollToSection(e, '#services')} className="hover:text-white transition-colors">Biophilic Corporate Offices</a></li>
                <li><a href="#services" onClick={(e) => handleScrollToSection(e, '#services')} className="hover:text-white transition-colors">Bespoke Furniture Suite</a></li>
              </ul>
            </div>

            {/* Direct Contact Links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">Main Headquarters</h4>
              <ul className="text-xs space-y-2.5 text-neutral-400 font-light font-sans">
                <li>
                  <span className="text-neutral-500 block">ENQUIRY HOTLINE:</span>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white font-bold block">{BUSINESS_INFO.displayPhone}</a>
                </li>
                <li>
                  <span className="text-neutral-500 block">CLIENT SUPPORT:</span>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white block">{BUSINESS_INFO.email}</a>
                </li>
                <li>
                  <span className="text-neutral-500 block">ADDRESS:</span>
                  <span className="block text-white font-medium">{BUSINESS_INFO.address}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center text-xs text-neutral-500 font-light flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <div>
            &copy; {new Date().getFullYear()} Decoruss Lucknow. All luxury rights reserved. 
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">Warranty Clauses</a>
            <span>•</span>
            <button 
              onClick={() => window.dispatchEvent(new Event('open_lead_tracker'))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Leads Pipeline (Alt+L)
            </button>
            <span>•</span>
            <a href={`https://${BUSINESS_INFO.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              {BUSINESS_INFO.website} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM FLOATING DIRECT LEAD CAPTURING ACTION BUTTONS (MOBILE FIRST) */}
      <div className="fixed bottom-[20px] right-[20px] md:bottom-[30px] md:right-[30px] z-[99] flex flex-col gap-3 font-sans">
        
        {/* Sticky WhatsApp Floating Icon */}
        <a
          href={`https://wa.me/91${BUSINESS_INFO.phone}?text=Hi%20Decoruss,%20I'm%2520interested%2520in%2520a%2520luxury%2520design%2520consultation.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // Log lead trace for clicking floating WhatsApp
            const eventLead = {
              id: `whatsapp-float-${Date.now()}`,
              name: 'WhatsApp Clicker',
              phone: BUSINESS_INFO.displayPhone,
              email: 'whatsapp@direct.com',
              projectType: 'Bespoke Chat Request',
              budgetRange: 'Varies',
              message: 'Clicked floating mobile WhatsApp link.',
              source: 'Floating WhatsApp Bubble',
              createdAt: new Date().toLocaleTimeString(),
              status: 'Contacted' as const
            };
            try {
              localStorage.setItem('decoruss_leads', JSON.stringify([eventLead, ...(JSON.parse(localStorage.getItem('decoruss_leads') || '[]'))]));
              window.dispatchEvent(new Event('decoruss_leads_updated'));
            } catch (e) {}
          }}
          className="relative h-12 w-12 sm:h-14 sm:w-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          title="Instant Chat on WhatsApp"
        >
          {/* Circular Pulse Wave */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping opacity-75 pointer-events-none" />
          <MessageSquare className="h-5.5 w-5.5 sm:h-6 sm:w-6 relative z-10" />
        </a>

        {/* Sticky Call Floating Icon */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          onClick={() => {
            // Log direct call lead tracking trace
            const eventLead = {
              id: `call-float-${Date.now()}`,
              name: 'Call Clicker',
              phone: BUSINESS_INFO.displayPhone,
              email: 'call@direct.com',
              projectType: 'Direct Hot Line Call',
              budgetRange: 'Varies',
              message: 'Clicked floating hot call hotline.',
              source: 'Floating Telephone Bubble',
              createdAt: new Date().toLocaleTimeString(),
              status: 'Contacted' as const
            };
            try {
              localStorage.setItem('decoruss_leads', JSON.stringify([eventLead, ...(JSON.parse(localStorage.getItem('decoruss_leads') || '[]'))]));
              window.dispatchEvent(new Event('decoruss_leads_updated'));
            } catch (e) {}
          }}
          className="md:hidden relative h-12 w-12 sm:h-14 sm:w-14 bg-[#C8A45D] hover:bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          title="Call Head Architect"
        >
          {/* Circular Pulse Wave */}
          <span className="absolute inset-0 rounded-full bg-[#C8A45D]/35 animate-pulse opacity-75 pointer-events-none" />
          <Phone className="h-5.5 w-5.5 sm:h-6 sm:w-6 relative z-10" />
        </a>

      </div>

      {/* LEAD CAPTURE DIALOG OVERLAYS */}
      <LeadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        preselectedCategory={modalCategory}
        sourceText={modalSource}
      />

      {/* ON-SITE LEAD TRACKER ANALYTICS DRAWER */}
      <LeadTrackerDrawer />

    </div>
  );
}
