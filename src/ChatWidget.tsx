
import React, { useRef } from 'react';
import { MessageBubble } from './components/MessageBubble';
import { MessageInput } from './components/MessageInput';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Message } from './types/chat';

interface ChatWidgetProps {
  messages: Message[];
  typingMessage: Message | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected' | 'sending' | 'received';
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
  onClose: () => void;
  onClearSession?: () => void;
  showMinimize?: boolean;
  sessionTimer?: string;
}

export function ChatWidget({
  messages,
  typingMessage,
  connectionStatus,
  isLoading,
  onSendMessage,
  onClose,
  onClearSession,
  showMinimize,
  sessionTimer
}: ChatWidgetProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col" style={{height: '70vh'}}>
      <div className="flex justify-between items-center border-b px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-2xl">
        <div className="flex flex-col">
          <div className="font-bold text-purple-700 text-lg">ChatBot Assistant</div>
          {sessionTimer && (
            <div className="text-xs text-purple-600">Session: {sessionTimer}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onClearSession && (
            <button 
              onClick={onClearSession} 
              className="text-xs px-2 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded transition"
              title="Clear Session"
            >
              Clear
            </button>
          )}
          {showMinimize && (
            <button onClick={onClose} className="text-purple-600 hover:text-pink-600 font-bold text-xl">–</button>
          )}
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm px-4 py-2 border-b border-purple-100">
        <ConnectionStatus status={connectionStatus} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {typingMessage && <MessageBubble message={typingMessage} isTyping={true} />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} disabled={connectionStatus === 'disconnected'} />
    </div>
  );
}
