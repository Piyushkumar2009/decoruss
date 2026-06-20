/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, CaseStudy, Testimonial, VideoTestimonial, FAQItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Decoruss',
  tagline: 'Transforming Spaces Into Timeless Experiences',
  phone: '9936628880',
  displayPhone: '+91 99366 28880',
  email: 'info@decoruss.com',
  website: 'decoruss.com',
  address: 'Lucknow, Uttar Pradesh, India',
  yearsOfExperience: '15+',
  projectsCompleted: '1000+',
  googleReviewsCount: '326',
  googleRating: '4.4',
  happyFamiliesCount: '500+'
};

export const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    title: 'Designing Beautiful Homes & Workspaces That Inspire',
    subtitle: 'Bespoke residential interiors crafted in Lucknow with a gold standard of premium materials, custom layouts, and a 10-year warranty structure.'
  },
  {
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85',
    title: 'Ultra-Modern Smart Modular Kitchens',
    subtitle: 'High-gloss acrylic finishes, premium BLUM hardware, and space-saving accessories tailored for modern cooking.'
  },
  {
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=85',
    title: 'Master Bedrooms: True Private Sanctuaries',
    subtitle: 'Walk-in closets, hidden custom vanity drawers, automated mood lighting, and acoustically insulated acoustic panels.'
  },
  {
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=85',
    title: 'Inspiring & Sophisticated Commercial Workspaces',
    subtitle: 'Ergonomic layouts, smart boardrooms, acoustic insulation, and brand-aligned waiting lounges that impress clientele.'
  }
];

