'use client';

import React, { useState } from 'react';
import { Activity, MapPin, Gauge, BarChart2, Radio, Camera, ArrowUpRight } from 'lucide-react';
import { SensorData } from '@/data/initialData';

interface RealtimeDensityProps {
  sensors: SensorData[];
  onOpenFullDashboard: () => void;
}

export default function RealtimeDensitySection({
  sensors,
  onOpenFullDashboard,
}: RealtimeDensityProps) {
  const [selectedSensorIndex, setSelectedSensorIndex] = useState(0);
  const sensor = sensors[selectedSensorIndex] || sensors[0];

  return (
    <section id="live-density" className="py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual matching Photo 4 Window */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* macOS Style Bar */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-sans font-medium text-slate-700 ml-2">
                    Gate Telemetry & Density Monitor
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedSensorIndex}
                    onChange={(e) => setSelectedSensorIndex(Number(e.target.value))}
                    className="text-xs font-sans bg-white border border-gray-300 rounded px-2.5 py-1 text-slate-700 focus:outline-none"
                  >
                    {sensors.map((s, idx) => (
                      <option key={s.sensorCode} value={idx}>
                        {s.sensorCode} - {s.location.split(',')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main Inside Card matching Photo 4 */}
              <div className="p-5 sm:p-6 space-y-6">
                {/* Header row: Sensor Name & Metrics */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <span className="text-[11px] font-mono text-gray-500 uppercase">Heritage Sensor Station</span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{sensor.sensorCode}</h4>
                    <p className="text-xs text-slate-600 font-sans flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{sensor.location}</span>
                    </p>
                  </div>

                  {/* Big Number Stats matching Photo 4 */}
                  <div className="flex items-center space-x-6 sm:space-x-8">
                    <div className="text-center">
                      <p className="text-3xl sm:text-4xl font-bold font-mono text-slate-900">{sensor.peopleInView}</p>
                      <span className="text-[10px] text-slate-500 font-mono uppercase block mt-0.5">
                        Number of people in camera view
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-3xl sm:text-4xl font-bold font-mono text-slate-900">{sensor.crowdDensity}</p>
                      <span className="text-[10px] text-slate-500 font-mono uppercase block mt-0.5">
                        Crowd density (people / sq meter)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div
                  className={`w-full py-1.5 px-4 rounded text-center text-xs font-mono font-bold tracking-widest uppercase ${
                    sensor.status === 'NORMAL'
                      ? 'bg-[#48bb78] text-white'
                      : sensor.status === 'HIGH'
                      ? 'bg-amber-500 text-white'
                      : 'bg-red-600 text-white animate-pulse'
                  }`}
                >
                  {sensor.statusLabel}
                </div>

                {/* Mid Grid: Camera feed on left + GIS Map on right */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Camera feed */}
                  <div className="space-y-2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-gray-200">
                      <img
                        src="/images/monuments/varanasi-ghats.jpg"
                        alt="Sensor Stream"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[9px] font-mono text-white flex items-center space-x-1">
                        <Camera className="w-3 h-3 text-emerald-400" />
                        <span>LIVE CHOKEPOINT CAMERA</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-emerald-600 px-2 py-0.5 rounded text-[9px] font-mono text-white">
                        Updated {sensor.lastInference}
                      </div>
                    </div>
                  </div>

                  {/* GIS Corridor Map matching Photo 4 */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 border border-gray-200 flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <span className="font-bold flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>Street Flow Corridor</span>
                      </span>
                      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-gray-200">
                        GPS: 25.3109° N, 83.0107° E
                      </span>
                    </div>

                    {/* Vector road corridors graphic */}
                    <div className="my-auto relative h-28 w-full flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <line x1="10" y1="50" x2="190" y2="50" stroke="#48bb78" strokeWidth="6" strokeLinecap="round" />
                        <line x1="90" y1="10" x2="90" y2="90" stroke="#f56565" strokeWidth="8" strokeLinecap="round" />
                        <line x1="90" y1="50" x2="170" y2="20" stroke="#ed8936" strokeWidth="5" strokeLinecap="round" />
                        <circle cx="90" cy="50" r="7" fill="#e53e3e" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
                        <circle cx="90" cy="50" r="5" fill="#e53e3e" />
                      </svg>
                      <div className="absolute top-1 left-2 text-[9px] font-mono bg-white/95 px-1.5 py-0.5 rounded shadow-xs text-slate-700">
                        Corridor A: Smooth Flow
                      </div>
                      <div className="absolute bottom-1 right-2 text-[9px] font-mono bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">
                        Bazaar Alley: Heavy Queue
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>Flow Rate: {sensor.flowRatePerMin} / min</span>
                      <span>Pressure: {sensor.pressureKPa} kPa</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Chart: Hourly Occupancy Bars matching Photo 4 */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-600">
                    <span className="font-bold">15-min Interval Occupancy & Density</span>
                    <span className="text-[10px] text-slate-400">Past 6 Hours</span>
                  </div>

                  <div className="h-28 w-full flex items-end justify-between gap-1 pt-4">
                    {sensor.historyTimeline.map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.occupancy}
                        </span>
                        <div
                          className="w-full bg-[#48bb78] hover:bg-[#38a169] rounded-t-xs transition-all"
                          style={{ height: `${Math.min((item.occupancy / 600) * 100, 100)}%` }}
                        ></div>
                        <span className="text-[8px] font-mono text-slate-400 mt-1 truncate w-full text-center">
                          {item.time.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Chart Legend matching photo */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[10px] font-mono text-slate-500 border-t border-gray-100">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-[#48bb78]"></span>
                      <span>Normal</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>High</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      <span>Very High</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                      <span>Critical</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column matching Photo 4 */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              STAGE 03
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-bold leading-tight">
              Real-Time Density & Flow Measurement
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Live density, queue-flow rate, pressure, and throughput metrics for every monitored gate and corridor,
              streamed continuously to the site control room.
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/70">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                  Continuous Footfall Metrics
                </span>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Calculates incoming vs outgoing visitors every 15 minutes, ensuring courtyards and viewing terraces
                  remain uncrowded.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/70">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                  Dynamic Queue Balancing
                </span>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  When a gate exceeds a 30-minute queue, electronic signage automatically advises incoming visitors to
                  use alternate open entrances with 5 to 10 minute wait times.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenFullDashboard}
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-black text-white font-medium text-xs uppercase tracking-wider px-5 py-3.5 rounded-lg shadow-sm transition-all"
            >
              <span>OPEN ASI CONTROL ROOM CONSOLE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
