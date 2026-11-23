'use client';

import React from 'react';
import {
  Accessibility,
  Zap,
  Headphones,
  Luggage,
  Droplets,
  HeartPulse,
  Camera,
  Compass,
} from 'lucide-react';

export default function VisitorAmenitiesGuide() {
  const amenities = [
    {
      icon: Accessibility,
      title: 'Wheelchair & Barrier-Free Access',
      desc: 'Free manual and motorized wheelchairs available at entrance security gates with ramp connectivity throughout main monument plazas.',
      availability: 'All 7 Destinations',
    },
    {
      icon: Zap,
      title: 'Eco Battery-Operated Shuttles',
      desc: 'Clean electric carts shuttle visitors from exterior car parks to inner ticket turnstiles at Taj Mahal, Red Fort, and Hampi.',
      availability: 'Available (₹20 - ₹50 fare)',
    },
    {
      icon: Headphones,
      title: 'Multilingual Digital Audio Guides',
      desc: 'Official ASI audio tour downloadable via QR code or handheld device in 12 languages including Hindi, English, French, Spanish & Japanese.',
      availability: 'Available at Helpdesk',
    },
    {
      icon: Luggage,
      title: 'Secured Luggage Cloakrooms',
      desc: 'Safe tokenized lockers to deposit large backpacks, bags, laptops, and restricted items before passing through metal detectors.',
      availability: 'Free of Charge',
    },
    {
      icon: Droplets,
      title: 'R.O. Purified Water Stations',
      desc: 'Complimentary clean, chilled drinking water refilling fountains positioned along major visitor promenades and courtyard gardens.',
      availability: 'Throughout Premises',
    },
    {
      icon: HeartPulse,
      title: 'First Aid & Medical Station',
      desc: 'Dedicated paramedic room with emergency defibrillators, basic medications, and on-call ambulance ties with district hospitals.',
      availability: '24x7 Active',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            VISITOR COMFORT & ACCESSIBILITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold mt-2">
            Essential On-Site Amenities & Services
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Archaeological Survey of India ensures comfortable, barrier-free, and respectful exploration for all visitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-emerald-800 flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 font-mono">STATUS</span>
                  <span className="font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {item.availability}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
