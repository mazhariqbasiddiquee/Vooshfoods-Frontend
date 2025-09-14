class SessionService {
  private readonly SESSION_KEY = 'chatbot_session_key';

  getSessionKey(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  saveSessionKey(key: string): void {
    localStorage.setItem(this.SESSION_KEY, key);
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}

export const sessionService = new SessionService();