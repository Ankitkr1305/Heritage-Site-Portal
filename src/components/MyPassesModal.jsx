'use client';
import React, { useState, useEffect } from 'react';
import { X, Ticket, QrCode, Calendar, Clock, RefreshCw } from 'lucide-react';
export default function MyPassesModal({ isOpen, onClose, onSelectPass, onBookNew, }) {
    const [passes, setPasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPasses = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            if (data.success && data.bookings) {
                setPasses(data.bookings);
            }
        }
        catch (e) {
            console.error('Failed to fetch passes', e);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            fetchPasses();
        }
    }, [isOpen]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="w-5 h-5 text-[#48bb78]"/>
            <h3 className="font-serif font-bold text-lg">My Reserved Heritage Passes</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={fetchPasses} className="p-1 text-gray-400 hover:text-white transition-colors" title="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}/>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5"/>
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (<div className="text-center py-12 text-gray-500 font-mono text-xs">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#48bb78]"/>
              <span>Retrieving passes from database...</span>
            </div>) : passes.length === 0 ? (<div className="text-center py-12 space-y-3">
              <Ticket className="w-12 h-12 text-gray-300 mx-auto"/>
              <p className="text-gray-600 font-serif font-bold text-lg">No Passes Booked Yet</p>
              <p className="text-xs text-gray-400 font-mono">
                Select a monument and time-slot to reserve your digital pass with guaranteed queue-free entry.
              </p>
              <button onClick={() => {
                onClose();
                onBookNew();
            }} className="mt-3 bg-[#48bb78] hover:bg-[#38a169] text-white font-mono font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded shadow-sm">
                Book Your First Pass
              </button>
            </div>) : (passes.map((p) => (<div key={p.bookingId} className="p-4 rounded-xl border border-gray-200 hover:border-[#48bb78] bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-base text-gray-900">{p.monumentName}</span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      {p.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 font-mono">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400"/>
                      <span>{p.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400"/>
                      <span>{p.timeSlot.split('(')[0]}</span>
                    </span>
                    <span>
                      {p.ticketCount} {p.ticketCount > 1 ? 'Guests' : 'Guest'} • ₹{p.totalAmount}
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-700 font-mono">
                    Assigned Gate: {p.gateAssigned}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={() => {
                onClose();
                onSelectPass(p);
            }} className="bg-slate-900 hover:bg-black text-white text-xs font-mono font-bold px-4 py-2 rounded transition-colors flex items-center space-x-1.5">
                    <QrCode className="w-3.5 h-3.5 text-emerald-400"/>
                    <span>View QR Pass</span>
                  </button>
                </div>
              </div>)))}
        </div>
      </div>
    </div>);
}
