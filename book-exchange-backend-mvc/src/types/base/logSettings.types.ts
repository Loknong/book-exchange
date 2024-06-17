export interface LogSetting {
    id: number;
    section: string;
    enabled: boolean;
    level: string;
  }
  
  export interface CreateLogSettingRequest {
    section: string;
    enabled: boolean;
    level: string;
  }
  
  export interface UpdateLogSettingRequest {
    section?: string;
    enabled?: boolean;
    level?: string;
  }
  
  export interface LogSettingResponse {
    id: number;
    section: string;
    enabled: boolean;
    level: string;
  }
  