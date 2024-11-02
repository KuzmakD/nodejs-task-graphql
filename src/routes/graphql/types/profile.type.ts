import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { IContext } from '../types.js';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeIdGql } from './member.type.js';
import { Profile } from '@prisma/client';
import { UserType } from './user.type.js';

export const ProfileType: GraphQLObjectType<Profile, IContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLString },
    user: {
      type: UserType,
      async resolve(src, _, context) {
        return context.prisma.user.findUnique({ where: { id: src.userId } });
      },
    },
    memberType: {
      type: MemberType,
      resolve: async (src, _, context) => {
        return context.prisma.memberType.findUnique({
          where: { id: src.memberTypeId },
        });
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
