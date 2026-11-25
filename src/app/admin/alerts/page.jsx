'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Send, CheckCircle2, RefreshCw, Trash2, } from 'lucide-react';
export default function AdminAlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveMessage, setSaveMessage] = useState(null);
    // New alert form
    const [newTitle, setNewTitle] = useState('');
    const [newChokepoint, setNewChokepoint] = useState('Taj Mahal West Gate');
    const [newMsg, setNewMsg] = useState('');
    const [newType, setNewType] = useState('WARNING');
    const [newSeverity, setNewSeverity] = useState('high');
    useEffect(() => {
        fetchAlerts();
    }, []);
    const fetchAlerts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/alerts');
            const data = await res.json();
            if (data.success && data.alerts) {
                setAlerts(data.alerts);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDispatchAlert = async (e) => {
        e.preventDefault();
        if (!newTitle || !newMsg)
            return;
        try {
            const res = await fetch('/api/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newTitle,
                    chokepoint: newChokepoint,
                    message: newMsg,
                    actionTaken: 'Electronic gate displays updated. Public ticker broadcasted.',
                    type: newType,
                    severity: newSeverity,
                }),
            });
            const data = await res.json();
            if (data.success && data.alert) {
                setAlerts((prev) => [data.alert, ...prev]);
                setNewTitle('');
                setNewMsg('');
                setSaveMessage('✓ Emergency advisory broadcasted to all gate digital screens and mobile visitors!');
                setTimeout(() => setSaveMessage(null), 4000);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    const handleDismissAlert = (alertId) => {
        setAlerts((prev) => prev.filter((a) => a.alertId !== alertId));
        setSaveMessage('Advisory resolved & removed from public ticker.');
        setTimeout(() => setSaveMessage(null), 3000);
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4"/>
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Live Advisory & Emergency Broadcast Dispatch
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Dedicated site to issue crowd diversions, severe weather notices, and emergency gate rerouting to incoming tourists.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={fetchAlerts} className="flex items-center space-x-1.5 text-xs bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-3 py-2 rounded-lg transition-colors shadow-2xs">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}/>
            <span>Sync Alerts</span>
          </button>

          <Link href="/admin" className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-2 rounded-lg transition-colors">
            Back to Overview
          </Link>
        </div>
      </div>

      {saveMessage && (<div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0"/>
          <span>{saveMessage}</span>
        </div>)}

      {/* Grid: Dispatch Form & Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Create & Broadcast Alert */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-stone-100">
            <Send className="w-4 h-4 text-amber-600"/>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Issue Live Gate Advisory
            </h3>
          </div>

          <form onSubmit={handleDispatchAlert} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Advisory Headline / Title
              </label>
              <input type="text" placeholder="e.g. West Gate Queue Build-up Diversion" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-amber-600 focus:bg-white"/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Target Monument / Gate
                </label>
                <select value={newChokepoint} onChange={(e) => setNewChokepoint(e.target.value)} className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-600">
                  <option value="Taj Mahal West Gate">Taj Mahal West Gate</option>
                  <option value="Taj Mahal East Gate">Taj Mahal East Gate</option>
                  <option value="Varanasi Dashashwamedh Ghat">Varanasi Dashashwamedh</option>
                  <option value="Red Fort Lahori Gate">Red Fort Lahori Gate</option>
                  <option value="Qutub Minar Alai Gate">Qutub Minar Alai Gate</option>
                  <option value="Amber Fort Suraj Pol">Amber Fort Suraj Pol</option>
                  <option value="Hampi Virupaksha Temple">Hampi Virupaksha Temple</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Notice Type
                </label>
                <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-600">
                  <option value="WARNING">Queue Warning</option>
                  <option value="DIVERSION">Gate Diversion</option>
                  <option value="ADVISORY">Weather Advisory</option>
                  <option value="CRITICAL">Critical Surge</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Advisory Instructions for Tourists
              </label>
              <textarea rows={3} placeholder="Direct visitors to alternate gates, provide transit advice, or notify slot adjustments..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} required className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-600 focus:bg-white resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2">
              <Send className="w-3.5 h-3.5 text-amber-400"/>
              <span>Broadcast Notice Instantly</span>
            </button>
          </form>
        </div>

        {/* Right: Active Broadcasts List */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Active Broadcast Advisories ({alerts.length})
              </h3>
              <p className="text-xs text-stone-500">
                These notices are currently live on the public website ticker and electronic turnstile boards.
              </p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (<div key={alert.alertId} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${alert.type === 'CRITICAL'
                ? 'bg-red-100 text-red-800'
                : alert.type === 'DIVERSION'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-amber-100 text-amber-800'}`}>
                        {alert.type}
                      </span>
                      <span className="font-semibold text-xs text-stone-900">
                        {alert.title}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {alert.message}
                    </p>
                  </div>

                  <button onClick={() => handleDismissAlert(alert.alertId)} title="Dismiss Alert" className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-100 transition-colors shrink-0">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>Location: {alert.chokepoint}</span>
                  <span>{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>))}

            {alerts.length === 0 && (<div className="text-center py-12 text-stone-500 text-xs">
                No active emergency advisories. All gate channels operating normally.
              </div>)}
          </div>
        </div>
      </div>
    </div>);
}
