'use client';

import React, { useState } from 'react';
import { Eye, ShieldCheck, Sun, Layers, Crosshair, Users, Activity, Check } from 'lucide-react';

export default function ComputerVisionSection() {
  const [showBoxes, setShowBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [privacyMask, setPrivacyMask] = useState(true);

  // Simulated bounding box elements matching Photo 8
  const boundingBoxes = [
    { top: '35%', left: '22%', width: '5%', height: '14%', label: 'Visitor', color: 'border-amber-400 bg-amber-400/10' },
    { top: '42%', left: '30%', width: '6%', height: '16%', label: 'Visitor', color: 'border-white bg-white/10' },
    { top: '38%', left: '45%', width: '5%', height: '15%', label: 'Visitor', color: 'border-amber-400 bg-amber-400/10' },
    { top: '50%', left: '55%', width: '7%', height: '18%', label: 'Wheelchair / Accessibility', color: 'border-purple-400 bg-purple-500/20 text-purple-200' },
    { top: '65%', left: '72%', width: '12%', height: '18%', label: 'Electric Shuttle Buggy', color: 'border-cyan-400 bg-cyan-400/20 text-cyan-200' },
    { top: '68%', left: '60%', width: '7%', height: '16%', label: 'Guide Rickshaw', color: 'border-emerald-400 bg-emerald-400/20 text-emerald-200' },
    { top: '28%', left: '62%', width: '4%', height: '12%', label: 'Visitor', color: 'border-white bg-white/10' },
    { top: '33%', left: '75%', width: '6%', height: '15%', label: 'Visitor', color: 'border-amber-400 bg-amber-400/10' },
    { top: '48%', left: '15%', width: '6%', height: '16%', label: 'Family Group', color: 'border-white bg-white/10' },
  ];

  return (
    <section id="cv-sensing" className="py-20 bg-[#faf8f5] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              STAGE 02
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-bold leading-tight">
              Non-Invasive Optical Sensors & Turnstile Monitoring
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Autonomous solar sensors positioned at high-priority heritage gates monitor footfall numbers with zero
              drilling into historic stone or marble — counting crowds while strictly protecting visitor anonymity.
            </p>

            {/* Practical Heritage Highlights */}
            <div className="space-y-4 pt-1">
              <div className="flex items-start space-x-3">
                <Sun className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Drilling & Heritage-Safe Mounts</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Designed in accordance with Archaeological Survey of India (ASI) standards using non-damaging clamp
                    fixtures and solar power.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Privacy by Design (No Facial Recognition)</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Sensors only register spatial contours and counts. No facial images or biometric records are ever
                    captured or stored.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Accessibility & Wheelchair Detection</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Identifies visitors with mobility aids, prams, and senior citizens to prioritize step-free access
                    ramps at gate entries.
                  </p>
                </div>
              </div>
            </div>

            {/* Field Controls */}
            <div className="p-4 bg-white rounded-xl border border-gray-200/90 shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider block">
                Live Field Display Toggles
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowBoxes(!showBoxes)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    showBoxes ? 'bg-slate-900 text-white border-slate-900' : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {showBoxes ? '✓ Detection Grid On' : 'Show Detection Grid'}
                </button>
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    showHeatmap ? 'bg-amber-600 text-white border-amber-600' : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {showHeatmap ? '✓ Density Heatmap On' : 'Density Heatmap'}
                </button>
                <button
                  onClick={() => setPrivacyMask(!privacyMask)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    privacyMask ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {privacyMask ? '✓ Privacy Masking: Active' : 'Privacy Masking: Off'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual matching Photo 8 */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
              {/* Header bar */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800 text-white text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold font-mono">Sensor Node 59 • Godowlia Heritage Concourse</span>
                </div>
                <div className="text-gray-400 text-[11px] font-mono">
                  Optical Status: Clear • Turnstile Sync: 100%
                </div>
              </div>

              {/* Feed viewport */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src="/images/monuments/varanasi-ghats.jpg"
                  alt="Chokepoint Feed"
                  className="w-full h-full object-cover filter contrast-105"
                />

                {showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-radial from-amber-600/35 via-emerald-500/20 to-transparent pointer-events-none mix-blend-color-dodge"></div>
                )}

                {/* Simulated Bounding Boxes matching Photo 8 */}
                {showBoxes &&
                  boundingBoxes.map((box, idx) => (
                    <div
                      key={idx}
                      className={`absolute border-2 rounded-xs transition-all pointer-events-none ${box.color}`}
                      style={{
                        top: box.top,
                        left: box.left,
                        width: box.width,
                        height: box.height,
                      }}
                    >
                      <span className="absolute -top-3.5 left-0 bg-black/80 text-white px-1 py-0.2 rounded text-[8px] font-mono tracking-tight">
                        {box.label}
                      </span>
                    </div>
                  ))}

                {/* Top-right tally panel */}
                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white font-mono text-[11px] space-y-1">
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Visitors Counted:</span>
                    <span className="font-bold text-emerald-400">329</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Walking Flow:</span>
                    <span className="font-bold text-white">45 / min</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Special Mobility:</span>
                    <span className="font-bold text-purple-400">4 Ramps in use</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Corridor Density:</span>
                    <span className="font-bold text-emerald-400">0.65 p/m² (Safe)</span>
                  </div>
                </div>

                {/* Bottom telemetry caption */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10 text-white text-[10px] font-mono flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Solar Node 59 • Battery: 96% • Privacy Protection Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
