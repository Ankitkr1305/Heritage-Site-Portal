'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sliders,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { MonumentData } from '@/data/initialData';

export default function AdminMonumentsPage() {
  const [monuments, setMonuments] = useState<MonumentData[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('taj-mahal');
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Form inputs
  const [currentVisitorsInput, setCurrentVisitorsInput] = useState<number>(0);
  const [crowdStatusInput, setCrowdStatusInput] = useState<string>('MODERATE');
  const [gatesInput, setGatesInput] = useState<any[]>([]);

  useEffect(() => {
    fetchMonuments();
  }, []);

  const fetchMonuments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/monuments');
      const data = await res.json();
      if (data.success && data.monuments) {
        setMonuments(data.monuments);
        const sel = data.monuments.find((m: any) => m.slug === selectedSlug) || data.monuments[0];
        if (sel) {
          setCurrentVisitorsInput(sel.currentVisitors);
          setCrowdStatusInput(sel.crowdStatus);
          setGatesInput(sel.gates || []);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMonument = (slug: string) => {
    setSelectedSlug(slug);
    const m = monuments.find((item) => item.slug === slug);
    if (m) {
      setCurrentVisitorsInput(m.currentVisitors);
      setCrowdStatusInput(m.crowdStatus);
      setGatesInput(m.gates || []);
    }
  };

  const handleSaveMonumentChanges = async () => {
    try {
      const res = await fetch('/api/admin/monuments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: selectedSlug,
          currentVisitors: currentVisitorsInput,
          crowdStatus: crowdStatusInput,
          gates: gatesInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveMessage('✓ Changes successfully committed to MongoDB! Public website updated.');
        setTimeout(() => setSaveMessage(null), 3500);
        fetchMonuments();
      }
    } catch (e: any) {
      setSaveMessage('Failed to save changes');
    }
  };

  const handleUpdateGateWait = (index: number, waitMinutes: number) => {
    const updated = [...gatesInput];
    updated[index].currentQueueWaitMinutes = waitMinutes;
    if (waitMinutes > 30) {
      updated[index].status = 'CONGESTED';
    } else {
      updated[index].status = 'OPEN';
    }
    setGatesInput(updated);
  };

  const handleToggleRecommendedGate = (index: number) => {
    const updated = gatesInput.map((g, i) => ({
      ...g,
      recommended: i === index,
    }));
    setGatesInput(updated);
  };

  const selectedMonument = monuments.find((m) => m.slug === selectedSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Monument & Gate Queue Controller
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Dedicated site to calibrate real-time footfall limits, crowd warning levels, and individual entrance gate wait times.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchMonuments}
            className="flex items-center space-x-1.5 text-xs bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-3 py-2 rounded-lg transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Data</span>
          </button>

          <Link
            href="/admin"
            className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-lg transition-colors"
          >
            Back to Overview
          </Link>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Monument Selector Buttons (All 7 Sites) */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
        {monuments.map((m) => {
          const isSelected = m.slug === selectedSlug;
          return (
            <button
              key={m.slug}
              onClick={() => handleSelectMonument(m.slug)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border flex items-center space-x-2 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              <span>{m.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  m.crowdStatus === 'LOW'
                    ? 'bg-emerald-100 text-emerald-800'
                    : m.crowdStatus === 'MODERATE'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {m.currentVisitors}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Editing Grid */}
      {selectedMonument && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Capacity and Live Footfall Controls */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
                  ACTIVE MONUMENT
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {selectedMonument.name}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedMonument.city}, {selectedMonument.state}
                </p>
              </div>

              <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={selectedMonument.image}
                  alt={selectedMonument.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Current Visitors Stepper / Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Current Visitor Occupancy
                </label>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Max: {selectedMonument.maxCapacity.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={selectedMonument.maxCapacity}
                step="50"
                value={currentVisitorsInput}
                onChange={(e) => setCurrentVisitorsInput(Number(e.target.value))}
                className="w-full accent-emerald-700 h-2 bg-stone-100 rounded-lg cursor-pointer"
              />
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="number"
                  value={currentVisitorsInput}
                  onChange={(e) => setCurrentVisitorsInput(Number(e.target.value))}
                  className="w-32 text-sm font-mono font-bold bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                />
                <span className="text-xs text-stone-500">
                  Visitors on premises ({Math.round((currentVisitorsInput / selectedMonument.maxCapacity) * 100)}%)
                </span>
              </div>
            </div>

            {/* Crowd Level Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Live Crowd Status Badge
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['LOW', 'MODERATE', 'HIGH', 'SURGE'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCrowdStatusInput(status)}
                    className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
                      crowdStatusInput === status
                        ? status === 'LOW'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : status === 'MODERATE'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                          : 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Commit Changes */}
            <button
              onClick={handleSaveMonumentChanges}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Apply Changes to Live Site</span>
            </button>
          </div>

          {/* Right: Individual Gate Queues */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Entrance Gates & Queue Wait-Time Calibration
              </h3>
              <p className="text-xs text-stone-500">
                Update the queue wait-time for each gate. The public site will immediately recommend the fastest gate to incoming tourists.
              </p>
            </div>

            <div className="space-y-3">
              {gatesInput.map((gate, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    gate.recommended
                      ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-stone-900">
                          {gate.gateName}
                        </span>
                        {gate.recommended && (
                          <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.2 rounded-full">
                            FASTEST RECOMMENDED
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500">
                        Status: <strong className="text-stone-700">{gate.status}</strong>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleRecommendedGate(idx)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                        gate.recommended
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {gate.recommended ? '✓ Designated Recommended' : 'Make Recommended'}
                    </button>
                  </div>

                  {/* Wait Time Stepper */}
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-stone-600 font-medium">Wait Time:</span>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={gate.currentQueueWaitMinutes}
                      onChange={(e) => handleUpdateGateWait(idx, Number(e.target.value))}
                      className="flex-1 accent-emerald-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs text-stone-900 w-16 text-right">
                      {gate.currentQueueWaitMinutes} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveMonumentChanges}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-xs"
              >
                Save All Gate Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
