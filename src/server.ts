import dotenv from 'dotenv';
import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import authPlugin from './plugins/auth';
import taskRoutes from './tasks/tasks.routess';

dotenv.config();

const fastify = Fastify({
  logger: true
});

async function startApp() {
  try {
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: 'Task API Demo',
          description: 'JWT-protected task management API built with Fastify',
          version: '1.0.0'
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      }
    });

    await fastify.register(swaggerUi, {
      routePrefix: '/documentation'
    });

    await fastify.register(authPlugin);

    fastify.get(
      '/',
      {
        schema: {
          tags: ['Health'],
          summary: 'Check API status',
          response: {
            200: {
              type: 'object',
              properties: {
                status: { type: 'string' }
              }
            }
          }
        }
      },
      async () => {
        return { status: 'Task Agent API is Online' };
      }
    );

    await fastify.register(taskRoutes, { prefix: '/tasks' });

    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port });
    console.log(`🚀 Server ready at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startApp();
