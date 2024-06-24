import { AdminStatus } from "@prisma/client";

export interface AdminManagement {
  id: number;
  transactionId: number;
  status: AdminStatus;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAdminManagementRequest {
  transactionId: number;
  status: AdminStatus;
  details?: string;
}

export interface UpdateAdminManagementRequest {
  transactionId?: number;
  status?: AdminStatus;
  details?: string;
}

export interface AdminManagementResponse {
  id: number;
  transactionId: number;
  status: AdminStatus;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}
