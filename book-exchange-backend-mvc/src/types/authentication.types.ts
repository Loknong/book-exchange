export interface Auth {
    id: number;
    userId: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateAuthRequest {
    userId: number;
    token: string;
  }
  
  export interface UpdateAuthRequest {
    userId?: number;
    token?: string;
  }
  
  export interface AuthResponse {
    id: number;
    userId: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  }
  