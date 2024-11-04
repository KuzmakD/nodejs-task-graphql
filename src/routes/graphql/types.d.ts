import { PrismaClient } from '@prisma/client';
import { UUID } from 'node:crypto';
import { MemberTypeId } from '../member-types/schemas.ts';
import { dataLoaders } from './loaders.ts';

export interface IMember {
  id: `${MemberTypeId}`;
  discount: number;
  postLimitPerMonth: number;
}

export interface IContext {
  prisma: PrismaClient;
  loaders: ReturnType<typeof dataLoaders>;
}

export interface IPost {
  id: UUID;
  title: string;
  content: string;
  authorId: UUID;
}

export interface IProfile {
  id: UUID;
  isMale: boolean;
  yearOfBirth: number;
  userId: UUID;
  memberTypeId: UUID;
}

export interface ISubscribe {
  subscriberId: UUID;
  authorId: UUID;
}

export interface ISubscribeUpdate {
  userId: UUID;
  authorId: UUID;
}

export interface IUser {
  id: UUID;
  name: string;
  balance: number;
  userSubscribedTo?: ISubscribe[];
  subscribedToUser?: ISubscribe[];
}

export interface IUserFields {
  name: string;
  balance: number;
}
