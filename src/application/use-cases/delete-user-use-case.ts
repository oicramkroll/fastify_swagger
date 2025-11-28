import { UserRepository } from '../../domain/repositories/user-repository';

export interface DeleteUserInput {
  id: string;
}

export interface DeleteUserOutput {
  success: boolean;
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const success = await this.userRepository.delete(input.id);
    return { success };
  }
}
