interface ApiResponse {
  message: string;
  status: 'success' | 'error';
  timestamp: Date;
  processingTime: number;
}

class ApiService {
  private readonly API_DELAY = 1500; // Simulate network delay
  private readonly BOT_RESPONSES = [
    "I understand your question. Let me help you with that.",
    "That's an interesting point. Here's what I think about it:",
    "Based on the information you've provided, I can suggest:",
    "I see what you're asking. The answer depends on several factors:",
    "Thank you for your question. Here's my response:",
    "That's a great question! Let me break it down for you:",
    "I'd be happy to help you with that. Here's what I recommend:",
    "Interesting! Here's my take on your question:"
  ];

  async sendMessage(message: string,): Promise<ApiResponse> {
    // Simulate API call with realistic delay
    await this.delay(this.API_DELAY);

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Network error - please try again');
    }

    const startTime = Date.now();
    
    // Generate contextual response
    const response = this.generateResponse(message);
    
    const processingTime = Date.now() - startTime + this.API_DELAY;

    return {
      message: response,
      status: 'success',
      timestamp: new Date(),
      processingTime
    };
  }

  private generateResponse(userMessage: string): string {
    const baseResponse = this.BOT_RESPONSES[Math.floor(Math.random() * this.BOT_RESPONSES.length)];
    
    // Add some context-aware responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! Welcome to our chatbot. How can I assist you today?";
    }
    
    if (lowerMessage.includes('help')) {
      return "I'm here to help! You can ask me questions about various topics, and I'll do my best to provide useful information.";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! Feel free to return anytime if you have more questions.";
    }
    
    // Generate a longer, more detailed response
    const elaborations = [
      "This involves several key considerations that are worth exploring.",
      "Let me provide you with some additional context to help clarify this.",
      "There are multiple approaches to this, each with their own benefits.",
      "I've processed your request and found some relevant information.",
      "This is a common question, and here's what typically works best."
    ];
    
    const elaboration = elaborations[Math.floor(Math.random() * elaborations.length)];
    return `${baseResponse} ${elaboration}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();