'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Search, CloudSun, Wind, } from 'lucide-react';
// Weather and AQI telemetry mapping
const WEATHER_DATA = {
    'taj-mahal': { temp: '23°C', condition: 'Sunny & Clear', aqi: 110, aqiLevel: 'Moderate' },
    'varanasi-ghats': { temp: '24°C', condition: 'Pleasant Breeze', aqi: 125, aqiLevel: 'Moderate' },
    'red-fort': { temp: '22°C', condition: 'Mild Haze', aqi: 158, aqiLevel: 'Unhealthy for Sensitive' },
    'qutub-minar': { temp: '22°C', condition: 'Mild Haze', aqi: 152, aqiLevel: 'Unhealthy for Sensitive' },
    'konark-sun-temple': { temp: '27°C', condition: 'Fresh Coastal Air', aqi: 52, aqiLevel: 'Good' },
    'amber-fort': { temp: '25°C', condition: 'Sunny Hilltop', aqi: 82, aqiLevel: 'Satisfactory' },
    'hampi': { temp: '29°C', condition: 'Warm & Sunny', aqi: 41, aqiLevel: 'Good' },
};
export default function LiveMonumentOverview({ monuments, onSelectMonument, onBookPass, }) {
    const [selectedState, setSelectedState] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [crowdFilter, setCrowdFilter] = useState('ALL');
    const states = useMemo(() => {
        const set = new Set();
        monuments.forEach((m) => set.add(m.state));
        return ['ALL', ...Array.from(set)];
    }, [monuments]);
    const filteredMonuments = useMemo(() => {
        return monuments.filter((m) => {
            const matchState = selectedState === 'ALL' || m.state === selectedState;
            const matchCrowd = crowdFilter === 'ALL' || m.crowdStatus === crowdFilter;
            const matchSearch = searchQuery === '' ||
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.state.toLowerCase().includes(searchQuery.toLowerCase());
            return matchState && matchCrowd && matchSearch;
        });
    }, [monuments, selectedState, crowdFilter, searchQuery]);
    const getCrowdBadge = (status) => {
        switch (status) {
            case 'LOW':
                return 'bg-emerald-100 text-emerald-800 border-emerald-300';
            case 'MODERATE':
                return 'bg-amber-100 text-amber-800 border-amber-300';
            case 'HIGH':
                return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'SURGE':
                return 'bg-red-100 text-red-800 border-red-300 animate-pulse';
            default:
                return 'bg-stone-100 text-stone-800 border-stone-300';
        }
    };
    return (<section id="live-status" className="py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              REAL-TIME MONUMENT DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold mt-2">
              Live Footfall, Gate Waiting Times & Weather
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Guaranteed electronic slot allocations across all {monuments.length} monitored national heritage landmarks.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Turnstiles & Optical Counters Sync: Active</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* State Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button onClick={() => setSelectedState('ALL')} className={`text-xs px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedState === 'ALL'
            ? 'bg-slate-900 text-white'
            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
              All Sites ({monuments.length})
            </button>
            {states
            .filter((s) => s !== 'ALL')
            .map((state) => {
            const count = monuments.filter((m) => m.state === state).length;
            return (<button key={state} onClick={() => setSelectedState(state)} className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedState === state
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                    {state} ({count})
                  </button>);
        })}
          </div>

          {/* Search Input & Crowd Selector */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5"/>
              <input type="text" placeholder="Search monument or city..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white"/>
            </div>

            <select value={crowdFilter} onChange={(e) => setCrowdFilter(e.target.value)} className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 text-stone-700 font-medium focus:outline-none focus:border-emerald-600">
              <option value="ALL">All Levels</option>
              <option value="LOW">Low Crowd</option>
              <option value="MODERATE">Moderate</option>
              <option value="HIGH">High Peak</option>
            </select>
          </div>
        </div>

        {/* Monument Photographic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMonuments.map((m) => {
            const occupancy = Math.round((m.currentVisitors / m.maxCapacity) * 100);
            const fastestGate = m.gates.find((g) => g.recommended) || m.gates[0];
            const weather = WEATHER_DATA[m.slug] || {
                temp: '24°C',
                condition: 'Pleasant',
                aqi: 95,
                aqiLevel: 'Satisfactory',
            };
            return (<div key={m.slug} className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all duration-300 flex flex-col overflow-hidden group">
                {/* Real Monument Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="bg-white/95 backdrop-blur-sm text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                      {m.city}, {m.state}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border shadow-xs ${getCrowdBadge(m.crowdStatus)}`}>
                      {m.crowdStatus} CROWD
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-amber-300 font-mono uppercase tracking-wider block">
                      {m.category}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-white tracking-tight leading-snug">
                      {m.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Weather & Live Telemetry Bar */}
                  <div className="space-y-3">
                    {/* Live Weather / Environment Bar */}
                    <div className="flex items-center justify-between text-[11px] bg-stone-50 border border-stone-200/70 px-3 py-1.5 rounded-lg text-stone-600">
                      <div className="flex items-center space-x-1.5">
                        <CloudSun className="w-3.5 h-3.5 text-amber-600"/>
                        <span>
                          {weather.temp} • {weather.condition}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-stone-500">
                        <Wind className="w-3 h-3 text-emerald-600"/>
                        <span>AQI {weather.aqi}</span>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span>Current Footfall:</span>
                        <span className="font-semibold text-stone-900 font-mono">
                          {m.currentVisitors.toLocaleString()} / {m.maxCapacity.toLocaleString()} ({occupancy}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div className={`h-2 rounded-full transition-all duration-500 ${occupancy > 80 ? 'bg-red-500' : occupancy > 60 ? 'bg-amber-500' : 'bg-emerald-600'}`} style={{ width: `${Math.min(occupancy, 100)}%` }}></div>
                      </div>
                    </div>

                    {/* Fastest Gate Guidance */}
                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-emerald-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0"/>
                        <span className="font-medium truncate max-w-[170px]">{fastestGate.gateName.split('(')[0]}</span>
                      </div>
                      <span className="font-bold text-emerald-800 font-mono">
                        {fastestGate.currentQueueWaitMinutes}m wait
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-mono block">Entry Pass</span>
                      <span className="text-base font-serif font-bold text-stone-900">
                        {m.ticketTiers[0]?.price === 0 ? 'Free Entry' : `₹${m.ticketTiers[0]?.price}`}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link href={`/monuments/${m.slug}`} className="text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
                        Details
                      </Link>
                      <button onClick={() => onBookPass(m.slug)} className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all flex items-center space-x-1 shadow-xs">
                        <span>Book Pass</span>
                        <ArrowRight className="w-3 h-3"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>);
        })}
        </div>

        {filteredMonuments.length === 0 && (<div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">No monuments found matching your search criteria.</p>
            <button onClick={() => {
                setSelectedState('ALL');
                setCrowdFilter('ALL');
                setSearchQuery('');
            }} className="mt-3 text-xs text-emerald-700 font-semibold underline">
              Reset Filters
            </button>
          </div>)}
      </div>
    </section>);
}
