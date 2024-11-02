import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { MemberType, MemberTypeIdGql } from './types/member.type.js';
import { UserType } from './types/user.type.js';
import { UUIDType } from './types/uuid.js';
import { IContext } from './types.js';
import { type UUID } from 'node:crypto';
import { ProfileType } from './types/profile.type.js';
import { PostType } from './types/post.type.js';

export const MemberTypeQueries = {
  memberType: {
    type: MemberType,
    args: { id: { type: MemberTypeIdGql } },
    async resolve(_, { id }, context) {
      return context.prisma.memberType.findUnique({ where: { id } });
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    async resolve(_, __, context) {
      return context.prisma.memberType.findMany();
    },
  },
} satisfies {
  memberType: GraphQLFieldConfig<void, IContext, { id: UUID }>;
  memberTypes: GraphQLFieldConfig<void, IContext>;
};

export const userQueries = {
  user: {
    type: UserType,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      return context.prisma.user.findUnique({ where: { id } });
    },
  },
  users: {
    type: new GraphQLList(UserType),
    async resolve(_, __, context) {
      return context.prisma.user.findMany();
    },
  },
} satisfies {
  user: GraphQLFieldConfig<void, IContext, { id: UUID }>;
  users: GraphQLFieldConfig<void, IContext>;
};

export const ProfileQueries = {
  profile: {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      return context.prisma.profile.findUnique({ where: { id } });
    },
  },
  profiles: {
    type: new GraphQLList(ProfileType),
    async resolve(_, __, context) {
      return context.prisma.profile.findMany();
    },
  },
} satisfies {
  profile: GraphQLFieldConfig<void, IContext, { id: UUID }>;
  profiles: GraphQLFieldConfig<void, IContext>;
};

export const PostQueries = {
  post: {
    type: PostType,
    args: { id: { type: UUIDType } },
    async resolve(_, { id }, context) {
      return context.prisma.post.findUnique({ where: { id } });
    },
  },
  posts: {
    type: new GraphQLList(PostType),
    async resolve(_, __, context) {
      return context.prisma.post.findMany();
    },
  },
} satisfies {
  post: GraphQLFieldConfig<void, IContext, { id: UUID }>;
  posts: GraphQLFieldConfig<void, IContext>;
};
