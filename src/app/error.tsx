'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Next.js Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-md p-8 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Something went wrong!
          </h2>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            {error.message || 'An unexpected error occurred while rendering the page.'}
          </p>
          {error.digest && (
            <span className="text-[10px] font-mono text-stone-400 block mt-1">
              Error Digest: {error.digest}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center space-x-3 pt-2">
          <button
            onClick={() => reset()}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
