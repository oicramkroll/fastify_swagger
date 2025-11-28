import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryUserRepository } from "../infra/repositories/in-memory-user-repository";
import { CreateUserUseCase } from "../application/use-cases/create-user-use-case";

describe("CreateUserUseCase", () => {
  let repo: InMemoryUserRepository;
  let createUser: CreateUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    createUser = new CreateUserUseCase(repo);
  });

  it("should create a new user with an id", async () => {
    const output = await createUser.execute({
      name: "Marcio",
      email: "marcio@example.com",
    });

    expect(output).toBeDefined();
    expect(output.user.id).toBeDefined();
    expect(output.user.name).toBe("Marcio");
    expect(output.user.email).toBe("marcio@example.com");
  });

  it("should store the created user inside repository", async () => {
    const result = await createUser.execute({
      name: "User Repo Test",
      email: "repo@example.com",
    });

    const stored = await repo.findById(result.user.id);

    expect(stored).toBeDefined();
    expect(stored?.email).toBe("repo@example.com");
  });
});
