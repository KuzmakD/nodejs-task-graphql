import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
  MemberTypeQueries,
  PostQueries,
  ProfileQueries,
  userQueries,
} from './queries.js';
import {
  PostMutations,
  ProfileMutations,
  SubscribeMutations,
  UserMutations,
} from './mutations.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...MemberTypeQueries,
      ...PostQueries,
      ...ProfileQueries,
      ...userQueries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...PostMutations,
      ...ProfileMutations,
      ...UserMutations,
      ...SubscribeMutations,
    },
  }),
});
