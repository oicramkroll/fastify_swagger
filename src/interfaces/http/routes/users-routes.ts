import { FastifyInstance } from 'fastify';

import { createUserController } from '../create-user-controller';
import { listUsersController } from '../list-users-controller';
import { getUserByIdController } from '../get-user-by-id-controller';
import { updateUserController } from '../update-user-controller';
import { deleteUserController } from '../delete-user-controller';

export async function usersRoutes(app: FastifyInstance) {
  await app.register(createUserController);
  await app.register(listUsersController);
  await app.register(getUserByIdController);
  await app.register(updateUserController);
  await app.register(deleteUserController);
}
