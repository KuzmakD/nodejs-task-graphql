import { PrismaClient } from '@prisma/client';
// import { UUID } from 'node:crypto';

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

export interface ISubscribe {
  subscriberId: string;
  authorId: string;
}

export interface ISubscribeUpdate {
  userId: string;
  authorId: string;
}

export interface IUser {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: ISubscribe[];
  subscribedToUser?: ISubscribe[];
}

export interface IUserFields {
  name: string;
  balance: number;
}
