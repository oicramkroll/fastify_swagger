import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { makeCreateUserUseCase } from '../../application/factories/make-create-user-use-case';
import { CreateUserUseCase } from '../../application/use-cases/create-user-use-case';

export async function createUserController(app: FastifyInstance) {
  const bodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
  });

  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Cria um novo usuário',
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
          },
          required: ['name', 'email'],
        },
        response: {
          201: {
            description: 'Usuário criado',
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
    async (request, reply) => {
      const { name, email } = bodySchema.parse(request.body);

      const createUser = makeCreateUserUseCase();

      const { user } = await createUser.execute({ name, email });

      return reply.status(201).send(user);
    },
  );
}
