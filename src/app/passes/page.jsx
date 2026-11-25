'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Printer, } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default function MyPassesPage() {
    const [passes, setPasses] = useState([]);
    const [phoneSearch, setPhoneSearch] = useState('');
    const [selectedPass, setSelectedPass] = useState(null);
    useEffect(() => {
        async function loadPasses() {
            let loaded = [];
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem('heritage_passes');
                if (stored) {
                    try {
                        loaded = JSON.parse(stored);
                    }
                    catch (e) { }
                }
            }
            if (loaded.length === 0) {
                try {
                    const res = await fetch('/api/admin/bookings');
                    const data = await res.json();
                    if (data.success && data.bookings && data.bookings.length > 0) {
                        loaded = data.bookings;
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('heritage_passes', JSON.stringify(loaded));
                        }
                    }
                }
                catch (e) { }
            }
            setPasses(loaded);
            if (loaded.length > 0)
                setSelectedPass(loaded[0]);
        }
        loadPasses();
    }, []);
    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };
    const filteredPasses = passes.filter((p) => p.bookingId?.toLowerCase().includes(phoneSearch.toLowerCase()) ||
        p.visitorName?.toLowerCase().includes(phoneSearch.toLowerCase()) ||
        p.phone?.includes(phoneSearch));
    return (<div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar onOpenBooking={() => {
            if (typeof window !== 'undefined')
                window.location.href = '/?book=taj-mahal';
        }} onOpenDashboard={() => {
            if (typeof window !== 'undefined')
                window.location.href = '/admin';
        }} onOpenPasses={() => { }}/>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <Link href="/" className="inline-flex items-center space-x-1.5 text-xs text-stone-500 hover:text-emerald-800 transition-colors mb-2">
              <ArrowLeft className="w-3.5 h-3.5"/>
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                🎫
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                My Reserved E-Passes & QR Tickets
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Official Archaeological Survey of India (ASI) verified entrance vouchers. Present QR code at entrance turnstiles.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/#destinations" className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs">
              Book New Entry Pass
            </Link>
          </div>
        </div>

        {/* Content */}
        {passes.length === 0 ? (<div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-2xl">
              🎟️
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-800">
              No E-Passes Found on This Device
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              You haven't reserved any monument passes yet. Select a destination to book guaranteed entry time-slots.
            </p>
            <Link href="/#destinations" className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-xs">
              Explore Destinations & Book
            </Link>
          </div>) : (<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Pass List */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5"/>
                <input type="text" placeholder="Search by ID or visitor name..." value={phoneSearch} onChange={(e) => setPhoneSearch(e.target.value)} className="w-full text-xs bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600 shadow-2xs"/>
              </div>

              <div className="space-y-2">
                {filteredPasses.map((p) => {
                const isSelected = selectedPass?.bookingId === p.bookingId;
                return (<button key={p.bookingId} onClick={() => setSelectedPass(p)} className={`w-full text-left p-4 rounded-xl border transition-all ${isSelected
                        ? 'bg-white border-emerald-600 shadow-md ring-1 ring-emerald-600'
                        : 'bg-white border-stone-200 hover:border-stone-300 shadow-2xs'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-serif font-bold text-sm text-stone-900">
                          {p.monumentName}
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          {p.status || 'CONFIRMED'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mb-2">
                        {p.date} • {p.timeSlot?.split('(')[0]}
                      </p>
                      <div className="flex justify-between text-[11px] text-stone-600 font-mono pt-2 border-t border-stone-100">
                        <span>Pass: {p.bookingId}</span>
                        <span className="font-bold text-stone-900">₹{p.totalAmount}</span>
                      </div>
                    </button>);
            })}
              </div>
            </div>

            {/* Right: Printable Official Pass Card */}
            {selectedPass && (<div className="md:col-span-7 bg-white rounded-2xl border border-stone-300 shadow-lg p-6 sm:p-8 space-y-6">
                {/* Official Pass Header */}
                <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center text-xl font-bold">
                      🏛️
                    </div>
                    <div>
                      <span className="font-serif font-bold text-base text-stone-900 block">
                        Official Archaeological Survey E-Ticket
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        GOVERNMENT OF INDIA • NATIONAL HERITAGE PORTAL
                      </span>
                    </div>
                  </div>

                  <button onClick={handlePrint} className="flex items-center space-x-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-lg transition-colors border border-stone-200">
                    <Printer className="w-3.5 h-3.5"/>
                    <span>Print Pass</span>
                  </button>
                </div>

                {/* QR Code and Pass Details */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <div className="sm:col-span-5 text-center space-y-2">
                    <div className="w-36 h-36 mx-auto bg-white p-3 rounded-xl border border-stone-300 shadow-xs flex items-center justify-center font-mono text-xs">
                      <div className="space-y-1">
                        <div className="text-4xl">🏁</div>
                        <span className="font-bold text-stone-900 text-[11px] block">
                          {selectedPass.bookingId}
                        </span>
                        <span className="text-[9px] text-stone-400 block font-mono">
                          TURNSTILE SCAN READY
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 block truncate">
                      {selectedPass.qrCodeToken || selectedPass.bookingId}
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-2.5 text-xs text-stone-700">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase block">
                        DESTINATION MONUMENT
                      </span>
                      <span className="font-serif font-bold text-base text-stone-900 block">
                        {selectedPass.monumentName}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 uppercase block">
                          VISITOR NAME
                        </span>
                        <span className="font-semibold text-stone-900">
                          {selectedPass.visitorName}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 uppercase block">
                          CONTACT
                        </span>
                        <span className="text-stone-700 font-mono">
                          {selectedPass.phone || selectedPass.email}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 uppercase block">
                          VISIT DATE
                        </span>
                        <span className="font-semibold text-stone-900">
                          {selectedPass.date}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 uppercase block">
                          TIME SLOT
                        </span>
                        <span className="font-semibold text-emerald-800">
                          {selectedPass.timeSlot}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase block">
                        ASSIGNED ENTRANCE GATE
                      </span>
                      <span className="font-semibold text-stone-900">
                        {selectedPass.gateAssigned || 'Main East Gate (Fast-Track Turnstile)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Important Advisory Footnote */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                  <p className="font-semibold">Important Visitor Instructions:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                    <li>Please report at your assigned gate at least 15 minutes before the time-slot.</li>
                    <li>Carry valid Government photo ID (Aadhaar / Voter ID / Passport) for security verification.</li>
                    <li>Tobacco, matchboxes, drones, and large bags are strictly prohibited inside the monument.</li>
                  </ul>
                </div>
              </div>)}
          </div>)}
      </main>

      <Footer />
    </div>);
}
