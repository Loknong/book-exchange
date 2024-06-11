export interface Log {
  section: string;
  level: string;
  message: string;
  createdAt: Date;
}

export interface LogSettings {
  settingId: number;
  section: string;
  enabled: boolean;
  level: string;
}
