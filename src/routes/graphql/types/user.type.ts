import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { IContext, IUser } from '../types.js';
import { ProfileType } from './profile.type.js';
import { PostType } from './post.type.js';

export const UserType: GraphQLObjectType<IUser, IContext> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      async resolve(src, _, context) {
        return context.prisma.profile.findUnique({ where: { userId: src.id } });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(src, _, context) {
        return context.prisma.post.findMany({ where: { authorId: src.id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (src, __, context) => {
        const results = await context.prisma.subscribersOnAuthors.findMany({
          where: {
            subscriberId: src.id,
          },
          select: {
            author: true,
          },
        });
        return results.map((result) => result.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (src, __, context) => {
        const results = await context.prisma.subscribersOnAuthors.findMany({
          where: {
            authorId: src.id,
          },
          select: {
            subscriber: true,
          },
        });
        return results.map((result) => result.subscriber);
      },
    },
  }),
});

export const CreateUserInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const ChangeUserInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
