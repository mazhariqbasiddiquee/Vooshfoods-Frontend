import React from 'react';
import { MessageSquare, Settings, MoreVertical } from 'lucide-react';
import { User } from '../types/chat';

interface ChatHeaderProps {
  user: User;
  onClearSession: () => void;
}

export function ChatHeader({ user, onClearSession }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-t-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/60 p-2 rounded-lg backdrop-blur-sm border border-purple-100">
            <MessageSquare className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-purple-700">ChatBot Assistant</h1>
            <p className="text-xs text-purple-400">Hello, {user.name}! How can I help you today?</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onClearSession}
            className="p-2 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
            title="Clear session"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}