export const SERVICES = [
  {
    id: 'residential',
    title: 'Residential Interior Design',
    icon: 'Home',
    description: 'Turnkey architectural home interiors. We transform bare flats and villas into personalized masterpieces.',
    items: ['Bespoke Living Rooms', 'Royal Master Bedrooms', 'Enchanted Kids Rooms', 'Elegant Dining Areas'],
    ctaText: 'Book Villa Design Consultation'
  },
  {
    id: 'modular-kitchen',
    title: 'Precision Modular Kitchens',
    icon: 'ChefHat',
    description: 'Technologically superior kitchens featuring water-resistant materials, heavy-duty soft-close fixtures, and clever storage solutions.',
    items: ['Ergonomic L-Shaped Layouts', 'Spacious U-Shaped Solutions', 'Sleek Parallel Galley Styles', 'Luxury Center Island Kitchens'],
    ctaText: 'Enquire for Modular Kitchen Price'
  },
  {
    id: 'commercial',
    title: 'Corporate & Retail Spaces',
    icon: 'Briefcase',
    description: 'High-performance commercial facilities, luxury boutique showrooms, contemporary cafes, and corporate headquarters.',
    items: ['Executive Director Cabins', 'Collaborative Coworking Bays', 'Acoustic Conference Rooms', 'Vibrant Cafe & Lounge Interiors'],
    ctaText: 'Request Commercial Workspace Quote'
  },
  {
    id: 'custom-furniture',
    title: 'Luxury Bespoke Furniture',
    icon: 'Armchair',
    description: 'Crafted with seasoned woods, high-density foam, and stain-resistant velvets/leatherettes tailored to exact dimensions.',
    items: ['Premium Sliding Wardrobes', 'Floating Floating TV Consoles', 'Bespoke Dining Sets', 'Space-Saving Hidden Storage'],
    ctaText: 'Get Custom Furniture Quote'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    name: 'Royal Neoclassic Entry Foyer',
    category: 'Homes',
    location: 'Gomti Nagar, Lucknow',
    area: '150 Sq. Ft.',
    designStyle: 'Classical Neoclassic Fusion',
    timeline: '35 Days',
    description: 'An entry foyer featuring custom gold brass wall moldings, premium marble-top console, handworked mirror frame, plush velvet accent chair, and warm architectural lighting.'
  },
  {
    id: 'proj-2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    name: 'Sleek Charcoal Acrylic Kitchen',
    category: 'Modular Kitchens',
    location: 'Hazratganj, Lucknow',
    area: '220 Sq. Ft.',
    designStyle: 'Industrial Modern Acrylic',
    timeline: '25 Days',
    description: 'High-end modular kitchen highlighting anti-fingerprint charcoal cabinetry, natural marble countertop, embedded handle profiles, intelligent pull-out corner larder, and integrated LED accent strips.'
  },
  {
    id: 'proj-3',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    name: 'Minimalist Walnut Master Bedroom',
    category: 'Bedrooms',
    location: 'Sushant Golf City, Lucknow',
    area: '380 Sq. Ft.',
    designStyle: 'Scandinavian Luxury Minimal',
    timeline: '40 Days',
    description: 'A master bedroom oasis crafted with seamless vertical walnut wooden paneling, custom-padded king headboard, floating bedside vanity table, and ambient warm cove lighting.'
  },
  {
    id: 'proj-4',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    name: 'Grand High-Ceiling Living Salon',
    category: 'Living Rooms',
    location: 'Aliganj, Lucknow',
    area: '650 Sq. Ft.',
    designStyle: 'Glamourous Art Deco',
    timeline: '55 Days',
    description: 'A spectacular high-ceiling living lounge framed by floor-to-ceiling glass paneling, luxury custom-tufted couches, brass abstract chandelier, and custom marble floors.'
  },
  {
    id: 'proj-5',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    name: 'Contemporary Biophilic Workspace',
    category: 'Office Interiors',
    location: 'Vibhuti Khand, Lucknow',
    area: '3,200 Sq. Ft.',
    designStyle: 'Biophilic Corporate Modern',
    timeline: '60 Days',
    description: 'A modern open-plan office layout engineered with acoustic panel ceilings, glass-enclosed conference chambers, ergonomic collaboration desks, and integrated smart biophilia.'
  },
  {
    id: 'proj-6',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    name: 'Ivory Serenity Luxury Suite',
    category: 'Bedrooms',
    location: 'Indira Nagar, Lucknow',
    area: '320 Sq. Ft.',
    designStyle: 'Modern Contemporary Warmth',
    timeline: '30 Days',
    description: 'A bespoke guest suite boasting ivory linen walls, a customized plush headboard, premium brushed gold vanity mirror, and sophisticated velvet chaise lounge panels.'
  },
  {
    id: 'proj-7',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80',
    name: 'Premium Oak & Quartz Kitchen',
    category: 'Modular Kitchens',
    location: 'Sushant Golf City, Lucknow',
    area: '280 Sq. Ft.',
    designStyle: 'Contemporary Handleless Premium',
    timeline: '28 Days',
    description: 'Premium double-row modular kitchen constructed of water-resistant BWR ply structure, natural oak laminates, seamless white quartz countertops, and pneumatic Aventos lift-ups.'
  },
  {
    id: 'proj-8',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
    name: 'Modern Industrial Lounge Suite',
    category: 'Living Rooms',
    location: 'Mahanagar, Lucknow',
    area: '540 Sq. Ft.',
    designStyle: 'Sophisticated Luxury Modern',
    timeline: '35 Days',
    description: 'A chic lounge space showing raw concrete wall styles paired with minimalist architectural bookshelves, high-contrast dark seating, and customized linear spotlights.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    name: 'Priya Shrivastava',
    projectType: '4 BHK Duplex Villa Interior',
    location: 'Sushant Golf City, Lucknow',
    rating: 5,
    review: 'Decoruss did an unbelievable job with our luxury villa. The team designed the exact neocolonial fusion we wanted. From the custom TV console to the automated kitchen drawers, every millimetre is pure perfection. They delivered exactly within 48 days!',
    designStyle: 'Neocolonial Fusion'
  },
  {
    id: 't-2',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    name: 'Anurag Mishra',
    projectType: 'Ultra-Modern Modular Kitchen',
    location: 'Gomti Nagar, Lucknow',
    rating: 5,
    review: 'Most interior contractors in Lucknow fail to keep schedules, but Decoruss is exceptionally professional. Their 3D design was exactly replicated in the physical installation. The storage space planning inside our U-shaped kitchen works beautifully.',
    designStyle: 'Modern Italian'
  },
  {
    id: 't-3',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    name: 'Dr. Shalini Saxena',
    projectType: 'Orthodontic Clinic & Waiting Lounge',
    location: 'Hazratganj, Lucknow',
    rating: 5,
    review: 'The biophilic styling they created for my orthodontic clinic instantly calms anxious patients. Best commercial interior designer in Lucknow. Exceptional transparency in material audits and billing!',
    designStyle: 'Biophilic Minimalist'
  },
  {
    id: 't-4',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    name: 'Amit Verma',
    projectType: 'Modern Kitchen & Dining',
    location: 'Aliganj, Lucknow',
    rating: 5,
    review: 'Choosing Decoruss for our dream kitchen was our best decision. The luxury tandem drawers, quartz countertop, and overhead profile lighting are top-notch. Their attention to detailing is exceptional.',
    designStyle: 'Contemporary Chic'
  },
  {
    id: 't-5',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    name: 'Sunita Mourya',
    projectType: 'Premium Apartment Redesign',
    location: 'Hazratganj, Lucknow',
    rating: 5,
    review: 'Their attention to space utilization is stellar. They transformed our old apartment into a modern elegant home, maintaining our cultural roots. Absolute luxury and hassle-free handovers!',
    designStyle: 'Traditional Elegant'
  },
  {
    id: 't-6',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    name: 'Rajesh Kapoor',
    projectType: 'Bespoke Executive Office Suite',
    location: 'Vibhuti Khand, Lucknow',
    rating: 5,
    review: 'Highly professional design firm. The ergonomic layout and acoustic planning they executed has significantly boosted our employee collaboration. They handled end-to-end setups neatly.',
    designStyle: 'Sleek Corporate'
  }
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'v-1',
    thumbnail: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
    title: 'Tour of Lucknow’s Most Luxurious Duplex Penthouse',
    duration: '4 mins 12 secs',
    videoUrl: 'https://youtu.be/dummy1',
    clientName: 'Mishra family, Gomti Nagar'
  },
  {
    id: 'v-2',
    thumbnail: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    title: 'Seamless Matte Charcoal Kitchen walkthrough & review',
    duration: '2 mins 45 secs',
    videoUrl: 'https://youtu.be/dummy2',
    clientName: 'Shrivastava family, Aliganj'
  },
  {
    id: 'v-3',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
    title: 'Luxury 3BHK transformation on a smart budget',
    duration: '3 mins 50 secs',
    videoUrl: 'https://youtu.be/dummy3',
    clientName: 'Verma family, Hazratganj'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Transforming a Dark 1990s Dwelling into an Open-Concept Contemporary Sanctuary',
    imageBefore: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=50',
    imageAfter: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
    clientName: 'The Khanna Residency',
    location: 'Mahanagar, Lucknow',
    challenge: 'A multi-partitioned, dark layout with low natural light penetration, aging wood dampness, and restricted kitchen visibility.',
    solution: 'We demolished non-load-bearing masonry partition walls to establish a cohesive open-floor layout. Installed soundproof double-glazed German windows, customized floor-to-ceiling Italian marble accents, and set up light-routing false ceilings.',
    outcome: 'An increase in active daylight projection of over 180%, creating an ultra-premium, breezy living-dining space integrated with an elegant hidden bar counter.'
  },
  {
    id: 'cs-2',
    title: 'Custom Floating Modular Kitchen Optimization for a High-End Culinary Blogger',
    imageBefore: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=50',
    imageAfter: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    clientName: 'Chef Aditi Verma Kitchen Studio',
    location: 'Hazratganj, Lucknow',
    challenge: 'Limited kitchen space (under 160 sq ft) with zero ergonomic circulation, low vertical cabinet ventilation, and poor background video aesthetics.',
    solution: 'Implemented modular pull-out spice racks, Magic Corner blind cabinets, a built-in convection oven, matte finger-print resistant acrylic cabinetry, and an central photography-optimized quartz breakfast island.',
    outcome: 'A stunning workspace with 40% higher space utilization, allowing professional high-angle food blogging from 3 different camera views.'
  }
];

