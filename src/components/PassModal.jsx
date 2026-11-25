'use client';
import React from 'react';
import { X, CheckCircle2, Shield, Printer } from 'lucide-react';
export default function PassModal({ isOpen, onClose, booking }) {
    if (!isOpen || !booking)
        return null;
    const handlePrint = () => {
        window.print();
    };
    return (<div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Pass Top Banner */}
        <div className="bg-[#1a202c] text-white p-5 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5"/>
          </button>

          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300 font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5"/>
            <span>CONFIRMED DIGITAL PASS</span>
          </div>

          <h3 className="font-serif font-bold text-2xl tracking-tight">{booking.monumentName}</h3>
          <p className="text-xs text-gray-400 font-mono mt-0.5">Booking Ref: {booking.bookingId}</p>
        </div>

        {/* Digital Ticket Body */}
        <div className="p-6 space-y-5 bg-gradient-to-b from-white to-slate-50">
          {/* QR Code and Barcode Simulation */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-dashed border-gray-300 shadow-xs">
            {/* SVG QR Code Simulation */}
            <div className="w-36 h-36 bg-slate-900 rounded-lg p-2.5 flex items-center justify-center">
              <div className="w-full h-full bg-white p-1 rounded grid grid-cols-6 gap-1">
                {Array.from({ length: 36 }).map((_, i) => (<div key={i} className={`rounded-xs ${i % 2 === 0 || i % 5 === 0 || i < 7 || i % 6 === 0 ? 'bg-slate-900' : 'bg-transparent'}`}></div>))}
              </div>
            </div>

            <span className="text-[10px] font-mono tracking-widest text-gray-500 mt-2 font-bold uppercase">
              SCAN AT TURNSTILE SENSOR
            </span>
            <span className="text-[9px] font-mono text-gray-400">{booking.qrCodeToken}</span>
          </div>

          {/* Details Grid */}
          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Visitor:</span>
              <span className="font-bold text-gray-900">{booking.visitorName}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Date:</span>
              <span className="font-bold text-gray-900">{booking.date}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Time-Slot Window:</span>
              <span className="font-bold text-emerald-700">{booking.timeSlot}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Tier & Count:</span>
              <span className="font-bold text-gray-900">
                {booking.ticketTier} ({booking.ticketCount} {booking.ticketCount > 1 ? 'Guests' : 'Guest'})
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Assigned Gate:</span>
              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {booking.gateAssigned}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Total Paid:</span>
              <span className="font-bold text-gray-900">₹{booking.totalAmount}</span>
            </div>
          </div>

          {/* Gate Guidance Notice */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start space-x-2">
            <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"/>
            <span>
              <strong>Crowd Guidance:</strong> Please arrive within your 30-minute entry window. Present this QR code
              directly at the automated optical turnstiles at {booking.gateAssigned}.
            </span>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <div className="flex space-x-3">
              <button onClick={handlePrint} className="flex-1 bg-slate-900 hover:bg-black text-white text-xs font-mono font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Printer className="w-4 h-4"/>
                <span>Print / Save PDF</span>
              </button>

              <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-mono font-bold px-4 py-2.5 rounded-lg transition-colors">
                Done
              </button>
            </div>

            <a href="/passes" className="w-full text-center block text-xs font-semibold text-emerald-800 hover:text-emerald-900 hover:underline pt-1">
              View All My E-Passes on Dedicated Site →
            </a>
          </div>
        </div>
      </div>
    </div>);
}
