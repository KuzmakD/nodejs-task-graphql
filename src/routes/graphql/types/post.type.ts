import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import type { IContext, IPost } from '../types.js';

export const PostType: GraphQLObjectType<IPost, IContext> = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export const CreatePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export const ChangePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
