'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Shield,
  Sliders,
  Ticket,
  AlertTriangle,
  Radio,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  RefreshCw,
} from 'lucide-react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('heritage_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {}
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('heritage_user');
      localStorage.removeItem('heritage_jwt_token');
      document.cookie = 'heritage_auth_token=; path=/; max-age=0;';
    }
    router.push('/login');
  };

  const navItems = [
    {
      name: 'Overview',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      name: 'Monuments & Gates',
      href: '/admin/monuments',
      icon: Sliders,
      active: pathname.startsWith('/admin/monuments'),
    },
    {
      name: 'Passes & Check-In',
      href: '/admin/bookings',
      icon: Ticket,
      active: pathname.startsWith('/admin/bookings'),
    },
    {
      name: 'Live Alerts & Dispatch',
      href: '/admin/alerts',
      icon: AlertTriangle,
      active: pathname.startsWith('/admin/alerts'),
    },
    {
      name: 'Sensors & Turnstiles',
      href: '/admin/sensors',
      icon: Radio,
      active: pathname.startsWith('/admin/sensors'),
    },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="text-stone-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-xs">
            🛡️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-bold text-base sm:text-lg text-white">
                ASI Master Control Center
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono px-2 py-0.2 rounded-full font-bold">
                OFFICER CONSOLE
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Archaeological Survey of India • Smart Crowd & Safety Network
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {currentUser && (
            <span className="text-xs text-stone-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium truncate max-w-[140px]">
                {currentUser.name}
              </span>
            </span>
          )}

          <Link
            href="/"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-stone-200 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
          >
            Public Site
          </Link>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 bg-slate-800 hover:bg-red-950/60 hover:text-red-400 rounded-lg text-stone-400 transition-colors border border-slate-700"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Pages Navigation Bar (Each opens a separate dedicated site/route) */}
      <div className="bg-slate-950/70 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex space-x-1 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  item.active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.active ? 'text-slate-950' : 'text-stone-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
