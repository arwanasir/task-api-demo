import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TaskService } from './tasks.services';
import { CreateTaskBody } from './tasks.types';

const taskSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    userId: { type: 'string' }
  },
  required: ['id', 'title', 'userId']
} as const;

export default async function taskRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'List tasks for the authenticated user',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            type: 'array',
            items: taskSchema
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const userId = request.user.id;
      return TaskService.getAll(userId);
    }
  );

  fastify.post<{ Body: CreateTaskBody }>(
    '/',
    {
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'Create a task for the authenticated user',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' }
          }
        },
        response: {
          201: taskSchema,
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' }
            }
          }
        }
      }
    },
    async (request, reply: FastifyReply) => {
      const userId = request.user.id;
      const title = request.body.title.trim();

      if (!title) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'Title is required'
        });
      }

      const task = TaskService.create(title, userId);
      return reply.code(201).send(task);
    }
  );

  // I am leaving the DELETE route for the AI Agent to generate
  // during the live presentation to demonstrate its "Agentic Skills."
}
