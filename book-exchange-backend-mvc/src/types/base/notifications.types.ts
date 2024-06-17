export interface Notification {
    id: number;
    userId: number;
    message: string;
    createdAt: Date;
  }
  
  export interface CreateNotificationRequest {
    userId: number;
    message: string;
  }
  
  export interface UpdateNotificationRequest {
    userId?: number;
    message?: string;
  }
  
  export interface NotificationResponse {
    id: number;
    userId: number;
    message: string;
    createdAt: Date;
  }
  