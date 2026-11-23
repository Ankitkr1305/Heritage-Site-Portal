'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MonumentData } from '@/data/initialData';

interface QuickPassReservationBarProps {
  monuments: MonumentData[];
  onBookPass: (slug: string, slot?: string, tier?: string) => void;
}

export default function QuickPassReservationBar({
  monuments,
  onBookPass,
}: QuickPassReservationBarProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(monuments[0]?.slug || 'taj-mahal');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>('06:00 - 08:30 (Sunrise Entry)');
  const [visitorCount, setVisitorCount] = useState<number>(2);

  const selectedMonument = monuments.find((m) => m.slug === selectedSlug) || monuments[0];

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onBookPass(selectedSlug, selectedSlot);
  };

  return (
    <section className="relative -mt-8 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200/90 p-4 sm:p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              🎫
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Express Digital E-Pass Reservation
              </h3>
              <p className="text-[11px] text-stone-500">
                Official ASI Authorized Direct Booking • Instant QR Gate Pass with Verified Slot Quotas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-stone-600">
            <span className="flex items-center space-x-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Convenience Fee</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Instant WhatsApp & Email Pass</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Monument Selector */}
          <div>
            <label className="block text-[11px] font-mono font-semibold text-stone-600 uppercase mb-1.5 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Destination Site</span>
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                const m = monuments.find((item) => item.slug === e.target.value);
                if (m && m.timeSlots.length > 0) {
                  setSelectedSlot(m.timeSlots[0].slotTime);
                }
              }}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
            >
              {monuments.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name} ({m.city})
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-[11px] font-mono font-semibold text-stone-600 uppercase mb-1.5 flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-emerald-600" />
              <span>Date of Visit</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
            />
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-[11px] font-mono font-semibold text-stone-600 uppercase mb-1.5 flex items-center space-x-1">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>Entry Time Slot</span>
            </label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
            >
              {selectedMonument?.timeSlots?.map((slot, idx) => (
                <option key={idx} value={slot.slotTime}>
                  {slot.slotTime.split('(')[0]} ({slot.availableSlots} left)
                </option>
              )) || <option>09:00 - 12:00 (Standard)</option>}
            </select>
          </div>

          {/* Visitor Count */}
          <div>
            <label className="block text-[11px] font-mono font-semibold text-stone-600 uppercase mb-1.5 flex items-center space-x-1">
              <Users className="w-3 h-3 text-emerald-600" />
              <span>Visitors</span>
            </label>
            <select
              value={visitorCount}
              onChange={(e) => setVisitorCount(Number(e.target.value))}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Visitor / Pass' : 'Visitors'}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
            >
              <span>Reserve Pass</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
