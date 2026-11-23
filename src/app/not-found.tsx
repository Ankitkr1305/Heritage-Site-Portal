import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-md p-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100 text-3xl">
          🏛️
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
            404 NOT FOUND
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-3">
            Heritage Page Not Found
          </h2>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            The destination or gate status page you are looking for does not exist or has been relocated in the national directory.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
