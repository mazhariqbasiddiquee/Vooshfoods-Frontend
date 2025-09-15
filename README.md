# Vooshfoods Frontend

A modern React-TypeScript application featuring an AI-powered chatbot and news display system. Built with Vite, Tailwind CSS, and Axios for seamless user interaction and real-time communication.

## Features

### 🤖 AI Chat Assistant
- Real-time chat interface with typing indicators
- Session management with automatic expiry
- Conversation history (last 10 conversations)
- Message status tracking (sending → sent → delivered)
- Error handling with retry functionality
- Session ID monitoring for all requests

### 📰 News Display
- Responsive news grid layout
- Modal view for detailed news articles
- Loading states with smooth animations
- Dynamic content fetching from backend API

### 🔧 Technical Features
- TypeScript for type safety
- Axios interceptors for request/response monitoring
- Custom loading hook for global state management
- LocalStorage persistence for sessions and conversations
- Real-time session countdown timer
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite
- **Linting**: ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatHeader.tsx
│   ├── ConnectionStatus.tsx
│   ├── MessageBubble.tsx
│   ├── MessageInput.tsx
│   └── UserSetup.tsx
├── hooks/              # Custom React hooks
│   └── useLoading.ts   # Global loading state management
├── http/               # API configuration and actions
│   ├── index.ts        # Axios instance with interceptors
│   └── actios.ts       # API action functions
├── services/           # Business logic services
│   ├── apiService.ts   # Mock API service
│   └── sessionService.ts # Session management
├── types/              # TypeScript type definitions
│   └── chat.ts         # Chat-related interfaces
├── App.tsx             # Main application component
├── ChatWidget.tsx      # Chat interface component
└── FloatingChatButton.tsx # Chat toggle button
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Vooshfoods-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## API Configuration

The application connects to a backend API at:
```
https://vooshfoods-backend-qh78.onrender.com/
```

### Available Endpoints
- `POST /search/query` - Send chat messages
- `GET /search/all-documents` - Fetch news articles
- `POST /search/clear-session` - Clear user session

## Key Features Implementation

### Session Management
- Automatic session expiry with countdown timer
- Session ID validation on every request/response
- LocalStorage persistence for offline capability
- Graceful session cleanup

### Chat System
- Message status progression: sending → sent → delivered
- Conversation history with 10-message limit
- Typing indicators and loading states
- Error handling with user feedback

### Loading States
- Global loading management via custom hook
- Request/response interceptors for automatic loading
- News fetching with dedicated loading spinner
- Chat message loading indicators

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive grid layouts (1/2/3 columns)
- Modal overlays with proper z-indexing
- Smooth animations and transitions

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Browser Support

Modern browsers supporting ES2020+ features:
- Chrome 80+
- Firefox 72+
- Safari 13.1+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

Private project - All rights reserved