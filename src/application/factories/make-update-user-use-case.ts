import { userRepositoryInstance } from "../../infra/repositories/user-repository-singleton";
import { UpdateUserUseCase } from "../use-cases/update-user-use-case";

export function makeUpdateUserUseCase() {
  return new UpdateUserUseCase(userRepositoryInstance);
}
