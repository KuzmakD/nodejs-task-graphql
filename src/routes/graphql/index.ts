import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { dataLoaders } from './loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const depthGqlErrors = validate(gqlSchema, parse(query), [depthLimit(5)]);
      if (depthGqlErrors.length) {
        return { errors: depthGqlErrors };
      }

      return graphql({
        source: query,
        schema: gqlSchema,
        variableValues: variables,
        contextValue: {
          prisma,
          loaders: dataLoaders(prisma),
        },
      });
    },
  });
};

export default plugin;
