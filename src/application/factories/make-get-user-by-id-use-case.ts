import { userRepositoryInstance } from '../../infra/repositories/user-repository-singleton';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id-use-case';

export function makeGetUserByIdUseCase() {
  return new GetUserByIdUseCase(userRepositoryInstance);
}
