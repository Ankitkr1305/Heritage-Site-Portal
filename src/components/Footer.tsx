'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, MapPin, Database, Heart, PhoneCall, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-serif font-bold text-xl shadow-xs border border-emerald-700">
                🏛️
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-tight block">
                  YatraSuraksha
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  National Heritage Crowd Management System
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              An initiative supporting the Archaeological Survey of India (ASI) and the Ministry of Tourism to safeguard
              India’s cultural monuments while ensuring dignified, queue-free visits for domestic and international
              tourists.
            </p>

            <div className="pt-2 text-xs font-mono text-gray-400 space-y-1.5">
              <p className="flex items-center space-x-2 text-emerald-400">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24x7 Multi-lingual Tourist Helpline: 1363 (Toll Free)</span>
              </p>
              <p className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-3.5 h-3.5" />
                <span>support@heritage-crowd.gov.in</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-4">
              Destinations
            </span>
            <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
              <li>
                <Link href="/monuments/taj-mahal" className="hover:text-white transition-colors">
                  Taj Mahal, Agra
                </Link>
              </li>
              <li>
                <Link href="/monuments/varanasi-ghats" className="hover:text-white transition-colors">
                  Varanasi Sacred Ghats
                </Link>
              </li>
              <li>
                <Link href="/monuments/red-fort" className="hover:text-white transition-colors">
                  Red Fort (Lal Qila), Delhi
                </Link>
              </li>
              <li>
                <Link href="/monuments/qutub-minar" className="hover:text-white transition-colors">
                  Qutub Minar Complex
                </Link>
              </li>
              <li>
                <Link href="/monuments/konark-sun-temple" className="hover:text-white transition-colors">
                  Konark Sun Temple, Odisha
                </Link>
              </li>
              <li>
                <Link href="/monuments/amber-fort" className="hover:text-white transition-colors">
                  Amber Fort & Palace, Jaipur
                </Link>
              </li>
              <li>
                <Link href="/monuments/hampi" className="hover:text-white transition-colors">
                  Group of Monuments at Hampi
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety Protocols */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-4">
              Visitor Services
            </span>
            <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Visitor Login & Sign Up
                </Link>
              </li>
              <li>
                <a href="#live-status" className="hover:text-white transition-colors">
                  Check Live Gate Queues
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Official Ticket Rates & Slots
                </a>
              </li>
              <li>
                <a href="#guidelines" className="hover:text-white transition-colors">
                  Visitor Guidelines & FAQs
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  🛡️ Officer / Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-4">
              Conservation & Privacy
            </span>
            <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
              <li>
                <span className="text-white font-medium">Zero Drilling:</span> Heritage architecture protected.
              </li>
              <li>
                <span className="text-white font-medium">Privacy Guaranteed:</span> No facial scanning or PII stored.
              </li>
              <li>
                <span className="text-white font-medium">Digital Ticketing:</span> Verified instant QR passes.
              </li>
              <li>
                <span className="text-white font-medium">Electric Buggies:</span> Zero-emission shuttle links.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <p>© 2026 Archaeological Survey of India • Heritage Site Crowd Management System</p>
          <div className="flex items-center space-x-6">
            <Link href="/passes" className="hover:text-gray-300">
              My E-Passes
            </Link>
            <Link href="/admin" className="hover:text-amber-400">
              Admin Console
            </Link>
            <Link href="/login" className="hover:text-gray-300">
              Officer Login
            </Link>
            <a href="tel:1363" className="text-emerald-400 hover:text-emerald-300">
              Helpline: 1363
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
