import { GraphQLBoolean, GraphQLFieldConfig } from 'graphql';
import { IContext, IPost, IProfile, ISubscribeUpdate, IUserFields } from './types.js';
import { ChangePostInputType, CreatePostInputType, PostType } from './types/post.type.js';
import { UUIDType } from './types/uuid.js';
import { UUID } from 'node:crypto';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileType,
} from './types/profile.type.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from './types/user.type.js';

export const PostMutations = {
  createPost: {
    type: PostType,
    args: { dto: { type: CreatePostInputType } },
    async resolve(_, { dto }, context) {
      return context.prisma.post.create({ data: dto });
    },
  },
  changePost: {
    type: PostType,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangePostInputType },
    },
    async resolve(_, { id, dto }, context) {
      return context.prisma.post.update({ where: { id }, data: dto });
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      try {
        await context.prisma.post.delete({ where: { id } });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
} satisfies {
  createPost: GraphQLFieldConfig<void, IContext, { dto: IPost }>;
  changePost: GraphQLFieldConfig<void, IContext, { id: UUID; dto: IPost }>;
  deletePost: GraphQLFieldConfig<void, IContext, { id: UUID }>;
};

export const ProfileMutations = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: CreateProfileInputType } },
    async resolve(_, { dto }, context) {
      return context.prisma.profile.create({ data: dto });
    },
  },
  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeProfileInputType },
    },
    async resolve(_, { id, dto }, context) {
      return context.prisma.profile.update({ where: { id }, data: dto });
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      try {
        await context.prisma.profile.delete({ where: { id } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
} satisfies {
  createProfile: GraphQLFieldConfig<void, IContext, { dto: IProfile }>;
  changeProfile: GraphQLFieldConfig<void, IContext, { id: UUID; dto: IProfile }>;
  deleteProfile: GraphQLFieldConfig<void, IContext, { id: UUID }>;
};

export const UserMutations = {
  createUser: {
    type: UserType,
    args: { dto: { type: CreateUserInputType } },
    async resolve(_, { dto }, context) {
      return context.prisma.user.create({ data: dto });
    },
  },
  changeUser: {
    type: UserType,
    args: {
      id: { type: UUIDType },
      dto: { type: ChangeUserInputType },
    },
    async resolve(_, { id, dto }, context) {
      return context.prisma.user.update({ where: { id }, data: dto });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      try {
        await context.prisma.user.delete({ where: { id } });
        return true;
      } catch (err) {
        return false;
      }
    },
  },
} satisfies {
  createUser: GraphQLFieldConfig<void, IContext, { dto: IUserFields }>;
  changeUser: GraphQLFieldConfig<void, IContext, { id: UUID; dto: IUserFields }>;
  deleteUser: GraphQLFieldConfig<void, IContext, { id: UUID }>;
};

export const SubscribeMutations = {
  subscribeTo: {
    type: GraphQLBoolean,
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    async resolve(_, { userId, authorId }, context) {
      try {
        await context.prisma.user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: UUIDType },
      authorId: { type: UUIDType },
    },
    async resolve(_, { userId, authorId }, context) {
      try {
        await context.prisma.subscribersOnAuthors.deleteMany({
          where: {
            subscriberId: userId,
            authorId,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
} satisfies {
  subscribeTo: GraphQLFieldConfig<void, IContext, ISubscribeUpdate>;
  unsubscribeFrom: GraphQLFieldConfig<void, IContext, ISubscribeUpdate>;
};
