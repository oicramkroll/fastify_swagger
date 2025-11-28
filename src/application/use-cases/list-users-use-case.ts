import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user-repository';

export interface ListUsersOutput {
  users: User[];
}

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ListUsersOutput> {
    const users = await this.userRepository.findAll();

    return { users };
  }
}