export const CONTRACTOR_COMPARISON = [
  {
    benefit: 'Transparent Quotations',
    decoruss: 'Complete itemized transparency with precise wood thickness and brand parameters. Zero hidden costs.',
    typical: 'Vague lumpsum quotes with constant post-agreement escalating charges.'
  },
  {
    benefit: '3D Design Modeling',
    decoruss: 'Photorealistic VR-ready 3D renders of your exact space. We build exactly what you approve.',
    typical: 'Handdrawn sketches or generic Google pictures. The result is a surprise.'
  },
  {
    benefit: 'Project Supervision',
    decoruss: 'Dedicated interior architect, daily progress tracker, and site CCTV access option.',
    typical: 'Left to daily-wager unmonitored carpenters. Zero on-site quality testing.'
  },
  {
    benefit: 'Timeline Guarantee',
    decoruss: 'Legal penalty clause of ₹1,000/day back if we miss our hand-over deadline date.',
    typical: 'Endless delays spanning 3 to 6 months beyond promised dates.'
  },
  {
    benefit: 'Material Standard',
    decoruss: 'Premium ISO certified CenturyPly, Greenply, and elite European finishes (BLUM, Hettich original).',
    typical: 'Cheaper local low-grade presswood prone to swelling and termites.'
  },
  {
    benefit: 'Bespoke Warranty Support',
    decoruss: 'Bespoke 10-Year Warranty structure accompanied by instant 48-hour response response.',
    typical: 'Switch off their mobile number once final payment is accepted.'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation & Site Mapping',
    description: 'We meet either online or at your address in Lucknow to review floor layouts, understand aesthetic styles, and establish budget frameworks.'
  },
  {
    step: '02',
    title: 'Detailed Site Audit',
    description: 'Our site engineers measure walls, map electrical plug points, scan ventilation pathways, and assess architectural structural stability.'
  },
  {
    step: '03',
    title: 'Concept & Spatial Layouts',
    description: 'We formulate initial 2D horizontal traffic layouts and moodboards outlining precise space management structures.'
  },
  {
    step: '04',
    title: 'Luxurious 3D Visualization',
    description: 'We build beautiful, precise photorealistic 3D models with exact lighting, custom-color accents, and proposed material fixtures.'
  },
  {
    step: '05',
    title: 'Turnkey Execution Onsite',
    description: 'Our standard-vetted factory produces custom modular structures. Our on-site specialized carpenters implement clean, precise assembly.'
  },
  {
    step: '06',
    title: 'Flawless Project Handover',
    description: 'After passing a rigorous 145-point material quality checklist, we deep-clean, verify automation, and present your absolute dream keys!'
  }
];

