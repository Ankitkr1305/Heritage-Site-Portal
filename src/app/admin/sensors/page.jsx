'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Radio, RefreshCw, BatteryCharging, Sun, } from 'lucide-react';
export default function AdminSensorsPage() {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSensors();
    }, []);
    const fetchSensors = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/sensors');
            const data = await res.json();
            if (data.success && data.sensors) {
                setSensors(data.sensors);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Radio className="w-4 h-4"/>
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Optical Turnstiles & Field Sensor Telemetry
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Dedicated site to monitor IoT solar-powered turnstile throughput, entrance flow rates, and density telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={fetchSensors} className="flex items-center space-x-1.5 text-xs bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-3 py-2 rounded-lg transition-colors shadow-2xs">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}/>
            <span>Poll Telemetry</span>
          </button>

          <Link href="/admin" className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-lg transition-colors">
            Back to Overview
          </Link>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => (<div key={sensor.sensorCode} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-500 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 block">
                    {sensor.sensorCode}
                  </span>
                  <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                    {sensor.name}
                  </h3>
                  <p className="text-xs text-stone-500">{sensor.location}</p>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${sensor.status === 'NORMAL'
                ? 'bg-emerald-100 text-emerald-800'
                : sensor.status === 'HIGH'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800 animate-pulse'}`}>
                  {sensor.statusLabel}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100 text-center">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">In View</span>
                  <span className="text-lg font-mono font-bold text-stone-900">
                    {sensor.peopleInView}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Flow / Min</span>
                  <span className="text-lg font-mono font-bold text-emerald-700">
                    {sensor.flowRatePerMin}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Density</span>
                  <span className="text-lg font-mono font-bold text-stone-900">
                    {sensor.crowdDensity}p/m²
                  </span>
                </div>
              </div>

              {/* Pedestrian vs Wheelchair detections */}
              <div className="text-xs text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>Pedestrians:</span>
                  <span className="font-mono font-semibold">{sensor.detections.pedestrians}</span>
                </div>
                <div className="flex justify-between">
                  <span>Children:</span>
                  <span className="font-mono font-semibold">{sensor.detections.children}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wheelchairs / Assisted:</span>
                  <span className="font-mono font-semibold text-emerald-700">{sensor.detections.wheelchairs}</span>
                </div>
              </div>
            </div>

            {/* Bottom: Battery & Solar status */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
              <span className="flex items-center space-x-1">
                <Sun className="w-3.5 h-3.5 text-amber-500"/>
                <span>Solar Eco-Node</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                <BatteryCharging className="w-3.5 h-3.5"/>
                <span>{sensor.batteryPercentage}% Charged</span>
              </span>
            </div>
          </div>))}
      </div>
    </div>);
}
