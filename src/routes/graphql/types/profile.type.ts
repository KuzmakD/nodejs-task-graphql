import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { IContext } from '../types.js';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeIdGql } from './member.type.js';
import { Profile } from '@prisma/client';
import { UserType } from './user.type.js';
import { UUID } from 'crypto';

export const ProfileType: GraphQLObjectType<Profile, IContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: UUIDType },
    user: {
      type: UserType,
      async resolve(src, _, ctx) {
        return ctx.loaders.userById.load(src.userId as UUID);
      },
    },
    memberType: {
      type: MemberType,
      resolve: async (src, _, context) => {
        return context.loaders.memberType.load(src.memberTypeId);
      },
    },
  }),
});

export const CreateProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
    userId: { type: UUIDType },
  },
});

export const ChangeProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdGql },
  },
});
