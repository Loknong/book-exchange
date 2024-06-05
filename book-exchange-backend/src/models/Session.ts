export interface Session {
    sessionId: number;
    userId: number;
    token: string;
    created_at: Date;
    expires_at: Date;
  }