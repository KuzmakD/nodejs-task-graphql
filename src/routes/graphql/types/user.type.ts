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
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      async resolve(src, _, context) {
        return context.loaders.profileByUserId.load(src.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(src, _, context) {
        return context.loaders.postsByAuthor.load(src.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (src, __, context) => {
        const usersSubTo = src.userSubscribedTo || [];
        const results = await context.loaders.userById.loadMany(
          usersSubTo.map((userSubTo) => userSubTo.authorId),
        );

        return results;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (src, __, context) => {
        const subsToUser = src.subscribedToUser || [];
        const results = await context.loaders.userById.loadMany(
          subsToUser.map((subToUser) => subToUser.subscriberId),
        );

        return results;
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
