export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'error';
}

export interface Session {
  id: string;
  userId: string;
  messages: Message[];
  createdAt: Date;
  lastActivity: Date;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}