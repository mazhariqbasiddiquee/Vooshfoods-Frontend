import React from 'react';
import { Wifi, WifiOff, Clock, CheckCircle } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connecting' | 'connected' | 'disconnected' | 'sending' | 'received';
  processingTime?: number;
}

export function ConnectionStatus({ status, processingTime }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connecting':
        return {
          icon: Clock,
          text: 'Connecting to server...',
          className: 'text-amber-600 bg-amber-50 border-amber-200'
        };
      case 'connected':
        return {
          icon: Wifi,
          text: 'Connected to server',
          className: 'text-emerald-600 bg-emerald-50 border-emerald-200'
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Connection lost',
          className: 'text-rose-600 bg-rose-50 border-rose-200'
        };
      case 'sending':
        return {
          icon: Clock,
          text: 'Sending message...',
          className: 'text-purple-600 bg-purple-50 border-purple-200'
        };
      case 'received':
        return {
          icon: CheckCircle,
          text: `Response received ${processingTime ? `(${processingTime}ms)` : ''}`,
          className: 'text-emerald-600 bg-emerald-50 border-emerald-200'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium ${config.className}`}>
      <Icon className="w-4 h-4" />
      <span>{config.text}</span>
    </div>
  );
}