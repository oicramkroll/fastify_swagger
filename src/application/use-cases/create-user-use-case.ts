import { User } from "../../domain/entities/user";
import { CreateUserData, UserRepository } from "../../domain/repositories/user-repository";

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserOutput {
  user: User;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // colocar regras de negócio,
    // como checar se o email já existe, validações, etc.

    const data: CreateUserData = {
      name: input.name,
      email: input.email,
    };

    const user = await this.userRepository.create(data);

    return { user };
  }
}
