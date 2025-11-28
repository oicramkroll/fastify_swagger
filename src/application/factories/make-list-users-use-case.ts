import { userRepositoryInstance } from "../../infra/repositories/user-repository-singleton";
import { ListUsersUseCase } from "../use-cases/list-users-use-case";

export function makeListUsersUseCase() {
  return new ListUsersUseCase(userRepositoryInstance);
}
