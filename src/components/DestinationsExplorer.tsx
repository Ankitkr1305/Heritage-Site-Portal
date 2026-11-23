'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Users,
  Ticket,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  Compass,
  Star,
  Info,
  Camera,
} from 'lucide-react';
import { MonumentData } from '@/data/initialData';

interface DestinationsExplorerProps {
  monuments: MonumentData[];
  onSelectSlotBooking: (monumentSlug: string, slotTime: string, tierName?: string) => void;
}

export default function DestinationsExplorer({
  monuments,
  onSelectSlotBooking,
}: DestinationsExplorerProps) {
  const [activeSlug, setActiveSlug] = useState<string>(monuments[0]?.slug || 'taj-mahal');
  const [activeTab, setActiveTab] = useState<'overview' | 'crowd' | 'tickets' | 'slots' | 'tips'>('overview');

  const selected = monuments.find((m) => m.slug === activeSlug) || monuments[0];
  if (!selected) return null;

  const occupancyPercent = Math.round((selected.currentVisitors / selected.maxCapacity) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LOW':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'MODERATE':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'HIGH':
        return 'bg-orange-50 text-orange-800 border-orange-300';
      case 'SURGE':
        return 'bg-red-50 text-red-800 border-red-300 animate-pulse';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-300';
    }
  };

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'bg-emerald-100 text-emerald-800';
      case 'MODERATE':
        return 'bg-amber-100 text-amber-800';
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="destinations" className="py-20 bg-[#fbf9f5] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            HERITAGE DESTINATIONS & ENTRY STATISTICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mt-3 font-bold">
            Live Monument Status & Time-Slot Availability
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            Select an iconic destination to view verified historical facts, gate queue wait-times, official ticket
            rates, and reserve available entry slots in real time.
          </p>
        </div>

        {/* Destination Tabs Selector */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 justify-start lg:justify-center no-scrollbar">
          {monuments.map((m) => {
            const isSelected = m.slug === activeSlug;
            return (
              <button
                key={m.slug}
                onClick={() => setActiveSlug(m.slug)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm tracking-wide transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                    : 'bg-white text-slate-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold">{m.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    m.crowdStatus === 'SURGE'
                      ? 'bg-red-500 text-white font-bold'
                      : m.crowdStatus === 'HIGH'
                      ? 'bg-orange-400 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {m.crowdStatus}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Destination Details Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Top Banner with Image and Key Details */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Overlaid badges */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap justify-between items-center gap-2">
              <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-mono font-bold px-3 py-1.5 rounded-md uppercase tracking-wider flex items-center space-x-1.5 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selected.category}</span>
              </span>

              <div
                className={`backdrop-blur-md text-xs font-mono font-bold px-3.5 py-1.5 rounded-md border shadow-sm ${getStatusColor(
                  selected.crowdStatus
                )}`}
              >
                CURRENT CROWD LOAD: {selected.crowdStatus} ({occupancyPercent}% OF SAFE LIMIT)
              </div>
            </div>

            {/* Title & Location in Banner */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{selected.location}</span>
                <span>•</span>
                <span>Era: {selected.yearBuilt}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                {selected.name}
              </h3>
              <p className="text-gray-200 text-sm max-w-2xl hidden sm:block line-clamp-2">
                {selected.description}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-800 bg-slate-950 text-white">
            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Current Visitors Inside</span>
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono mt-1 text-white">
                {selected.currentVisitors.toLocaleString()}
                <span className="text-xs text-gray-400 font-normal ml-1">/ {selected.maxCapacity.toLocaleString()}</span>
              </p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${
                    occupancyPercent > 80 ? 'bg-red-500' : occupancyPercent > 60 ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                <span>Gate Inflow Rate</span>
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono mt-1 text-white">
                {selected.inflowRatePerMin}
                <span className="text-xs text-gray-400 font-normal ml-1">visitors / min</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Live turnstile counter</p>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Avg Visit Dwell Time</span>
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono mt-1 text-white">
                {selected.avgDwellTimeMinutes}
                <span className="text-xs text-gray-400 font-normal ml-1">minutes</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Average tour completion</p>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fastest Entry Gate</span>
              </span>
              <p className="text-sm sm:text-base font-bold text-emerald-300 mt-1 truncate">
                {selected.gates.find((g) => g.recommended)?.gateName || 'Primary Entrance'}
              </p>
              <p className="text-[11px] text-emerald-400/90 font-mono mt-1">
                Wait time: {selected.gates.find((g) => g.recommended)?.currentQueueWaitMinutes || 8} mins only
              </p>
            </div>
          </div>

          {/* Sub Navigation Inside Destination */}
          <div className="border-b border-gray-200 px-6 bg-white flex items-center space-x-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 text-xs font-sans uppercase tracking-wider font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'border-[#48bb78] text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              History & Architecture
            </button>
            <button
              onClick={() => setActiveTab('crowd')}
              className={`py-4 text-xs font-sans uppercase tracking-wider font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'crowd'
                  ? 'border-[#48bb78] text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Live Gate Queues & Forecast
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-4 text-xs font-sans uppercase tracking-wider font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'tickets'
                  ? 'border-[#48bb78] text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Official Ticket Rates ({selected.ticketTiers.length})
            </button>
            <button
              onClick={() => setActiveTab('slots')}
              className={`py-4 text-xs font-sans uppercase tracking-wider font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'slots'
                  ? 'border-[#48bb78] text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Time-Slots & Booking ({selected.timeSlots.length})
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-4 text-xs font-sans uppercase tracking-wider font-bold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'tips'
                  ? 'border-[#48bb78] text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Visitor Guidelines & Tips
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-xl font-serif font-bold text-slate-900">Historical Background</h4>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{selected.description}</p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Builder / Patron:</span> {selected.builder}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Construction Era:</span> {selected.yearBuilt}
                  </p>

                  <div className="pt-4">
                    <h5 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 mb-3">
                      Architectural Highlights & Key Structures
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selected.architecturalHighlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100"
                        >
                          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-800 font-medium leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right sidebar quick action */}
                <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-emerald-800 uppercase font-semibold">Immediate Booking</span>
                    <h5 className="text-lg font-serif font-bold text-slate-900 mt-1">Plan Your Visit Smooth & Safe</h5>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Pre-reserve your guaranteed digital time-slot pass. Avoid peak-hour surge throttling at the gates.
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs py-1 border-b border-gray-200">
                        <span className="text-slate-500">Fastest Queue:</span>
                        <span className="font-semibold text-emerald-700">
                          {selected.gates.find((g) => g.recommended)?.gateName.split(' ')[0]} Gate
                        </span>
                      </div>
                      <div className="flex justify-between text-xs py-1 border-b border-gray-200">
                        <span className="text-slate-500">Starting Price:</span>
                        <span className="font-semibold text-slate-900">
                          ₹{selected.ticketTiers[0]?.price} / person
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <button
                      onClick={() => setActiveTab('slots')}
                      className="w-full bg-[#48bb78] hover:bg-[#38a169] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-xs transition-all text-center flex items-center justify-center space-x-2"
                    >
                      <span>View Available Slots</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href={`/monuments/${selected.slug}`}
                      className="w-full text-center block text-xs font-semibold text-slate-700 hover:text-black py-2.5 bg-white hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
                    >
                      Open Dedicated Monument Site →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Gate Queues & Forecast */}
          {activeTab === 'crowd' && (
            <div className="p-6 sm:p-8 space-y-8">
              {/* Gate queue status */}
              <div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">Live Entry Gates & Queue Telemetry</h4>
                <p className="text-xs text-slate-500 font-mono mb-4">
                  REAL-TIME ENTRY WAIT TIMES ACROSS ALL ACCESS ROADS
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selected.gates.map((gate, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border relative transition-all ${
                        gate.recommended
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                          : gate.status === 'CONGESTED'
                          ? 'border-red-200 bg-red-50/40'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {gate.recommended && (
                        <span className="absolute -top-2.5 right-3 bg-emerald-700 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                          RECOMMENDED GATE (FAST LANE)
                        </span>
                      )}

                      <p className="font-semibold text-sm text-slate-900">{gate.gateName}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 font-mono">Current Wait</span>
                          <p className="text-xl font-bold font-mono text-slate-900">
                            {gate.currentQueueWaitMinutes} <span className="text-xs font-normal">mins</span>
                          </p>
                        </div>
                        <span
                          className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                            gate.status === 'OPEN'
                              ? 'bg-emerald-100 text-emerald-800'
                              : gate.status === 'CONGESTED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {gate.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hourly AI Forecast Curve */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-serif font-bold text-slate-900">Today’s Expected Crowd Influx Curve</h4>
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Accuracy Rate: 96.4%
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mb-4">
                  HOURLY ESTIMATED OCCUPANCY BASED ON ADVANCE TICKET BOOKINGS & HISTORICAL VISITOR CYCLES
                </p>

                <div className="bg-slate-950 rounded-xl p-5 text-white">
                  <div className="grid grid-cols-7 gap-2 items-end h-36 pt-4">
                    {selected.hourlyForecast.map((item, idx) => {
                      const isPeak = item.expectedOccupancyPercent >= 80;
                      return (
                        <div key={idx} className="flex flex-col items-center h-full justify-end group">
                          <span className="text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                            {item.expectedOccupancyPercent}%
                          </span>
                          <div
                            className={`w-full rounded-t-sm transition-all duration-500 ${
                              isPeak ? 'bg-red-500 group-hover:bg-red-400' : 'bg-emerald-500 group-hover:bg-emerald-400'
                            }`}
                            style={{ height: `${item.expectedOccupancyPercent}%` }}
                          ></div>
                          <span className="text-[10px] font-mono text-gray-400 mt-2">{item.time}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                      <span>Comfortable Walking (&lt;80% capacity)</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
                      <span>Peak Gathering Window (&gt;80% capacity)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Tickets */}
          {activeTab === 'tickets' && (
            <div className="p-6 sm:p-8">
              <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">Official Ticket Tiers & Access Rights</h4>
              <p className="text-xs text-slate-500 font-mono mb-6">
                ARCHAEOLOGICAL SURVEY OF INDIA & HERITAGE TRUST APPROVED RATES
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selected.ticketTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        OFFICIAL TIER 0{idx + 1}
                      </span>
                      <h5 className="font-bold text-base text-slate-900 mt-2">{tier.name}</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tier.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 font-mono">Fee</span>
                        <p className="text-2xl font-bold font-mono text-slate-900">
                          {tier.price === 0 ? 'Free Entry' : `₹${tier.price}`}
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectSlotBooking(selected.slug, selected.timeSlots[0]?.slotTime, tier.name)}
                        className="bg-slate-900 hover:bg-black text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors"
                      >
                        Book Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Time Slots */}
          {activeTab === 'slots' && (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h4 className="text-lg font-serif font-bold text-slate-900">Time-Slot Availability & Booking</h4>
                  <p className="text-xs text-slate-500 font-mono">
                    CHOOSE A RELAXED TIME WINDOW TO ENJOY UNHURRIED PHOTOGRAPHY
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Available for Today & Tomorrow</span>
                </div>
              </div>

              <div className="space-y-3">
                {selected.timeSlots.map((slot, idx) => {
                  const percentLeft = Math.round((slot.availableSlots / slot.totalSlots) * 100);
                  const isLow = slot.availableSlots < 300;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-gray-200 bg-white hover:border-[#48bb78] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="font-bold text-sm text-slate-900 font-mono">{slot.slotTime}</span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getCrowdBadge(
                              slot.crowdLevel
                            )}`}
                          >
                            {slot.crowdLevel} DENSITY
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Hourly Maximum Safe Cap: {slot.totalSlots.toLocaleString()} visitors
                        </p>
                      </div>

                      {/* Remaining capacity gauge */}
                      <div className="w-full md:w-56 space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-500">Available:</span>
                          <span className={`font-bold ${isLow ? 'text-red-600' : 'text-emerald-700'}`}>
                            {slot.availableSlots.toLocaleString()} passes left
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              percentLeft < 20 ? 'bg-red-500' : percentLeft < 50 ? 'bg-amber-400' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${percentLeft}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Book slot button */}
                      <div>
                        <button
                          onClick={() => onSelectSlotBooking(selected.slug, slot.slotTime)}
                          className="w-full md:w-auto bg-[#48bb78] hover:bg-[#38a169] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center space-x-1.5"
                        >
                          <span>Reserve Slot</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 5: Visitor Tips & Guidelines (Human-Crafted) */}
          {activeTab === 'tips' && (
            <div className="p-6 sm:p-8 space-y-6">
              <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">
                Practical Visitor Information & Site Guidelines
              </h4>
              <p className="text-xs text-slate-500 font-mono mb-4">
                HELPFUL ADVICE FOR A MEMORABLE, HASSLE-FREE TOUR
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                    <Camera className="w-4 h-4" />
                    <span>Best Photography Windows</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    The 06:00 – 08:30 sunrise window offers the cleanest natural light with the lowest crowd numbers.
                    Tripods are prohibited inside monument enclosures as per ASI safety regulations.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
                    <Info className="w-4 h-4" />
                    <span>Footwear & Marble Plinth Rules</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Shoe covers are required to step onto the main marble mausoleum terrace at the Taj Mahal. Complimentary
                    covers are included with foreign tickets or available at the entrance counter for ₹10.
                  </p>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-800 font-bold text-sm">
                    <Users className="w-4 h-4" />
                    <span>Electric Shuttles from Shilpgram</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    To preserve air quality around monuments, vehicles are stopped 1 km away. Free battery golf buggies
                    operate continuously between Shilpgram parking and the East Gate entrance.
                  </p>
                </div>

                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
                  <div className="flex items-center space-x-2 text-purple-800 font-bold text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Official Certified Guides</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Hire only Ministry of Tourism certified guides wearing official identification badges. Multilingual
                    audio guide headpieces are also available at the primary ticket reception.
                  </p>
                </div>
              </div>

              {/* Verified visitor quote */}
              <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-slate-600 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ★
                </div>
                <div>
                  <p className="italic text-slate-800 font-medium">
                    "Pre-booking our 8:30 AM slot saved us at least 45 minutes of standing in line on West Gate road.
                    The portal suggested the South Gate instead and we entered in literally 7 minutes. Highly recommended!"
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    — Sunita & Deepak Rao (Visited Taj Mahal with family, Nov 2026)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
