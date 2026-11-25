'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import AdminNavbar from '@/components/AdminNavbar';
export default function AdminLayout({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('heritage_user');
            if (stored) {
                try {
                    const user = JSON.parse(stored);
                    setCurrentUser(user);
                }
                catch (e) { }
            }
            setAuthChecked(true);
        }
    }, []);
    // Access Control Guard
    if (authChecked && (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'officer'))) {
        return (<div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 border border-amber-300 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Lock className="w-8 h-8 text-amber-600"/>
          </div>

          <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Officer Authorization Required
          </span>

          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
            ASI Control Room (Restricted)
          </h2>

          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            This administrative console is restricted to authorized Archaeological Survey of India (ASI) officers and site marshals. Normal visitors please use the public portal to reserve passes and check wait times.
          </p>

          <div className="space-y-3">
            <Link href="/login" className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-xs">
              <Shield className="w-4 h-4 text-amber-400"/>
              <span>Sign In with Officer Credentials</span>
            </Link>

            <button onClick={async () => {
                try {
                    const res = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: 'officer@heritage.gov.in', password: 'officer123' }),
                    });
                    const data = await res.json();
                    if (data.success) {
                        localStorage.setItem('heritage_user', JSON.stringify(data.user));
                        if (data.token)
                            localStorage.setItem('heritage_jwt_token', data.token);
                        setCurrentUser(data.user);
                        window.location.reload();
                    }
                }
                catch (e) { }
            }} className="w-full flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-all">
              <span>⚡ One-Click Officer Login (Demo Test)</span>
            </button>

            <Link href="/" className="w-full flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs py-2.5 px-4 rounded-xl transition-all">
              <ArrowLeft className="w-3.5 h-3.5"/>
              <span>Return to Public Tourist Portal</span>
            </Link>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-stone-100 flex flex-col">
      <AdminNavbar />
      <main className="flex-1">{children}</main>
    </div>);
}
