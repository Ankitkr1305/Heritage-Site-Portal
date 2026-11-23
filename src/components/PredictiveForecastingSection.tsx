'use client';

import React, { useState } from 'react';
import { Play, Pause, FastForward, Clock, ShieldAlert, Cpu } from 'lucide-react';

export default function PredictiveForecastingSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderTime, setSliderTime] = useState(1); // 0: Now, 1: +1hr, 2: +2hr, 3: +3hr, 4: +4hr

  const timeMilestones = [
    { label: 'Now (17:00)', density: '0.65 p/m²', risk: 'Comfortable', confidence: '99%' },
    { label: '+1 Hr (18:00)', density: '0.98 p/m²', risk: 'Evening Influx', confidence: '96%' },
    { label: '+2 Hr (19:00)', density: '1.82 p/m²', risk: 'Ganga Aarti Peak', confidence: '94%' },
    { label: '+3 Hr (20:00)', density: '1.40 p/m²', risk: 'Dispersal Movement', confidence: '91%' },
    { label: '+4 Hr (21:00)', density: '0.50 p/m²', risk: 'Safe Post-Aarti', confidence: '88%' },
  ];

  const current = timeMilestones[sliderTime];

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      let step = sliderTime;
      const interval = setInterval(() => {
        step = (step + 1) % 5;
        setSliderTime(step);
      }, 1400);

      setTimeout(() => {
        clearInterval(interval);
        setIsPlaying(false);
      }, 7000);
    }
  };

  return (
    <section id="predictive-flow" className="py-20 bg-[#faf8f5] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column matching Photo 7 */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              STAGE 04
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-bold leading-tight">
              Hourly Surge Forecasting & Corridor Planning
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Statistical flow forecasting anticipates crowd build-up at strategic temple steps and monument entrances
              up to four hours ahead, allowing site managers to open secondary corridors before congestion builds.
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 shadow-xs">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Selected Forecast Window:</span>
                  <span className="font-bold text-slate-900">{current.label}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Projected Corridor Density:</span>
                  <span className="font-bold text-red-600">{current.density}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Expected Gathering Status:</span>
                  <span className="font-bold text-amber-700">{current.risk}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Historical Model Confidence:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {current.confidence}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Trained on real historical footfall data from Kumbh Mela, Dev Deepawali, Taj Mahotsav, and holiday rush
                patterns to guarantee smooth public mobility.
              </p>
            </div>
          </div>

          {/* Right Visual matching Photo 7 */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-2xl shadow-xl border border-slate-800 overflow-hidden text-white">
              {/* Top Bar */}
              <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs font-mono">
                <span className="text-gray-400">Site Safety Model • Corridor Elevation Mesh</span>
                <span className="text-emerald-400 font-bold">Varanasi & Agra Heritage Zones</span>
              </div>

              {/* Vector 3D corridor simulation mesh visual */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full relative">
                  <svg className="w-full h-full" viewBox="0 0 500 300">
                    <defs>
                      <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#eab308" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Sacred River line */}
                    <path
                      d="M 400 0 C 430 80, 420 200, 460 300"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="32"
                      strokeOpacity="0.35"
                    />

                    {/* 3D Elevated street grid matching Photo 7 */}
                    {Array.from({ length: 14 }).map((_, i) => {
                      const y = 30 + i * 18;
                      const isHigh = sliderTime >= 2 && i >= 6 && i <= 10;
                      return (
                        <g key={i}>
                          <path
                            d={`M 40 ${y} Q 200 ${y - 15} 410 ${y + 10}`}
                            fill="none"
                            stroke={isHigh ? '#ef4444' : sliderTime === 1 ? '#f59e0b' : '#22c55e'}
                            strokeWidth={isHigh ? '8' : '4.5'}
                            strokeOpacity={isHigh ? '0.95' : '0.65'}
                            strokeLinecap="round"
                          />
                          {isHigh && (
                            <path
                              d={`M 180 ${y - 12} L 180 ${y - 28} L 240 ${y - 28} L 240 ${y - 12}`}
                              fill="#ef4444"
                              fillOpacity="0.3"
                              stroke="#ef4444"
                              strokeWidth="1.5"
                            />
                          )}
                        </g>
                      );
                    })}

                    <path d="M 120 20 L 140 280" fill="none" stroke="#22c55e" strokeWidth="4" strokeOpacity="0.6" />
                    <path
                      d="M 280 20 L 300 280"
                      fill="none"
                      stroke={sliderTime >= 2 ? '#ef4444' : '#f59e0b'}
                      strokeWidth="6"
                      strokeOpacity="0.8"
                    />
                    <path d="M 370 20 L 390 280" fill="none" stroke="#ef4444" strokeWidth="7" strokeOpacity="0.9" />
                  </svg>

                  <div className="absolute top-8 right-16 bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono border border-red-400">
                    Ghat Steps: {sliderTime >= 2 ? 'SURGE PREDICTED (1.82 p/m²)' : 'SAFE FLOW (0.65 p/m²)'}
                  </div>
                  <div className="absolute bottom-16 left-10 bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono border border-emerald-400">
                    Riverfront Corridor: CLEAR & UNCONGESTED
                  </div>
                </div>

                {/* Scrubber */}
                <div className="absolute bottom-3 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="flex items-center space-x-2">
                      <button
                        onClick={handlePlayToggle}
                        className="w-6 h-6 rounded bg-[#48bb78] text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                      </button>
                      <span className="text-white font-bold">Today’s Timeline: 17:00 IST</span>
                    </span>
                    <span className="text-emerald-400 font-bold">Showing: {current.label}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={sliderTime}
                    onChange={(e) => setSliderTime(Number(e.target.value))}
                    className="w-full accent-[#48bb78] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[9px] font-mono text-gray-400 pt-0.5">
                    {timeMilestones.map((m, i) => (
                      <span
                        key={i}
                        onClick={() => setSliderTime(i)}
                        className={`cursor-pointer ${i === sliderTime ? 'text-[#48bb78] font-bold' : 'hover:text-white'}`}
                      >
                        {m.label.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
