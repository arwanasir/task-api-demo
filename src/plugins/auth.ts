import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fp from 'fastify-plugin';

async function authPlugin(fastify: FastifyInstance) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET must be set before starting the server.');
  }

  await fastify.register(fastifyJwt, {
    secret: jwtSecret
  });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.code(401).send({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }
  });
}

export default fp(authPlugin, {
  name: 'auth-plugin'
});

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string; role?: string };
    user: { id: string; role?: string };
  }
}


declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

