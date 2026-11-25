'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sliders, Ticket, AlertTriangle, Radio, ArrowRight, RefreshCw, } from 'lucide-react';
export default function AdminOverviewDashboard() {
    const [monuments, setMonuments] = useState([]);
    const [bookingCount, setBookingCount] = useState(0);
    const [alertCount, setAlertCount] = useState(0);
    const [sensorCount, setSensorCount] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSummaryData();
    }, []);
    const fetchSummaryData = async () => {
        setLoading(true);
        try {
            const [monRes, bookRes, alertRes, sensRes] = await Promise.all([
                fetch('/api/monuments'),
                fetch('/api/admin/bookings'),
                fetch('/api/alerts'),
                fetch('/api/sensors'),
            ]);
            const [monData, bookData, alertData, sensData] = await Promise.all([
                monRes.json(),
                bookRes.json(),
                alertRes.json(),
                sensRes.json(),
            ]);
            if (monData.success && monData.monuments)
                setMonuments(monData.monuments);
            if (bookData.success && bookData.bookings)
                setBookingCount(bookData.bookings.length);
            if (alertData.success && alertData.alerts)
                setAlertCount(alertData.alerts.length);
            if (sensData.success && sensData.sensors)
                setSensorCount(sensData.sensors.length);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    const totalVisitorsAcrossSites = monuments.reduce((sum, m) => sum + (m.currentVisitors || 0), 0);
    const totalCapacityAcrossSites = monuments.reduce((sum, m) => sum + (m.maxCapacity || 0), 0);
    const subSites = [
        {
            title: 'Monuments & Gate Queues',
            desc: 'Live footfall limits, crowd levels (LOW/MODERATE/HIGH/SURGE), and individual gate wait-time calibration.',
            href: '/admin/monuments',
            icon: Sliders,
            badge: `${monuments.length} Monuments Active`,
            badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            actionText: 'Launch Monument Site',
        },
        {
            title: 'Tourist Passes & Gate Check-In',
            desc: 'Verify visitor e-passes, review QR tokens, search booking IDs, and execute turnstile check-in admission.',
            href: '/admin/bookings',
            icon: Ticket,
            badge: `${bookingCount} Passes Issued`,
            badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
            actionText: 'Open Check-In Console',
        },
        {
            title: 'Advisory & Emergency Broadcast',
            desc: 'Dispatch electronic warnings, weather advisories, and chokepoint gate diversions straight to public screens.',
            href: '/admin/alerts',
            icon: AlertTriangle,
            badge: `${alertCount} Live Broadcasts`,
            badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
            actionText: 'Open Advisory Room',
        },
        {
            title: 'Optical Turnstiles & Sensors',
            desc: 'Review IoT solar-powered turnstile throughput, flow rate per minute, and pedestrian density telemetry.',
            href: '/admin/sensors',
            icon: Radio,
            badge: `${sensorCount} Sensors Synced`,
            badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
            actionText: 'Launch Sensor Site',
        },
    ];
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            CENTRALIZED MANAGEMENT SUITE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
            ASI Site Command & Operational Portals
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Tap any operational module below to open its dedicated full-screen console.
          </p>
        </div>

        <button onClick={fetchSummaryData} className="flex items-center space-x-1.5 text-xs bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-3.5 py-2 rounded-xl transition-colors shadow-2xs self-start sm:self-auto">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}/>
          <span>Refresh All Portals</span>
        </button>
      </div>

      {/* Real-time Summary Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase">MONITORED SITES</span>
          <p className="text-2xl font-serif font-bold text-stone-900">{monuments.length} Monuments</p>
          <span className="text-[11px] text-emerald-700 font-medium">Across 5 States</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase">CURRENT TOTAL FOOTFALL</span>
          <p className="text-2xl font-serif font-bold text-stone-900">
            {totalVisitorsAcrossSites.toLocaleString()}
          </p>
          <span className="text-[11px] text-stone-500 font-mono">
            {totalCapacityAcrossSites > 0 ? Math.round((totalVisitorsAcrossSites / totalCapacityAcrossSites) * 100) : 0}% aggregate capacity
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase">CONFIRMED PASSES</span>
          <p className="text-2xl font-serif font-bold text-emerald-700">{bookingCount}</p>
          <span className="text-[11px] text-stone-500">Live Turnstile Records</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-stone-400 uppercase">ACTIVE ADVISORIES</span>
          <p className="text-2xl font-serif font-bold text-amber-700">{alertCount}</p>
          <span className="text-[11px] text-stone-500">Public Ticker Feeds</span>
        </div>
      </div>

      {/* Four Dedicated Sub-Site Cards (The core requirement: tap to open separate pages!) */}
      <div>
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">
          Dedicated Operational Sub-Sites
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subSites.map((site) => {
            const Icon = site.icon;
            return (<Link key={site.href} href={site.href} className="group bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-lg hover:border-emerald-600 transition-all flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center group-hover:bg-emerald-800 transition-colors shadow-xs">
                      <Icon className="w-6 h-6"/>
                    </div>

                    <span className={`text-[11px] font-bold font-mono px-2.5 py-1 rounded-full border ${site.badgeColor}`}>
                      {site.badge}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {site.title}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {site.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 group-hover:underline">
                    {site.actionText}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-emerald-700 group-hover:text-white text-stone-600 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                  </span>
                </div>
              </Link>);
        })}
        </div>
      </div>

      {/* Real-time Monument Health Strip */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h4 className="font-serif font-bold text-base text-stone-900">
              Live Monument Telemetry Snapshot
            </h4>
            <p className="text-xs text-stone-500">
              Direct shortcuts to manage individual monuments and calibrate their gates.
            </p>
          </div>

          <Link href="/admin/monuments" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1">
            <span>Open All in Controller</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {monuments.map((m) => {
            const occupancy = Math.round((m.currentVisitors / m.maxCapacity) * 100);
            const fastestGate = m.gates?.find((g) => g.recommended) || m.gates?.[0];
            return (<Link key={m.slug} href={`/admin/monuments`} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-emerald-50/30 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-2 group">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-stone-900 group-hover:text-emerald-800">
                      {m.name}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${m.crowdStatus === 'LOW'
                    ? 'bg-emerald-100 text-emerald-800'
                    : m.crowdStatus === 'MODERATE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'}`}>
                      {m.crowdStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {m.currentVisitors.toLocaleString()} / {m.maxCapacity.toLocaleString()} ({occupancy}%)
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-600">
                  <span>Fastest: {fastestGate?.gateName.split('(')[0]}</span>
                  <span className="font-mono font-bold text-emerald-800">{fastestGate?.currentQueueWaitMinutes}m</span>
                </div>
              </Link>);
        })}
        </div>
      </div>
    </div>);
}
