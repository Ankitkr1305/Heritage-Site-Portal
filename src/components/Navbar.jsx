'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Ticket, Menu, X, User, LogOut, PhoneCall } from 'lucide-react';
export default function Navbar({ onOpenBooking, onOpenDashboard, onOpenPasses, activeAlertCount = 2, }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('heritage_user');
            if (stored) {
                try {
                    setCurrentUser(JSON.parse(stored));
                }
                catch (e) { }
            }
        }
    }, []);
    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        }
        catch (e) { }
        if (typeof window !== 'undefined') {
            localStorage.removeItem('heritage_user');
            localStorage.removeItem('heritage_jwt_token');
            setCurrentUser(null);
            window.location.href = '/';
        }
    };
    return (<header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* Official Government / Heritage Top Announcement Strip */}
      <div className="bg-[#1c2430] text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="text-amber-400 font-semibold">सत्यमेव जयते</span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300">Archaeological Survey of India & Ministry of Tourism</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] sm:text-xs">
            <a href="tel:1363" className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
              <PhoneCall className="w-3 h-3"/>
              <span>Tourist Helpline: <strong>1363</strong> (24x7)</span>
            </a>
            <span className="text-stone-600">|</span>
            <Link href="/login" className="text-stone-400 hover:text-amber-300 transition-colors flex items-center space-x-1">
              <Shield className="w-3 h-3 text-amber-500"/>
              <span>Officer Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Portal Name */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-slate-900 text-amber-300 flex items-center justify-center text-xl shadow-xs border border-emerald-700/50 group-hover:scale-105 transition-transform">
              🏛️
            </div>
            <div>
              <span className="font-serif font-bold text-lg sm:text-xl text-stone-900 tracking-tight block leading-tight">
                Heritage Crowd Portal
              </span>
              <span className="text-[11px] font-sans text-emerald-700 font-medium block">
                Smart-Tourism & Gate Safety System
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links (Spaced & Legible) */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-600">
            <a href="#destinations" className="hover:text-emerald-800 transition-colors">
              Destinations
            </a>
            <a href="#live-status" className="hover:text-emerald-800 transition-colors">
              Live Queues
            </a>
            <a href="#how-it-works" className="hover:text-emerald-800 transition-colors">
              How It Works
            </a>
            <a href="#guidelines" className="hover:text-emerald-800 transition-colors">
              Visitor Guidelines
            </a>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3.5">
            <Link href="/passes" className="text-stone-700 hover:text-stone-900 font-medium text-xs px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors flex items-center space-x-1.5">
              <Ticket className="w-3.5 h-3.5 text-emerald-600"/>
              <span>My Passes</span>
            </Link>

            {/* Officer / Admin Control Room (ONLY visible to Admin / Officer) */}
            {currentUser && (currentUser.role === 'admin' || currentUser.role === 'officer') && (<Link href="/admin" className="text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 font-medium text-xs px-3.5 py-2 rounded-lg transition-all flex items-center space-x-2 shadow-xs">
                <Shield className="w-3.5 h-3.5 text-amber-400"/>
                <span>Admin Console</span>
                {activeAlertCount > 0 && (<span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {activeAlertCount}
                  </span>)}
              </Link>)}

            {/* Auth / Account */}
            {currentUser ? (<div className="flex items-center space-x-2 pl-2 border-l border-stone-200">
                <span className="text-xs font-semibold text-stone-800 flex items-center space-x-1.5 bg-stone-100 px-3 py-1.5 rounded-lg">
                  <User className="w-3.5 h-3.5 text-emerald-600"/>
                  <span className="truncate max-w-[120px]">
                    {currentUser.role === 'officer' || currentUser.role === 'admin' ? '👮 ' : '👤 '}
                    {currentUser.name}
                  </span>
                </span>
                <button onClick={handleLogout} title="Sign Out" className="p-1.5 text-stone-400 hover:text-red-600 transition-colors">
                  <LogOut className="w-4 h-4"/>
                </button>
              </div>) : (<Link href="/login" className="text-stone-700 hover:text-stone-900 font-semibold text-xs px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                Sign In
              </Link>)}

            <button onClick={() => onOpenBooking()} className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs hover:shadow-sm transition-all">
              Book Pass
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button onClick={() => onOpenBooking()} className="text-xs font-bold bg-emerald-700 text-white px-3 py-1.5 rounded-lg">
              Book
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-700 hover:text-stone-900 focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (<div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-stone-800 py-2 border-b border-stone-100">
            Heritage Destinations
          </a>
          <a href="#live-status" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-stone-800 py-2 border-b border-stone-100">
            Live Gate Queues & Wait Times
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-stone-800 py-2 border-b border-stone-100">
            How the Safety System Works
          </a>
          <a href="#guidelines" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-stone-800 py-2 border-b border-stone-100">
            Visitor Guidelines & FAQ
          </a>
          <div className="pt-2 flex flex-col space-y-2">
            <Link href="/passes" onClick={() => setMobileMenuOpen(false)} className="w-full text-left font-medium text-xs bg-stone-100 text-stone-800 px-3 py-2.5 rounded-lg flex items-center justify-between">
              <span>View My Booked Passes</span>
              <Ticket className="w-4 h-4 text-emerald-600"/>
            </Link>
            {currentUser && (currentUser.role === 'admin' || currentUser.role === 'officer') && (<Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full text-left font-medium text-xs bg-slate-900 text-white px-3 py-2.5 rounded-lg flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400"/>
                  <span>Officer / Admin Console</span>
                </span>
                <span className="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  MASTER
                </span>
              </Link>)}
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center font-medium text-xs bg-stone-100 text-stone-800 py-2.5 rounded-lg">
              {currentUser ? `Account: ${currentUser.name} (${currentUser.role || 'tourist'})` : 'Login / Register Account'}
            </Link>
          </div>
        </div>)}
    </header>);
}
