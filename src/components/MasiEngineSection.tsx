'use client';

import React, { useState } from 'react';
import { Eye, BarChart3, Cpu, AlertOctagon, CheckCircle2, Play, RefreshCw, Shield } from 'lucide-react';

interface MasiEngineProps {
  onTriggerIntervention?: (title: string, chokepoint: string) => void;
}

export default function MasiEngineSection({ onTriggerIntervention }: MasiEngineProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const steps = [
    {
      num: '1',
      letter: 'M',
      title: 'Measure',
      desc: 'Optical turnstile sensors and entrance cameras continuously count incoming and outgoing visitors at each heritage gate.',
      subtext: 'Measures footfall numbers without saving any personal images or facial identities.',
    },
    {
      num: '2',
      letter: 'A',
      title: 'Analyze',
      desc: 'Algorithms calculate localized crowd density (persons per square meter) in narrow corridors and marble plinths.',
      subtext: 'Flags potential bottlenecks before discomfort or physical congestion begins.',
    },
    {
      num: '3',
      letter: 'S',
      title: 'Simulate',
      desc: 'Field protocols test diversion scenarios — such as opening the South Gate garden corridor or adjusting entry pace.',
      subtext: 'Finds the safest, smoothest walking route for visitors.',
    },
    {
      num: '4',
      letter: 'I',
      title: 'Intervene',
      desc: 'Automated guidance updates electronic gate notice boards and directs site marshals to smoothly guide tourists.',
      subtext: 'Keeps families and pilgrims moving safely with zero confusion.',
    },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);

    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current <= 4) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationResult(
          'Simulation Complete: 240 visitors routed from West Gate to South Gate. Corridor density stabilized to comfortable 0.62 persons/m².'
        );
        if (onTriggerIntervention) {
          onTriggerIntervention('Precautionary Gate Reroute', 'Taj Mahal West Gate');
        }
      }
    }, 850);
  };

  return (
    <section id="masi-engine" className="py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header matching Photo 5 with humanized tone */}
        <div className="mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            CROWD SAFETY FRAMEWORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-3 font-bold">
            The MASI Protocol for Heritage Crowd Flow
          </h2>
          <p className="text-slate-600 mt-2 text-base max-w-3xl leading-relaxed">
            A proven, four-step crowd management methodology deployed across high-density spiritual gatherings and
            national monuments to guarantee peaceful, safe, and dignified visitor experiences.
          </p>
        </div>

        {/* Feature 01 Layout matching Photo 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Window Bar */}
              <div className="bg-slate-100 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-sans font-medium text-slate-700 ml-2">
                    MASI Operational Loop • Field Console
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Status: Active
                </span>
              </div>

              {/* Photo & 4-Steps Side-by-Side matching Photo 5 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[380px]">
                {/* Photo Side */}
                <div className="sm:col-span-6 relative overflow-hidden bg-slate-900">
                  <img
                    src="/images/monuments/varanasi-ghats.jpg"
                    alt="Varanasi Riverfront Gathering"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-sans bg-black/60 backdrop-blur-sm p-2 rounded border border-white/10">
                    Dashashwamedh Ghat & Corridor Management
                  </div>
                </div>

                {/* MASI 4 Steps Column */}
                <div className="sm:col-span-6 p-6 flex flex-col justify-between bg-slate-50/60">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-11 h-11 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center font-serif font-bold text-amber-900 text-lg shadow-xs">
                        🏛️
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xl text-slate-900">MASI</h4>
                        <p className="text-xs text-slate-500 font-medium">Standard Safety Cycle</p>
                      </div>
                    </div>

                    <h5 className="font-sans text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                      FOUR STAGES
                    </h5>

                    <ol className="space-y-3 font-serif text-base text-slate-800">
                      {steps.map((s, idx) => (
                        <li
                          key={idx}
                          onClick={() => setActiveStep(Number(s.num))}
                          className={`cursor-pointer p-2 rounded-lg transition-all flex items-center space-x-2 ${
                            activeStep === Number(s.num)
                              ? 'bg-white shadow-sm border border-gray-200 font-bold text-slate-900'
                              : 'hover:bg-gray-100 text-slate-600'
                          }`}
                        >
                          <span className="font-mono text-xs text-slate-400">{s.num}.</span>
                          <span>
                            <span className="text-red-600 font-bold underline decoration-2">{s.letter}</span>
                            {s.title.slice(1)}.
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Test button */}
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <button
                      onClick={handleRunSimulation}
                      disabled={isSimulating}
                      className="w-full bg-slate-900 hover:bg-black text-white font-medium text-xs py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Testing Protocol...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Protocol Test</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {simulationResult && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-sans text-emerald-800 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{simulationResult}</span>
              </div>
            )}
          </div>

          {/* Right Text Column matching Photo 5 */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              STAGE 01
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-bold leading-tight">
              A Closed-Loop Process for Crowd Safety
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Developed in partnership with site preservationists and disaster-management experts, the MASI Protocol
              ensures heritage grounds never exceed physical carrying limits while giving every visitor ample space for
              photography and reflection.
            </p>

            <div className="space-y-3.5 pt-2">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border transition-all ${
                    activeStep === Number(st.num)
                      ? 'border-[#48bb78] bg-emerald-50/40 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {st.num}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 font-serif">
                      <span className="text-red-600 font-bold">{st.letter}</span>
                      {st.title.slice(1)}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed ml-9">{st.desc}</p>
                  <p className="text-[11px] text-slate-500 mt-1 ml-9 font-sans">{st.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
