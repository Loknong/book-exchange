export interface ConnectionCheck {
    id: number;
    connectionType: string;
    detail: string;
  }
  
  export interface CreateConnectionCheckRequest {
    connectionType: string;
    detail: string;
  }
  
  export interface UpdateConnectionCheckRequest {
    connectionType?: string;
    detail?: string;
  }
  
  export interface ConnectionCheckResponse {
    id: number;
    connectionType: string;
    detail: string;
  }
  