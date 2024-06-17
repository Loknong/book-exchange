export interface Log {
    id: number;
    section: string;
    level: string;
    message: string;
    createdAt: Date;
  }
  
  export interface CreateLogRequest {
    section: string;
    level: string;
    message: string;
  }
  
  export interface UpdateLogRequest {
    section?: string;
    level?: string;
    message?: string;
  }
  
  export interface LogResponse {
    id: number;
    section: string;
    level: string;
    message: string;
    createdAt: Date;
  }
  