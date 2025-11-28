import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetUserByIdUseCase } from "../../application/factories/make-get-user-by-id-use-case";

export async function getUserByIdController(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  app.get(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Busca um usuário pelo ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
          required: ["id"],
        },
        response: {
          200: {
            description: "Usuário encontrado",
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", nullable: true },
            },
          },
          404: {
            description: "Usuário não encontrado",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = paramsSchema.parse(request.params);

      const getUserById = makeGetUserByIdUseCase();
      const { user } = await getUserById.execute({ id });

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      return reply.status(200).send(user);
    },
  );
}
