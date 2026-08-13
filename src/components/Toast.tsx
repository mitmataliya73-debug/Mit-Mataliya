import React from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { notification } = useEcommerce();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-neutral-900 border border-neutral-700 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
      {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
      {notification.type === 'info' && <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />}
      {notification.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />}
      
      <p className="text-xs font-bold uppercase tracking-wider text-neutral-200">
        {notification.message}
      </p>
    </div>
  );
};
