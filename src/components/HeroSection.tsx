'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Users, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  onExploreDestinations: () => void;
}

export default function HeroSection({
  onOpenBooking,
  onOpenDashboard,
  onExploreDestinations,
}: HeroSectionProps) {
  const [selectedDemoLocation, setSelectedDemoLocation] = useState<'varanasi' | 'taj'>('taj');

  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 bg-[#fffdfa] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column - Warm, prestigious, authentic */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/90 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold">Official Smart-Tourism Initiative</span>
              <span className="text-emerald-400">•</span>
              <span className="text-gray-600">Preserving Monument Safety & Dignity</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-serif text-slate-900 leading-[1.18] font-bold tracking-tight">
              Crowd Management for India’s World Heritage Sites
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-xl">
              Plan a peaceful visit to the <strong>Taj Mahal</strong>, <strong>Varanasi Ghats</strong>, <strong>Red Fort</strong>,
              and iconic destinations. Check real-time gate queues, reserve guaranteed entry time-slots, and avoid
              bottleneck surges with coordinated crowd guidance.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
              >
                <span>Book Guaranteed Entry Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDestinations}
                className="bg-white hover:bg-stone-50 text-slate-800 border border-stone-300 font-semibold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <span>Check Live Gate Wait Times</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>

            {/* Trust and Key Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200/80 max-w-lg">
              <div>
                <p className="text-2xl font-serif font-bold text-slate-900">7 Sites</p>
                <p className="text-xs text-stone-500 mt-0.5">Active Gate Telemetry</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-emerald-700">100% Safe</p>
                <p className="text-xs text-stone-500 mt-0.5">Hourly Quota Limits</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-slate-900">&lt; 10 Mins</p>
                <p className="text-xs text-stone-500 mt-0.5">Recommended Fast Gates</p>
              </div>
            </div>
          </div>

          {/* Right Visual matching Photo 9 with humanized annotations */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-slate-900">
              {/* Location Switcher */}
              <div className="absolute top-4 right-4 z-20 flex bg-black/60 backdrop-blur-md rounded-lg p-1 border border-white/20">
                <button
                  onClick={() => setSelectedDemoLocation('taj')}
                  className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                    selectedDemoLocation === 'taj' ? 'bg-[#48bb78] text-white font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Taj Mahal, Agra
                </button>
                <button
                  onClick={() => setSelectedDemoLocation('varanasi')}
                  className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                    selectedDemoLocation === 'varanasi' ? 'bg-[#48bb78] text-white font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Varanasi Sacred Ghats
                </button>
              </div>

              {/* Main Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={
                    selectedDemoLocation === 'taj'
                      ? '/images/monuments/taj-mahal.jpg'
                      : '/images/monuments/varanasi-ghats.jpg'
                  }
                  alt={selectedDemoLocation === 'taj' ? 'Taj Mahal Courtyard' : 'Varanasi Ghats'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"></div>

                {/* Human-centric realistic gate labels */}
                <div className="absolute top-1/4 left-6 bg-slate-900/85 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-lg text-xs space-y-1 shadow-lg">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>South Gate: Fast Lane Open</span>
                  </div>
                  <p className="text-[11px] text-gray-300">Queue time: 9 minutes only</p>
                </div>

                <div className="absolute bottom-1/3 right-6 bg-slate-900/85 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-lg text-xs space-y-1 shadow-lg">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>West Gate: Busy Corridor</span>
                  </div>
                  <p className="text-[11px] text-gray-300">Wait time: 44 minutes</p>
                </div>
              </div>

              {/* Bottom bar matching Photo 9 pill */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-gray-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-4.5"></span>
                <span className="text-[11px] font-mono font-bold tracking-wider text-gray-800 uppercase">
                  {selectedDemoLocation === 'taj' ? 'LIVE AT TAJ MAHAL, AGRA' : 'LIVE IN VARANASI, INDIA'}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 z-20 text-white text-xs font-mono bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 hidden sm:block">
                Turnstiles Operating: Normal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
