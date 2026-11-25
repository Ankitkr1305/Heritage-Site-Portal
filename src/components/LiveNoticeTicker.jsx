'use client';
import React from 'react';
export default function LiveNoticeTicker({ activeNotice }) {
    const defaultNotices = [
        '🔔 Taj Mahal: East Gate turnstiles reporting fastest clearance (<8 mins wait). Online e-tickets mandatory.',
        '🌊 Varanasi: Evening Dashashwamedh Ghat Ganga Aarti e-passes for 18:30 slot filling fast. Arrive 30 mins prior.',
        '🚩 Red Fort: Lahori Gate security lane operating normally. Light & Sound show scheduled at 19:30.',
        '🏛️ Qutub Minar: Iron Pillar enclosure open. Wheelchair ramp accessible from Alai Gate.',
        '☀️ Konark Sun Temple: Evening illumination show starting at 18:30 IST. Marine Drive tourist gate recommended.',
        '🏰 Amber Fort (Jaipur): Elephant ramp & Chand Pol gate open. Composite 5-monument passes available online.',
        '🛕 Hampi: Virupaksha Temple & Vittala Stone Chariot buggy shuttles operating smoothly. Clear weather.',
        '📞 24x7 Multi-lingual Tourist Helpline: Call 1363 toll-free for immediate assistance.',
    ];
    return (<div className="bg-amber-500/10 border-b border-amber-200/80 text-stone-800 py-2.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>LIVE ASI ADVISORY</span>
        </div>

        <div className="relative overflow-hidden w-full h-5">
          <div className="animate-marquee whitespace-nowrap text-xs font-medium text-stone-800 flex items-center space-x-8">
            {defaultNotices.map((notice, idx) => (<span key={idx} className="inline-flex items-center space-x-1">
                <span>{notice}</span>
                <span className="text-stone-300 ml-4">•</span>
              </span>))}
          </div>
        </div>
      </div>
    </div>);
}
