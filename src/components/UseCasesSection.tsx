'use client';

import React from 'react';
import { Landmark, Train, Building2, ShieldAlert, Smartphone, Compass } from 'lucide-react';

export default function UseCasesSection() {
  const useCases = [
    {
      icon: Landmark,
      title: 'Festivals & Mass Gatherings',
      desc: 'Keep pilgrims and visitors safe through macro-surges at events like Maha Kumbh, Maha Shivratri, and Dev Deepawali, where hundreds of thousands move through narrow corridors at once.',
    },
    {
      icon: Train,
      title: 'Transit Hubs & Stations',
      desc: 'Measure and predict crowding at stations, terminals, and transfer points so operators can hold, divert, or release flows before platforms and concourses reach dangerous density.',
    },
    {
      icon: Building2,
      title: 'Public Spaces & Corridors',
      desc: 'Watch density and movement across ghats, markets, downtowns, and heritage streets, turning the busiest public spaces into monitored, manageable environments.',
    },
    {
      icon: Compass,
      title: 'Monuments & World Heritage Sites',
      desc: 'Safeguard historic marble plinths, ancient stone carvings, and delicate archaeological ruins by strictly regulating instantaneous footfall.',
    },
    {
      icon: ShieldAlert,
      title: 'Incident Command & First Responders',
      desc: 'Equip marshals, police control rooms, and medical quick-response teams with instantaneous alerts and recommended evacuation corridors.',
    },
    {
      icon: Smartphone,
      title: 'Smart-Tourism Mobile Navigation',
      desc: 'Empower international and domestic tourists with transparent live wait-time boards, digital ticketing, and smart time-slot bookings.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Photo 6 */}
        <div className="mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2f855a] uppercase">
            USE CASES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mt-2 font-medium">
            How destinations benefit from HeritageData’s Crowd Management solution
          </h2>
          <p className="text-gray-600 mt-3 text-base max-w-3xl">
            From festival macro-surges to everyday monument visits, authorities turn measured density and predicted
            flow into safer, more enjoyable public spaces.
          </p>
        </div>

        {/* 3-Column Grid matching Photo 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-gray-200/90 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900">{uc.title}</h3>
                  <p className="text-sm text-gray-600 mt-2.5 leading-relaxed font-sans">{uc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