export const KITCHEN_SHOWCASE_ITEMS = [
  {
    title: 'Premium Champagne Island',
    subtitle: 'Luxury Open Living Integration',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    finish: 'Metallic Gloss Glass finishes',
    tech: 'German BLUM TIP-ON opening mechanism'
  },
  {
    title: 'Matte Charcoal & Solid Oak',
    subtitle: 'Urban Industrial Loft Aesthetics',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    finish: 'Fingerprint-proof super-matte lacquer',
    tech: 'Integrated LED motion sensor undercabinet lighting'
  },
  {
    title: 'Emerald Green & Quartz Class',
    subtitle: 'Classical Regal Sophistication',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80',
    finish: 'Moisture-resistant high-density timber core',
    tech: 'Larder unit tall towers with 6-stage premium wire trays'
  },
  {
    title: 'Space Saving Dual-Tone Linear',
    subtitle: 'Modern Micro-Apartment Efficiency',
    image: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=600&q=80',
    finish: 'PU Paint dual-tone soft contrast',
    tech: 'Overhead pneumatic bi-fold lift-ups with Aventos technology'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How much does interior design cost in Lucknow with Decoruss?',
    answer: 'The budget depends on your home layout and requirements. Standard premium 2BHK complete packages generally range from ₹3.5 Lakh to ₹6 Lakh, while fully customized luxury 3BHK/4BHK turnkey villas using Italian marble finishes and high-end automation range between ₹8 Lakh to ₹20+ Lakh. We construct itemized quotes with full transparency so there are zero surprises.'
  },
  {
    id: 'faq-2',
    question: 'How long does a turnkey home project take to hand over?',
    answer: 'A standard direct modular kitchen requires only 25 to 30 days. Complete turnkey home interior renovations generally require 45 to 60 days from the day 3D visualizations are finalized. We offer a legally backed timely handover penalty of ₹1,000/day to ensure you get your keys on schedule!'
  },
  {
    id: 'faq-3',
    question: 'Do you provide on-site measurements and 3D designs in Lucknow?',
    answer: 'Absolutely. We offer customized site audits inside the greater Lucknow bounds (including Gomti Nagar, Sushant Golf City, Aliganj, Hazratganj, Mahanagar, and beyond). Upon initial agreement, we offer beautiful photorealistic 3D renders that allow you to preview materials, lighting, and walking circulation before anything is built.'
  },
  {
    id: 'faq-4',
    question: 'Are there warranties with Decoruss custom kitchens and wardrobes?',
    answer: 'All our custom wardrobes, cabinets, and modular kitchen carcasses built from certified Boiling Water Resistant (BWR) plywood carry an official 10-year structural warranty against manufacturing defects, termite wear-and-tear, or moisture delamination. Accessories like Blum and Hettich hardware carry their separate direct warranties.'
  },
  {
    id: 'faq-5',
    question: 'Do you execute the entire project from design to final carpenter cleaning?',
    answer: 'Yes! Decoruss is a comprehensive turnkey company in Lucknow. This means we design, manufacture, procure materials, handle civil flooring, structural glass partitions, false ceiling lighting, paint, final installation, and standard deep cleaning. You only have to open the door and move in.'
  }
];
