import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { IContext, IProfile } from '../types.js';
import { UUIDType } from './uuid.js';
import { MemberTypeIdGql } from './member.type.js';

export const ProfileType: GraphQLObjectType<IProfile, IContext> = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: GraphQLString },
  },
});

export const CreateProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(UUIDType) },
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
