import React from 'react';
export default function Loading() {
    return (<div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-2xl animate-pulse shadow-md">
        🏛️
      </div>
      <div className="space-y-2 text-center">
        <h3 className="font-serif font-bold text-lg text-stone-900">
          Loading Heritage Crowd Portal...
        </h3>
        <p className="text-xs text-stone-500 font-mono">
          Connecting to MongoDB & Syncing Live Turnstile Telemetry
        </p>
      </div>

      {/* Skeleton placeholders demonstrating Loading UI */}
      <div className="w-full max-w-md space-y-3 pt-4">
        <div className="h-4 bg-stone-200 rounded-full animate-pulse"></div>
        <div className="h-4 bg-stone-200 rounded-full animate-pulse w-5/6 mx-auto"></div>
        <div className="h-4 bg-stone-200 rounded-full animate-pulse w-3/4 mx-auto"></div>
      </div>
    </div>);
}
