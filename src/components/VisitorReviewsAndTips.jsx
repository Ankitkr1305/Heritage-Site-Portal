'use client';
import React from 'react';
export default function VisitorReviewsAndTips() {
    const tips = [
        {
            monument: 'Taj Mahal (Agra)',
            author: 'Aarav & Meera Kapoor',
            origin: 'New Delhi, India',
            rating: 5,
            date: 'Visited Yesterday',
            tip: 'Book the 06:00 AM sunrise slot and enter through the East Gate! The queue took barely 6 minutes, whereas the West Gate had lines spilling out to the market. The reflection pool in morning light is sublime.',
            tag: 'Best Entrance: East Gate',
        },
        {
            monument: 'Varanasi Dashashwamedh Ghat',
            author: 'Julian Moreau',
            origin: 'Lyon, France',
            rating: 5,
            date: 'Visited 3 days ago',
            tip: 'If you want to view the Ganga Aarti comfortably, reserve a verified terrace e-pass through this portal 3 hours ahead. Riverfront steps get heavily congested by 5:30 PM.',
            tag: 'Ganga Aarti Advice',
        },
        {
            monument: 'Amber Fort & Palace (Jaipur)',
            author: 'Sunita Rathore',
            origin: 'Ahmedabad, Gujarat',
            rating: 5,
            date: 'Visited this week',
            tip: 'The Composite Heritage Ticket was incredible value. Chand Pol gate has almost zero line compared to the main elephant ramp. Do not miss the evening Sheesh Mahal illumination.',
            tag: 'Composite Pass Saver',
        },
        {
            monument: 'Group of Monuments at Hampi',
            author: 'David & Sarah Chen',
            origin: 'Singapore',
            rating: 5,
            date: 'Visited 4 days ago',
            tip: 'Rent an e-bike or bicycle near Virupaksha bazaar. Take the electric buggy directly to the Stone Chariot in Vittala Temple. The acoustic pillars and sunset from Matanga Hill are unforgettable.',
            tag: 'Cycling Route Tip',
        },
    ];
    return (<section className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              COMMUNITY INTELLIGENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold mt-2">
              Visitor Insights & Crowd-Smart Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Field-tested advice from fellow heritage enthusiasts to maximize your experience and bypass peak choke-points.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-stone-600 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
            <span className="flex text-amber-500">★★★★★</span>
            <span className="font-semibold text-stone-800">4.9 / 5.0</span>
            <span className="text-stone-400">• 12,400+ Verified Visitors</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((item, idx) => (<div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    {item.tag}
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(item.rating)}
                  </div>
                </div>

                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  {item.monument}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{item.tip}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-semibold text-stone-800 block">
                    {item.author}
                  </span>
                  <span className="text-stone-400">{item.origin}</span>
                </div>
                <span className="text-stone-400 text-[10px]">{item.date}</span>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
