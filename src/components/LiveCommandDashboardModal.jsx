'use client';
import React, { useState } from 'react';
import { X, Send, ShieldAlert, CheckCircle2, Camera, } from 'lucide-react';
export default function LiveCommandDashboardModal({ isOpen, onClose, sensors, alerts, onTriggerIntervention, isDbConnected = false, }) {
    const [selectedSensor, setSelectedSensor] = useState(sensors[0]);
    const [dispatchTitle, setDispatchTitle] = useState('');
    const [dispatchLocation, setDispatchLocation] = useState('Taj Mahal West Gate');
    const [dispatchAction, setDispatchAction] = useState('Divert all arriving tourists to South Gate (9 min queue)');
    const [isDispatching, setIsDispatching] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);
    if (!isOpen)
        return null;
    const handleManualDispatch = async (e) => {
        e.preventDefault();
        if (!dispatchTitle)
            return;
        setIsDispatching(true);
        try {
            await onTriggerIntervention(dispatchTitle, dispatchLocation, dispatchAction);
            setStatusMessage('Alert & MASI Intervention successfully dispatched to digital signage and security terminals!');
            setDispatchTitle('');
            setTimeout(() => setStatusMessage(null), 4000);
        }
        catch (err) {
            setStatusMessage('Dispatch failed');
        }
        finally {
            setIsDispatching(false);
        }
    };
    return (<div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative bg-slate-950 text-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden border border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
            <div>
              <h3 className="font-mono font-bold text-base tracking-wider flex items-center space-x-2">
                <span>ASI & SMART CITY LIVE CROWD COMMAND CENTER</span>
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded-full">
                  LIVE SECURE SESSION
                </span>
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Real-Time Computer Vision • MASI Flow Engines • Emergency Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full border bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
              Field Node Feed: Synchronized
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6"/>
            </button>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {statusMessage && (<div className="p-3 bg-emerald-900/50 border border-emerald-500/50 rounded-lg text-xs font-mono text-emerald-200 flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/>
              <span>{statusMessage}</span>
            </div>)}

          {/* Top Quick Status Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Monitored Sensors</span>
              <p className="text-2xl font-bold font-mono text-white mt-1">{sensors.length} Nodes</p>
              <span className="text-[10px] font-mono text-emerald-400">100% Optical Health</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Total Field Count</span>
              <p className="text-2xl font-bold font-mono text-white mt-1">
                {sensors.reduce((acc, s) => acc + s.peopleInView, 0).toLocaleString()}
              </p>
              <span className="text-[10px] font-mono text-blue-400">Aggregated Camera Inflow</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Active Alerts</span>
              <p className="text-2xl font-bold font-mono text-red-400 mt-1">{alerts.length} Warnings</p>
              <span className="text-[10px] font-mono text-red-300">MASI Loop Engaged</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Average Density</span>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
                {(sensors.reduce((acc, s) => acc + s.crowdDensity, 0) / sensors.length).toFixed(2)} p/m²
              </p>
              <span className="text-[10px] font-mono text-gray-400">Safe Limit &lt; 2.0 p/m²</span>
            </div>
          </div>

          {/* Sensor Selectors */}
          <div>
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block mb-3">
              Switch Live Telemetry Stream
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sensors.map((s) => {
            const isSelected = selectedSensor.sensorCode === s.sensorCode;
            return (<button key={s.sensorCode} onClick={() => setSelectedSensor(s)} className={`text-left p-3.5 rounded-xl border transition-all ${isSelected
                    ? 'border-[#48bb78] bg-slate-900 shadow-md ring-1 ring-[#48bb78]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-white">{s.sensorCode}</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${s.status === 'NORMAL'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : s.status === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'}`}>
                        {s.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-sans mt-1 truncate">{s.name}</p>
                    <div className="mt-2 flex justify-between text-[10px] font-mono text-gray-400">
                      <span>In view: {s.peopleInView}</span>
                      <span>Density: {s.crowdDensity} p/m²</span>
                    </div>
                  </button>);
        })}
            </div>
          </div>

          {/* Detailed Stream & Emergency Dispatcher in 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Detailed Selected Sensor View */}
            <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-mono font-bold text-white text-base">{selectedSensor.name}</h4>
                  <p className="text-xs text-gray-400 font-mono">{selectedSensor.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-400 block">Solar Battery</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {selectedSensor.batteryPercentage}%
                  </span>
                </div>
              </div>

              {/* Live Optical Feed with detections */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-slate-700">
                <img src="/images/monuments/varanasi-ghats.jpg" alt="Optical Camera Stream" className="w-full h-full object-cover"/>
                <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-white flex items-center space-x-1">
                  <Camera className="w-3 h-3 text-red-500 animate-pulse"/>
                  <span>LIVE RECOGNITION ACTIVE</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-lg border border-white/10 grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                  <div>
                    <span className="text-gray-400 block">Pedestrians</span>
                    <span className="font-bold text-white">{selectedSensor.detections.pedestrians}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Wheelchairs</span>
                    <span className="font-bold text-purple-400">{selectedSensor.detections.wheelchairs}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Children</span>
                    <span className="font-bold text-yellow-400">{selectedSensor.detections.children}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Pressure</span>
                    <span className="font-bold text-blue-400">{selectedSensor.pressureKPa} kPa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Alert & MASI Intervention Dispatcher */}
            <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="font-mono font-bold text-white text-base flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-red-500"/>
                  <span>MASI Intervention Dispatcher</span>
                </h4>
                <p className="text-xs text-gray-400 font-mono">Send dynamic gate orders to digital boards</p>
              </div>

              <form onSubmit={handleManualDispatch} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                    Intervention Title
                  </label>
                  <input type="text" required placeholder="e.g. West Gate Bottleneck Diversion" value={dispatchTitle} onChange={(e) => setDispatchTitle(e.target.value)} className="w-full text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#48bb78]"/>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                    Target Chokepoint
                  </label>
                  <input type="text" required value={dispatchLocation} onChange={(e) => setDispatchLocation(e.target.value)} className="w-full text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#48bb78]"/>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                    Action / Reroute Instruction
                  </label>
                  <textarea rows={2} required value={dispatchAction} onChange={(e) => setDispatchAction(e.target.value)} className="w-full text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#48bb78]"/>
                </div>

                <button type="submit" disabled={isDispatching} className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50">
                  <Send className="w-3.5 h-3.5"/>
                  <span>{isDispatching ? 'Dispatching...' : 'Broadcast MASI Intervention'}</span>
                </button>
              </form>

              {/* Active Incident Feed */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-2">
                  Active Incident Advisories
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {alerts.map((al) => (<div key={al.alertId} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-red-400">{al.title}</span>
                        <span className="text-gray-500">{al.timestamp}</span>
                      </div>
                      <p className="text-gray-400">{al.message}</p>
                    </div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
