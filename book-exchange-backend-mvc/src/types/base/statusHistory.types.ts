export interface StatusHistory {
    id: number;
    referenceTable: ReferenceTable;
    referenceId: number;
    status: string;
    createdAt: Date;
  }
  
  export interface CreateStatusHistoryRequest {
    referenceTable: ReferenceTable;
    referenceId: number;
    status: string;
  }
  
  export interface UpdateStatusHistoryRequest {
    referenceTable?: ReferenceTable;
    referenceId?: number;
    status?: string;
  }
  
  export interface StatusHistoryResponse {
    id: number;
    referenceTable: ReferenceTable;
    referenceId: number;
    status: string;
    createdAt: Date;
  }
  
  export enum ReferenceTable {
    OFFERS = 'OFFERS',
    TRANSACTIONS = 'TRANSACTIONS',
    USER_TRANSACTION_STATUS = 'USER_TRANSACTION_STATUS',
    PAYMENTS = 'PAYMENTS',
    ADMIN_MANAGEMENT = 'ADMIN_MANAGEMENT'
  }
  