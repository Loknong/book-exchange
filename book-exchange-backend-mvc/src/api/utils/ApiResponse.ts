// ResponseHandler.ts
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T;
  error?: string;
}

// export class ResponseHandler<T> {
//   private response: ApiResponse<T>;

//   constructor(status: 'success' | 'error', message: string, data?: T, error?: string) {
//     this.response = { status, message, data, error };
//   }

//   public getResponse(): ApiResponse<T> {

//     return {...this.response};
//   }
// }
export class ResponseHandler<T> {
  constructor(
    public status: "success" | "error",
    public message: string,
    public data?: T,
    public error?: string
  ) {}

  public getResponse(): ApiResponse<T> {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
      error: this.error,
    };
  }
}
