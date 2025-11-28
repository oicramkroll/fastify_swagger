import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user-repository';

export interface GetUserByIdInput {
  id: string;
}

export interface GetUserByIdOutput {
  user: User | null;
}

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserByIdInput): Promise<GetUserByIdOutput> {
    const user = await this.userRepository.findById(input.id);
    return { user };
  }
}
