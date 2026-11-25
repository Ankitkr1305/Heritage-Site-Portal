'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
export default function PricingSection({ onContactDemo }) {
    const costComponents = [
        {
            badge: 'ONE-TIME FEE',
            title: 'Onboarding & Setup',
            desc: 'Configuring and launching the solution for your agency or archaeological trust, tailored to your specific monument requirements.',
        },
        {
            badge: 'SUBSCRIPTION',
            title: 'Cloud Storage & AI Compute',
            desc: 'Unlimited data storage, unlimited edge-AI inferences, and always-on secure access to the command-center dashboard and visitor APIs.',
        },
        {
            badge: 'PER SENSOR',
            title: 'Sensor Hardware',
            desc: 'Non-invasive solar installation, maintenance, warranty, 4G/5G cellular data telemetry, and optics for each deployed CitySensor.',
        },
        {
            badge: 'IF APPLICABLE',
            title: 'Private Space Lease',
            desc: 'Lease fee when a sensor is installed on private heritage properties or bazaar terraces instead of leveraging municipal poles.',
        },
        {
            badge: 'AS SCOPED',
            title: 'Professional Services',
            desc: 'Translating big data and AI models into actionable crowd-flow guidelines and evacuation protocols for city magistrates and police.',
        },
        {
            badge: 'AS SCOPED',
            title: 'Customer Success & Training',
            desc: 'Knowledge transfer, on-site drill training, and 24/7 surge support that builds local operational capacity within your team.',
        },
        {
            badge: 'BY SYSTEM COUNT',
            title: 'Integrations',
            desc: 'Scales with the number of third-party ticketing apps, turnstiles, CCTV streams, and municipal smart-city platforms integrated.',
        },
        {
            badge: 'BY SCALE & DENSITY',
            title: 'Crowd Density',
            desc: 'Peak footfall and square-meter density drive the density of optical sensors required for choke-point monitoring.',
        },
        {
            badge: 'BY EVENT FREQUENCY',
            title: 'Events Calendar',
            desc: 'The frequency and magnitude of seasonal religious festivals, VIP summits, and cultural fairs influence the deployment scope.',
        },
    ];
    return (<section id="pricing" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header matching Photo 3 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 font-medium">
            Pricing scoped to your deployment
          </h2>

          <div className="my-5">
            <span className="text-[12px] font-mono tracking-widest text-[#2f855a] uppercase font-bold block mb-1">
              PRICING IS
            </span>
            <p className="text-5xl sm:text-6xl font-serif text-gray-900 font-normal tracking-tight">
              Custom
            </p>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Crowd Management costs vary with the scope of the project, the area monitored, the number of sensors, the AI
            inferences required, and your team’s readiness to adopt a big-data and AI solution. Typical cost components
            include:
          </p>
        </div>

        {/* 3x3 Card Grid matching Photos 1, 2, 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {costComponents.map((item, idx) => (<div key={idx} className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#48bb78] hover:shadow-md transition-all flex flex-col justify-start">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#2f855a] uppercase block mb-3">
                {item.badge}
              </span>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">{item.desc}</p>
            </div>))}
        </div>

        {/* Bottom Banner matching Photo 1/2 footer */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">
            WE SCOPE THE FULL COST WITH YOU UP FRONT — NO SURPRISES BEFORE YOU SIGN.
          </p>

          <div>
            <button onClick={onContactDemo} className="bg-[#48bb78] hover:bg-[#38a169] text-white font-mono font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md shadow-sm hover:shadow-md transition-all inline-flex items-center space-x-2">
              <span>CONTACT US FOR A DEMO & PRICING</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </section>);
}
