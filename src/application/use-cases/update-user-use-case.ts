import { User } from '../../domain/entities/user';
import {
  UpdateUserData,
  UserRepository,
} from '../../domain/repositories/user-repository';

export interface UpdateUserInput {
  id: string;
  data: UpdateUserData;
}

export interface UpdateUserOutput {
  user: User | null;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const { id, data } = input;

    const updatedUser = await this.userRepository.update(id, data);

    return { user: updatedUser };
  }
}
