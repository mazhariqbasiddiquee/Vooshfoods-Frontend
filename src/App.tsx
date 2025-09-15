import  { useState, useEffect } from 'react';
import { ChatWidget } from './ChatWidget';
import { FloatingChatButton } from './FloatingChatButton';

import { Message } from './types/chat';
import { clearUserSession, fetchAlldocuments, sendQuery } from './http/actios';

const DUMMY_NEWS_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=entropy&auto=format';


function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const conversationGroups = JSON.parse(localStorage.getItem('conversationGroups') || '[]');
    const storedExpiry = localStorage.getItem('sessionExpiry');
    
    if (conversationGroups.length > 0 && storedExpiry && new Date() < new Date(storedExpiry)) {
      const restoredMessages: Message[] = [{
        id: 'welcome',
        content: `Hello! I'm your AI assistant. How can I help you today?`,
        type: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      }];
      
      conversationGroups.forEach((group: any, index: number) => {
        restoredMessages.push({
          id: `user-${index}`,
          content: group.user,
          type: 'user',
          timestamp: new Date(group.id),
          status: 'delivered'
        });
        restoredMessages.push({
          id: `bot-${index}`,
          content: group.bot,
          type: 'bot',
          timestamp: new Date(group.id),
          status: 'delivered'
        });
      });
      
      return restoredMessages;
    }
    
    return [{
      id: 'welcome',
      content: `Hello! I'm your AI assistant. How can I help you today?`,
      type: 'bot',
      timestamp: new Date(),
      status: 'delivered'
    }];
  });

  useEffect(() => {
    const storedExpiry = localStorage.getItem('sessionExpiry');
    
    // Only clear if session has actually expired
    if (storedExpiry && new Date() > new Date(storedExpiry)) {
      localStorage.removeItem('conversationGroups');
      localStorage.removeItem('sessionExpiry');
      setSessionExpiry(null);
    }
  }, []);

  const saveConversationGroup = (userMsg: Message, botMsg: Message) => {
    const conversationGroups = JSON.parse(localStorage.getItem('conversationGroups') || '[]');
    const newGroup = {
      id: botMsg.timestamp,
      user: userMsg.content,
      bot: botMsg.content
    };
    conversationGroups.push(newGroup);
    localStorage.setItem('conversationGroups', JSON.stringify(conversationGroups));
  };
  const [newsData, setNewsData] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected' | 'sending' | 'received'>('connected');
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<string | null>(() => {
    const storedExpiry = localStorage.getItem('sessionExpiry');
    
    if (storedExpiry && new Date() < new Date(storedExpiry)) {
      return storedExpiry;
    }
    
    return null;
  });
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const handleClearSession = async () => {
    try {
      await clearUserSession();
    } catch (error) {
      console.error('Error clearing session:', error);
    } finally {
      // Clear frontend data regardless of backend response
      localStorage.removeItem('conversationGroups');
      localStorage.removeItem('sessionExpiry');
      setSessionExpiry(null);
      setTimeRemaining('');
      setMessages([{
        id: 'welcome',
        content: `Hello! I'm your AI assistant. How can I help you today?`,
        type: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      }]);
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      type: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setConnectionStatus('sending');
    try {
      const sentMessage = { ...userMessage, status: 'sent' as const };
      const messagesWithSent = updatedMessages.map(msg =>
        msg.id === userMessage.id ? sentMessage : msg
      );
      setMessages(messagesWithSent);
      const typingMsg: Message = {
        id: 'typing',
        content: '',
        type: 'bot',
        timestamp: new Date()
      };
      setTypingMessage(typingMsg);
      const conversationGroups = JSON.parse(localStorage.getItem('conversationGroups') || '[]');
      const last10Conversations = conversationGroups.slice(-10);
      let payload={
        query: messageContent,
        history: last10Conversations
      }
      
      const response = await sendQuery(payload);
      
      if (response.expiresAt) {
        const expiryTime = new Date(response.expiresAt);
        const now = new Date();
        
        // Only set expiry if it's in the future
        if (expiryTime > now) {
          localStorage.setItem('sessionExpiry', response.expiresAt);
          setSessionExpiry(response.expiresAt);
        }
      }
      
      setConnectionStatus('received');
      setTypingMessage(null);
      const deliveredMessage = { ...sentMessage, status: 'delivered' as const };
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        type: 'bot',
        timestamp: response.timestamp,
        status: 'delivered'
      };
      const finalMessages = messagesWithSent.map(msg =>
        msg.id === userMessage.id ? deliveredMessage : msg
      ).concat([botMessage]);
      setMessages(finalMessages);
      saveConversationGroup(deliveredMessage, botMessage);
    } catch (error) {
      setConnectionStatus('disconnected');
      setTypingMessage(null);
      const errorMessage = { ...userMessage, status: 'error' as const };
      const messagesWithError = updatedMessages.map(msg =>
        msg.id === userMessage.id ? errorMessage : msg
      );
      setMessages(messagesWithError);
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        type: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      };
      const finalErrorMessages = [...messagesWithError, errorBotMessage];
      setMessages(finalErrorMessages);
      saveConversationGroup(errorMessage, errorBotMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setConnectionStatus('connected');
      }, 3000);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlldocuments();
        console.log("Fetched documents:", data);
        const formattedNews = data?.data?.map((item: any) => {
          const metadata = JSON.parse(item.metadata.category);
          
          return {
            id: item.id,
            title: metadata.title,
            image: DUMMY_NEWS_IMAGE,
            details: item.metadata.chunk_text

          };
        });
        setNewsData(formattedNews);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!sessionExpiry) {
      setTimeRemaining('');
      return;
    }
    
    const updateTimer = () => {
      const now = new Date();
      const expiry = new Date(sessionExpiry);
      const diff = expiry.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Session expired');
        return false;
      }
      
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      return true;
    };
    
    // Update immediately
    if (!updateTimer()) return;
    
    const timer = setInterval(() => {
      if (!updateTimer()) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [sessionExpiry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col relative">
      {/* News Section - Modern White Grid Layout */}
      <div className="w-full flex justify-center py-8 bg-white border-b border-gray-100">
        <div className="w-full max-w-7xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide underline decoration-purple-200">Today's Headlines</h1>
          {newsLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map(news => (
              <div key={news.id} className="flex flex-col bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-lg font-bold text-purple-700 mb-1 line-clamp-2">{news.title}</div>
                    <div className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-3">
                      {news.details}
                    </div>
                  </div>
                  <button
                    className="mt-2 self-start px-4 py-1 rounded bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 transition"
                    onClick={() => setSelectedNews(news)}
                  >
                    View
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
        {/* News Modal */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
              <button
                className="absolute top-3 right-4 text-2xl text-purple-400 hover:text-purple-700 font-bold z-10"
                onClick={() => setSelectedNews(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="overflow-y-auto max-h-[90vh] p-8">
                <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-56 object-cover rounded-xl mb-4" />
                <div className="text-2xl font-bold text-purple-700 mb-2">{selectedNews.title}</div>
                <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{selectedNews.details}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Button and Widget - always bottom right, always available */}
      {!isChatOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <FloatingChatButton onClick={() => setIsChatOpen(true)} />
        </div>
      )}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <ChatWidget
            messages={messages}
            typingMessage={typingMessage}
            connectionStatus={connectionStatus}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onClose={() => setIsChatOpen(false)}
            onClearSession={handleClearSession}
            showMinimize
            sessionTimer={timeRemaining}
          />
        </div>
      )}
    </div>
  );
}

export default App;