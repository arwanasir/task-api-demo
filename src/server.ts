import dotenv from 'dotenv';
import Fastify from 'fastify';
import authPlugin from './plugins/auth';
import taskRoutes from './tasks/tasks.routess';
dotenv.config();
const fastify = Fastify({
  logger: true
});

async function startApp() {
  try {
    await fastify.register(authPlugin);
    await fastify.register(taskRoutes, { prefix: '/tasks' });

    fastify.get('/', async () => {
      return { status: 'Task Agent API is Online' };
    });

    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port });
    console.log(`🚀 Server ready at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startApp();
