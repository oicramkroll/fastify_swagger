import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { makeListUsersUseCase } from '../../application/factories/make-list-users-use-case';

export async function listUsersController(app: FastifyInstance) {
  app.get(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Lista todos os usuários',
        response: {
          200: {
            description: 'Lista de usuários',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
    },
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const listUsers = makeListUsersUseCase();

      const { users } = await listUsers.execute();

      return reply.status(200).send(users);
    },
  );
}
