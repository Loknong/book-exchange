// import {PrismaClient} from '@prisma/client'
// import {CreateAuthRequest, UpdateAuthRequest, AuthResponse} from '../types'

// export const createAuth = async (prisma: PrismaClient, data: CreateAuthRequest): Promise<AuthResponse> => {
//     const auth = await prisma.auth.create({ data });
//     return auth;
//   };
  
//   export const getAuthById = async (prisma: PrismaClient, id: number): Promise<AuthResponse | null> => {
//     const auth = await prisma.auth.findUnique({ where: { id } });
//     return auth;
//   };
  
//   export const updateAuth = async (prisma: PrismaClient, id: number, data: UpdateAuthRequest): Promise<AuthResponse> => {
//     const auth = await prisma.auth.update({ where: { id }, data });
//     return auth;
//   };
  
//   export const deleteAuth = async (prisma: PrismaClient, id: number): Promise<AuthResponse> => {
//     const auth = await prisma.auth.delete({ where: { id } });
//     return auth;
//   };
  