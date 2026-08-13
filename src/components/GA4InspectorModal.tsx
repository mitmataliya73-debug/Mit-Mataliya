import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { analytics } from '../utils/analytics';
import { GA4Event } from '../types';
import { X, BarChart2, Trash2, CheckCircle2, Code2 } from 'lucide-react';

export const GA4InspectorModal: React.FC = () => {
  const { isGA4InspectorOpen, setGA4InspectorOpen } = useEcommerce();
  const [logs, setLogs] = useState<GA4Event[]>(analytics.getEventLogs());
  const [selectedEvent, setSelectedEvent] = useState<GA4Event | null>(null);

  useEffect(() => {
    const unsubscribe = analytics.subscribe(() => {
      setLogs(analytics.getEventLogs());
    });
    return () => unsubscribe();
  }, []);

  if (!isGA4InspectorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart2 className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                LIVE GA4 ANALYTICS INSPECTOR
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Measurement ID: <span className="text-red-400 font-bold">{analytics.getMeasurementId()}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                analytics.clearLogs();
                setLogs([]);
                setSelectedEvent(null);
              }}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1 border border-neutral-800 cursor-pointer"
              title="Clear Logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR LOGS</span>
            </button>
            <button
              onClick={() => setGA4InspectorOpen(false)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-neutral-950">
          
          {/* Left Event List */}
          <div className="md:col-span-5 border-r border-neutral-800 overflow-y-auto p-4 space-y-2">
            <div className="text-[11px] font-bold font-mono text-neutral-400 uppercase tracking-wider mb-2 flex justify-between">
              <span>FIRED EVENTS ({logs.length})</span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>

            {logs.length === 0 ? (
              <div className="text-center py-10 text-neutral-500 text-xs font-mono">
                No events recorded yet. Navigate or interact with products to fire events.
              </div>
            ) : (
              logs.map((log) => (
                <button
                  key={log.id}
                  onClick={() => setSelectedEvent(log)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    selectedEvent?.id === log.id
                      ? 'bg-red-950/60 border-red-600 text-white shadow-md'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-400">{log.eventName}</span>
                    <span className="text-[10px] text-neutral-500">{log.timestamp}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate mt-1">
                    {log.parameters.page_location || log.parameters.search_term || log.parameters.items?.[0]?.item_name || 'Event Payload'}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Right JSON Detail */}
          <div className="md:col-span-7 p-5 overflow-y-auto bg-neutral-900/50 space-y-4">
            {selectedEvent ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-red-500" />
                    <span className="font-mono font-bold text-xs text-white uppercase">
                      EVENT PAYLOAD: {selectedEvent.eventName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{selectedEvent.timestamp}</span>
                </div>

                <pre className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                  {JSON.stringify(selectedEvent, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 text-neutral-500 text-xs font-mono">
                <CheckCircle2 className="w-8 h-8 text-neutral-700" />
                <p>Select any event on the left to inspect its complete GA4 parameter schema.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between px-5 font-mono">
          <span>GA4 Measurement ID Placeholder: GA_MEASUREMENT_ID</span>
          <span className="text-emerald-400 font-bold">READY FOR DEPLOYMENT</span>
        </div>

      </div>
    </div>
  );
};
