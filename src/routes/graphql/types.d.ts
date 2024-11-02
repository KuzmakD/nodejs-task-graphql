import { PrismaClient } from '@prisma/client';

export interface IMember {
  id: string;
  discount: number;
  postLimitPerMonth: number;
}

export interface IContext {
  prisma: PrismaClient;
}
