import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TaskService } from './tasks.services';

export default async function taskRoutes(fastify: FastifyInstance) {
  // Get all tasks - Already protected
 fastify.get(

  '/', 
  { onRequest: [fastify.authenticate] }, 
  async (request: FastifyRequest, reply: FastifyReply) => {
    // We can extract the user ID from the JWT payload
    const userId = request.user.id; 
    return TaskService.getAll(userId);
  });
   // I am leaving the DELETE and POST routes for the AI Agent to generate 
  // during the live presentation to demonstrate its "Agentic Skills."
 
}


