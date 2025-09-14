import React from 'react';
import { Check, CheckCheck, Clock, AlertCircle } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export function MessageBubble({ message, isTyping = false }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  
  const getStatusIcon = () => {
    if (!isUser) return null;
    
    switch (message.status) {
      case 'sending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center mb-1">
            <img
              src="https://images.pexels.com/photos/1476900/pexels-photo-1476900.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face"
              alt="Bot"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-xs text-gray-500 font-medium">ChatBot</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 ml-4 shadow-sm border border-purple-100'
              : 'bg-white text-gray-900 mr-4 border border-gray-200'
          } ${message.status === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : ''}`}
        >
          {isTyping ? (
            <div className="flex space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>
        <div className={`flex items-center mt-1 text-xs text-gray-400 ${isUser ? 'justify-end mr-4' : 'justify-start ml-4'}`}>
          <span className="mr-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
}