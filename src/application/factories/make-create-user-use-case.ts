import { userRepositoryInstance } from '../../infra/repositories/user-repository-singleton';
import { CreateUserUseCase } from '../use-cases/create-user-use-case';

export function makeCreateUserUseCase() {
  return new CreateUserUseCase(userRepositoryInstance);
}
