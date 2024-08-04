// ResponseHandler.ts
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export class ResponseHandler<T> {
  private response: ApiResponse<T>;

  constructor(status: 'success' | 'error', message: string, data?: T, error?: string) {
    this.response = { status, message, data, error };
  }

  public getResponse(): ApiResponse<T> {
    return this.response;
  }
}
