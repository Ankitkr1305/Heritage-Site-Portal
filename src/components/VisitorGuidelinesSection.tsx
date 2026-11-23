'use client';

import React from 'react';
import { Camera, Shield, Users, Info, PhoneCall, HelpCircle, CheckCircle } from 'lucide-react';

export default function VisitorGuidelinesSection() {
  const faqs = [
    {
      q: 'Do I need to print my digital QR pass?',
      a: 'No physical printout is necessary. You can show the digital QR pass directly on your mobile screen at the automated optical turnstiles located at the entrance gates.',
    },
    {
      q: 'What happens if I miss my reserved 30-minute arrival window?',
      a: 'Passes include a 45-minute grace period. If you arrive later during peak congestion, gate marshals will facilitate entry as soon as turnstile flow dips below safety limits.',
    },
    {
      q: 'Are luggage and bags allowed inside monuments?',
      a: 'Only small personal handbags and cameras are permitted. Large backpacks, food items, and tobacco must be deposited in the official cloakrooms available at the entrance complexes.',
    },
    {
      q: 'How do I reach the Taj Mahal from parking?',
      a: 'Due to environmental protection laws, polluting vehicles are stopped at Shilpgram (East Gate) and Amrood Ka Tila (West Gate). Free electric battery buggies operate continuously to the gates.',
    },
  ];

  return (
    <section id="guidelines" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            VISITOR INFORMATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-3 font-bold">
            Important Guidelines & FAQs for Tourists
          </h2>
          <p className="text-stone-600 mt-2 text-base leading-relaxed">
            Essential information on dress codes, footwear lockers, accessibility, and photography to make your heritage
            exploration enjoyable and respectful.
          </p>
        </div>

        {/* 4 Guideline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Photography Rules</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Standard photography is allowed throughout all garden complexes. Tripods and commercial drones are strictly
              prohibited under ASI safety guidelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Footwear Lockers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              To preserve marble, shoe covers or barefoot entry are mandatory on the central plinth. Free shoe covers are
              provided with foreign tickets or at the kiosk for ₹10.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Accessibility Ramps</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Wheelchair ramps and step-free pathways are established from East Gate through the main gardens. Wheelchairs
              are available free of charge at the ASI office.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">Helpline 1363 (24x7)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ministry of Tourism 24x7 toll-free tourist helpline available in 12 languages including Hindi, English,
              French, Spanish, German, Japanese, and Russian.
            </p>
          </div>
        </div>

        {/* FAQs Accordion/Grid */}
        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
          <h3 className="font-serif font-bold text-xl text-stone-900 mb-6 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-stone-900">{faq.q}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
