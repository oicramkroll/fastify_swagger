import { randomUUID } from "crypto";

import { User } from "../../domain/entities/user";
import {
  CreateUserData,
  UpdateUserData,
  UserRepository,
} from "../../domain/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async create(data: CreateUserData): Promise<User> {
    const now = new Date();

    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      createdAt: now,
      updatedAt: null,
    };

    this.users.set(user.id, user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    return user ?? null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async update(id: string, data: UpdateUserData): Promise<User | null> {
    const existing = this.users.get(id);

    if (!existing) {
      return null;
    }

    const updated: User = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };

    this.users.set(id, updated);

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}
