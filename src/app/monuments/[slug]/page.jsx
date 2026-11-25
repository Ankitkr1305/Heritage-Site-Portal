import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { getMonumentBySlug, getMonuments } from '@/lib/dbService';
// Unit II: Incremental Static Regeneration (ISR) - revalidates page every 60 seconds
export const revalidate = 60;
// Unit II: Static Site Generation (SSG) - pre-renders all monument routes at build time
export async function generateStaticParams() {
    const { data } = await getMonuments();
    return data.map((monument) => ({
        slug: monument.slug,
    }));
}
// Unit V: Dynamic SEO Metadata API
export async function generateMetadata({ params, }) {
    const { data } = await getMonumentBySlug(params.slug);
    if (!data) {
        return {
            title: 'Monument Not Found | Heritage Crowd System',
        };
    }
    return {
        title: `${data.name} — Live Crowd Status & Tickets | Heritage Portal`,
        description: `Official smart-tourism guide for ${data.name} in ${data.city}. Current occupancy: ${data.crowdStatus}. Real-time gate queues and ticket booking.`,
        openGraph: {
            title: `${data.name} - Heritage Crowd Management`,
            description: data.description,
            images: [{ url: data.image }],
        },
    };
}
// Unit II: React Server Component (RSC) with direct Server-Side Data Fetching
export default async function MonumentDetailPage({ params, }) {
    const { data: monument } = await getMonumentBySlug(params.slug);
    if (!monument) {
        notFound();
    }
    const occupancy = Math.round((monument.currentVisitors / monument.maxCapacity) * 100);
    const recommendedGate = monument.gates.find((g) => g.recommended) || monument.gates[0];
    return (<div className="min-h-screen bg-stone-50">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-stone-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center space-x-2 text-xs font-medium text-stone-600 hover:text-emerald-800 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span>Back to All Monuments</span>
          </Link>
          <span className="text-xs font-mono text-stone-400">
            Rendered via Server Component (SSG + ISR: 60s)
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Visual Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-stone-900 h-80 sm:h-96">
          <img src={monument.image} alt={monument.name} className="w-full h-full object-cover opacity-85"/>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

          <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
            <span className="bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-700"/>
              <span>{monument.category}</span>
            </span>

            <span className="bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs">
              LIVE LOAD: {monument.crowdStatus} ({occupancy}%)
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-300">
              <MapPin className="w-4 h-4 text-emerald-400"/>
              <span>{monument.location}</span>
              <span>•</span>
              <span>Era: {monument.yearBuilt}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {monument.name}
            </h1>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500 font-mono block">Current Influx</span>
            <p className="text-2xl font-bold font-mono text-stone-900 mt-1">
              {monument.currentVisitors.toLocaleString()}
            </p>
            <span className="text-[11px] text-stone-500">Max Cap: {monument.maxCapacity.toLocaleString()}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500 font-mono block">Inflow Velocity</span>
            <p className="text-2xl font-bold font-mono text-stone-900 mt-1">
              {monument.inflowRatePerMin} / min
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold">Live turnstiles</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500 font-mono block">Fastest Gate</span>
            <p className="text-lg font-bold font-serif text-emerald-800 mt-1 truncate">
              {recommendedGate.gateName.split(' ')[0]} Gate
            </p>
            <span className="text-[11px] text-emerald-700 font-mono">{recommendedGate.currentQueueWaitMinutes} min wait</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500 font-mono block">Standard Fee</span>
            <p className="text-2xl font-bold font-mono text-stone-900 mt-1">
              {monument.ticketTiers[0]?.price === 0 ? 'Free' : `₹${monument.ticketTiers[0]?.price}`}
            </p>
            <span className="text-[11px] text-stone-500">{monument.ticketTiers[0]?.name}</span>
          </div>
        </div>

        {/* Details & Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">Historical Significance</h2>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">{monument.description}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-stone-600">
                <span><strong>Patron:</strong> {monument.builder}</span>
                <span>•</span>
                <span><strong>Constructed:</strong> {monument.yearBuilt}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-sm font-bold font-serif text-stone-900 mb-3">Architectural Elements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {monument.architecturalHighlights.map((h, i) => (<div key={i} className="flex items-start space-x-2 p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5"/>
                    <span>{h}</span>
                  </div>))}
              </div>
            </div>
          </div>

          {/* Quick Book Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">Reserve Entry Pass</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Book your guaranteed entry time-slot to skip standard gate lines and receive live SMS queue updates.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Available Slots:</span>
                  <span className="font-semibold text-emerald-800">{monument.timeSlots.length} Windows</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">Recommended Arrival:</span>
                  <span className="font-semibold text-stone-900">06:00 - 08:30 (Sunrise)</span>
                </div>
              </div>
            </div>

            <Link href={`/?book=${monument.slug}`} className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-3 rounded-xl transition-colors text-center block shadow-xs">
              Reserve Guaranteed Entry Pass Now →
            </Link>
          </div>
        </div>
      </main>
    </div>);
}
