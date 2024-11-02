import { PrismaClient } from '@prisma/client';

export interface IMember {
  id: string;
  discount: number;
  postLimitPerMonth: number;
}

export interface IContext {
  prisma: PrismaClient;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
}
