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

export interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface IUser {
  id: string;
  name: string;
  balance: number;
}
