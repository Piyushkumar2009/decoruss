/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  budgetRange: string;
  propertySize?: string;
  message?: string;
  source: string; // e.g. "Hero Banner", "Contact Form", "Modular Kitchen CTA", "Service Modal"
  createdAt: string;
  status: 'New' | 'Contacted' | 'Meeting Booked' | 'Closed';
}

export interface Project {
  id: string;
  image: string;
  name: string;
  category: 'Homes' | 'Modular Kitchens' | 'Bedrooms' | 'Living Rooms' | 'Office Interiors';
  location: string;
  area: string;
  designStyle: string;
  timeline?: string;
  description?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  imageBefore: string;
  imageAfter: string;
  clientName: string;
  location: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface Testimonial {
  id: string;
  photo: string;
  name: string;
  projectType: string;
  location: string;
  rating: number;
  review: string;
  designStyle: string;
}

export interface VideoTestimonial {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
  videoUrl: string; // Simulated link to trigger play overlay
  clientName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
