'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Ticket, Users, User, Mail, Phone, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { MonumentData } from '@/data/initialData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  monuments: MonumentData[];
  initialSlug?: string;
  initialSlot?: string;
  initialTier?: string;
  onBookingSuccess: (bookingData: any) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  monuments,
  initialSlug,
  initialSlot,
  initialTier,
  onBookingSuccess,
}: BookingModalProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug || monuments[0]?.slug || 'taj-mahal');
  const [visitorName, setVisitorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-23');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const monument = monuments.find((m) => m.slug === selectedSlug) || monuments[0];

  useEffect(() => {
    if (initialSlug) setSelectedSlug(initialSlug);
  }, [initialSlug]);

  useEffect(() => {
    if (monument) {
      if (initialSlot && monument.timeSlots.some((s) => s.slotTime === initialSlot)) {
        setSelectedSlot(initialSlot);
      } else {
        setSelectedSlot(monument.timeSlots[0]?.slotTime || '');
      }

      if (initialTier && monument.ticketTiers.some((t) => t.name === initialTier)) {
        setSelectedTier(initialTier);
      } else {
        setSelectedTier(monument.ticketTiers[0]?.name || '');
      }
    }
  }, [monument, initialSlot, initialTier]);

  if (!isOpen || !monument) return null;

  const currentTierObj = monument.ticketTiers.find((t) => t.name === selectedTier) || monument.ticketTiers[0];
  const totalPrice = (currentTierObj ? currentTierObj.price : 50) * ticketCount;
  const currentSlotObj = monument.timeSlots.find((s) => s.slotTime === selectedSlot);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !email) {
      setErrorMessage('Please provide your name and email address');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monumentSlug: selectedSlug,
          visitorName,
          email,
          phone: phone || '+91 98765 00000',
          date,
          timeSlot: selectedSlot,
          ticketTier: selectedTier,
          ticketCount,
        }),
      });

      const data = await response.json();
      if (data.success) {
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('heritage_passes');
            const list = stored ? JSON.parse(stored) : [];
            list.unshift(data.booking);
            localStorage.setItem('heritage_passes', JSON.stringify(list));
          } catch (e) {}
        }
        onBookingSuccess(data.booking);
        onClose();
      } else {
        setErrorMessage(data.message || 'Booking failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="w-5 h-5 text-[#48bb78]" />
            <h3 className="font-serif font-bold text-lg">Book Heritage Time-Slot Pass</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-mono text-red-700 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Monument Selector */}
          <div>
            <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
              Select Destination
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full text-sm font-medium border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#48bb78] focus:outline-none"
            >
              {monuments.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name} ({m.city}) — Live Status: {m.crowdStatus}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Slot in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>Visit Date</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min="2026-11-22"
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#48bb78] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>Time-Slot</span>
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-2.5 focus:ring-2 focus:ring-[#48bb78] focus:outline-none font-mono"
              >
                {monument.timeSlots.map((slot, i) => (
                  <option key={i} value={slot.slotTime}>
                    {slot.slotTime.split('(')[0]} ({slot.availableSlots} left)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Slot Capacity Status Indicator */}
          {currentSlotObj && (
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-800">Available Quota: {currentSlotObj.availableSlots} passes</span>
              <span className="font-bold text-emerald-700">{currentSlotObj.crowdLevel} DENSITY EXPECTED</span>
            </div>
          )}

          {/* Ticket Tier & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                Ticket Category
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#48bb78] focus:outline-none"
              >
                {monument.ticketTiers.map((t, idx) => (
                  <option key={idx} value={t.name}>
                    {t.name} (₹{t.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <span>Guests</span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.max(1, Number(e.target.value)))}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 font-mono text-center focus:ring-2 focus:ring-[#48bb78] focus:outline-none"
              />
            </div>
          </div>

          {/* Visitor Details */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-gray-500" />
                <span>Primary Visitor Full Name</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ankit Verma"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#48bb78] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  <span>Email for Digital Pass</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ankit@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#48bb78] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-gray-500" />
                  <span>Phone Number (SMS alerts)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#48bb78] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-mono block">Total Calculated Amount</span>
              <p className="text-2xl font-serif font-bold text-gray-900">
                {totalPrice === 0 ? 'Free Entry' : `₹${totalPrice}`}
              </p>
              <span className="text-[10px] text-emerald-700 font-mono">
                Assigned: {monument.gates.find((g) => g.recommended)?.gateName.split(' ')[0]} Gate
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#48bb78] hover:bg-[#38a169] text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
