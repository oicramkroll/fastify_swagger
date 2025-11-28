import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeUpdateUserUseCase } from "../../application/factories/make-update-user-use-case";

export async function updateUserController(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = z
    .object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
    })
    .refine((data) => data.name || data.email, {
      message: "É necessário informar ao menos um campo para atualização.",
    });

  app.put(
    "/users/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Atualiza um usuário pelo ID",
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Usuário atualizado",
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
      const body = bodySchema.parse(request.body);

      const updateUser = makeUpdateUserUseCase();
      const { user } = await updateUser.execute({ id, data: body });

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      return reply.status(200).send(user);
    },
  );
}
