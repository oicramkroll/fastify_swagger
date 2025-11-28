import { userRepositoryInstance } from "../../infra/repositories/user-repository-singleton";
import { DeleteUserUseCase } from "../use-cases/delete-user-use-case";

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(userRepositoryInstance);
}
