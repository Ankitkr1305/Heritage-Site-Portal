'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Ticket,
  Search,
  CheckCircle2,
  Clock,
  RefreshCw,
  User,
  MapPin,
  Calendar,
  Shield,
  Eye,
  Filter,
} from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CONFIRMED' | 'CHECKED_IN'>('ALL');
  const [loading, setLoading] = useState(true);
  const [selectedPass, setSelectedPass] = useState<any | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingId: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: 'CHECKED_IN' }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.bookingId === bookingId ? { ...b, status: 'CHECKED_IN' } : b))
        );
        if (selectedPass?.bookingId === bookingId) {
          setSelectedPass((prev: any) => ({ ...prev, status: 'CHECKED_IN' }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.visitorName?.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId?.toLowerCase().includes(search.toLowerCase()) ||
      b.monumentName?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search);
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalBooked = bookings.length;
  const totalCheckedIn = bookings.filter((b) => b.status === 'CHECKED_IN').length;
  const totalAmount = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Ticket className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Tourist E-Passes & Turnstile Check-In Console
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Dedicated site to review all issued entry passes across destinations and execute turnstile admission.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchBookings}
            className="flex items-center space-x-1.5 text-xs bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-3 py-2 rounded-lg transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Passes</span>
          </button>

          <Link
            href="/admin"
            className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-lg transition-colors"
          >
            Back to Overview
          </Link>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-mono text-stone-400 uppercase">TOTAL PASSES ISSUED</span>
          <p className="text-2xl font-serif font-bold text-stone-900 mt-1">{totalBooked}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-mono text-stone-400 uppercase">ADMITTED / CHECKED IN</span>
          <p className="text-2xl font-serif font-bold text-emerald-700 mt-1">
            {totalCheckedIn} <span className="text-xs text-stone-500 font-sans font-normal">({totalBooked > 0 ? Math.round((totalCheckedIn / totalBooked) * 100) : 0}%)</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-mono text-stone-400 uppercase">TOTAL TICKET VALUE</span>
          <p className="text-2xl font-serif font-bold text-stone-900 mt-1">₹{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by pass ID, visitor name, monument..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {(['ALL', 'CONFIRMED', 'CHECKED_IN'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {status === 'ALL' ? 'All Passes' : status === 'CONFIRMED' ? 'Pending Entry' : 'Admitted'}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono text-[11px] uppercase">
              <tr>
                <th className="px-4 py-3">Pass ID & Status</th>
                <th className="px-4 py-3">Visitor Name & Contact</th>
                <th className="px-4 py-3">Monument & Entry Gate</th>
                <th className="px-4 py-3">Slot Time & Date</th>
                <th className="px-4 py-3">Tickets & Fee</th>
                <th className="px-4 py-3 text-right">Gate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-4 py-3 font-mono">
                    <span className="font-bold text-stone-900 block">{booking.bookingId}</span>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.2 rounded mt-0.5 ${
                        booking.status === 'CHECKED_IN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {booking.status === 'CHECKED_IN' ? '✓ ADMITTED' : 'CONFIRMED'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-semibold text-stone-900 block">{booking.visitorName}</span>
                    <span className="text-[11px] text-stone-500">{booking.phone || booking.email}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-medium text-stone-800 block">{booking.monumentName}</span>
                    <span className="text-[11px] text-emerald-700">{booking.gateAssigned || 'East Gate'}</span>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <span className="block text-stone-800 font-medium">{booking.date}</span>
                    <span className="text-[11px] text-stone-500">{booking.timeSlot}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-medium text-stone-800 block">
                      {booking.ticketCount}x {booking.ticketTier || 'Standard'}
                    </span>
                    <span className="text-stone-900 font-bold font-mono">₹{booking.totalAmount}</span>
                  </td>

                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedPass(booking)}
                      className="text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      View QR
                    </button>

                    {booking.status !== 'CHECKED_IN' ? (
                      <button
                        onClick={() => handleCheckIn(booking.bookingId)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-all shadow-2xs"
                      >
                        Admit (Scan)
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs">✓ Checked In</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-500 text-xs">
            No booking passes found matching your search.
          </div>
        )}
      </div>

      {/* QR Pass Preview Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <span className="font-serif font-bold text-base text-stone-900">
                Official E-Pass Verification
              </span>
              <button
                onClick={() => setSelectedPass(null)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-center space-y-2">
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border border-stone-300 flex items-center justify-center font-mono text-[10px] text-stone-400">
                <div className="text-center">
                  <div className="text-4xl mb-1">🏁</div>
                  <span className="font-bold text-stone-800">{selectedPass.bookingId}</span>
                </div>
              </div>
              <p className="text-[11px] font-mono text-stone-500">{selectedPass.qrCodeToken}</p>
            </div>

            <div className="space-y-1.5 text-xs text-stone-700">
              <p><strong>Visitor:</strong> {selectedPass.visitorName}</p>
              <p><strong>Monument:</strong> {selectedPass.monumentName}</p>
              <p><strong>Gate:</strong> {selectedPass.gateAssigned}</p>
              <p><strong>Date & Slot:</strong> {selectedPass.date} ({selectedPass.timeSlot})</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={selectedPass.status === 'CHECKED_IN' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                  {selectedPass.status}
                </span>
              </p>
            </div>

            {selectedPass.status !== 'CHECKED_IN' && (
              <button
                onClick={() => handleCheckIn(selectedPass.bookingId)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-all"
              >
                Execute Check-In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
