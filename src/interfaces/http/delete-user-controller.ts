import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeDeleteUserUseCase } from "../../application/factories/make-delete-user-use-case";

export async function deleteUserController(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  app.delete(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Remove um usuário pelo ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
          required: ["id"],
        },
        response: {
          204: {
            description: "Usuário removido com sucesso",
            type: "null",
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

      const deleteUser = makeDeleteUserUseCase();
      const { success } = await deleteUser.execute({ id });

      if (!success) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      return reply.status(204).send();
    },
  );
}
