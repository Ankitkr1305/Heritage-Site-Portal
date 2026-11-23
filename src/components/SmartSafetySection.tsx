'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Clock, Users, ArrowRight, CheckCircle2, MapPin, Camera, Play, RefreshCw, AlertCircle } from 'lucide-react';

interface SmartSafetyProps {
  onOpenDashboard: () => void;
}

export default function SmartSafetySection({ onOpenDashboard }: SmartSafetyProps) {
  const [activeTab, setActiveTab] = useState<'quotas' | 'turnstiles' | 'balancing' | 'guidelines'>('quotas');
  const [isTestingSimulation, setIsTestingSimulation] = useState(false);
  const [simulationMsg, setSimulationMsg] = useState<string | null>(null);

  const handleTestDiversion = () => {
    setIsTestingSimulation(true);
    setSimulationMsg(null);
    setTimeout(() => {
      setIsTestingSimulation(false);
      setSimulationMsg('✓ Gate Balancing Activated: 240 visitors routed from West Gate to South Gate. Queue wait reduced from 44m to 12m.');
    }, 1200);
  };

  return (
    <section id="how-it-works" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            VISITOR SAFETY & PRESERVATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-3 font-bold">
            How the Crowd Management System Works
          </h2>
          <p className="text-stone-600 mt-2 text-base leading-relaxed">
            Designed to protect delicate marble and ancient sandstone while giving every tourist and pilgrim a peaceful,
            queue-free visit through coordinated gate management.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-100">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Hourly Slot Quotas</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Limits peak entry to safe structural thresholds (e.g. 4,500 visitors per hour at the Taj Mahal) so viewing
                plazas and courtyards never get dangerously congested.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4 border border-blue-100">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Optical Turnstiles</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Non-invasive optical counters installed at entrance and exit turnstiles track real-time footfall without
                capturing any facial or personal visitor identities.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm mb-4 border border-amber-100">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Live Queue Balancing</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                When West Gate exceeds a 30-minute line, digital display signs and SMS advisories direct visitors to South
                Gate where lines are under 10 minutes.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm mb-4 border border-purple-100">
                04
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">On-Site Marshals</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Trained ASI personnel and tourist police receive live tablet notifications to smoothly clear bottlenecks
                before crowds experience discomfort.
              </p>
            </div>
          </div>
        </div>

        {/* Live Gate Monitoring Box (Grounded & Realistic) */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                LIVE GATE TELEMETRY CONSOLE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                Real-Time Gate Coordination: Taj Mahal & Varanasi Corridors
              </h3>
            </div>
            <Link
              href="/admin"
              className="bg-stone-900 hover:bg-black text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-2 self-start md:self-auto shadow-xs"
            >
              <span>Launch Field Control Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gate 1 */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 relative">
              <span className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                FAST LANE (RECOMMENDED)
              </span>
              <p className="font-serif font-bold text-base text-stone-900">Taj Mahal — South Gate</p>
              <p className="text-xs text-stone-500 mt-0.5">Approach: Tajganj Courtyard</p>

              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Queue Wait Time</span>
                  <span className="text-2xl font-bold font-mono text-emerald-800">9 Mins</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Turnstiles Open</span>
                  <span className="text-xs font-semibold text-stone-800">4 of 4 Active</span>
                </div>
              </div>
            </div>

            {/* Gate 2 */}
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 relative">
              <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                CONGESTED
              </span>
              <p className="font-serif font-bold text-base text-stone-900">Taj Mahal — West Gate</p>
              <p className="text-xs text-stone-500 mt-0.5">Approach: Main Bazaar Road</p>

              <div className="mt-4 pt-3 border-t border-red-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Queue Wait Time</span>
                  <span className="text-2xl font-bold font-mono text-red-700">44 Mins</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Status</span>
                  <span className="text-xs font-semibold text-red-800">Rerouting Active</span>
                </div>
              </div>
            </div>

            {/* Gate 3 */}
            <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/60 relative">
              <span className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                NORMAL FLOW
              </span>
              <p className="font-serif font-bold text-base text-stone-900">Taj Mahal — East Gate</p>
              <p className="text-xs text-stone-500 mt-0.5">Approach: Shilpgram Electric Buggy</p>

              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Queue Wait Time</span>
                  <span className="text-2xl font-bold font-mono text-stone-900">18 Mins</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Shuttle Buggy</span>
                  <span className="text-xs font-semibold text-emerald-700">Every 4 Mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Gate Balancing Simulation Test */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              <span className="font-semibold text-stone-800">Automated Signage:</span> Incoming tourists on the Agra
              mobile network are sent push SMS advice to divert to South Gate when West Gate exceeds 30 minutes.
            </div>

            <button
              onClick={handleTestDiversion}
              disabled={isTestingSimulation}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs px-4 py-2.5 rounded-lg border border-stone-300 transition-colors flex items-center space-x-2 shrink-0 disabled:opacity-50"
            >
              {isTestingSimulation ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Testing Gate Diversion...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                  <span>Test Automated Diversion</span>
                </>
              )}
            </button>
          </div>

          {simulationMsg && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{simulationMsg}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
