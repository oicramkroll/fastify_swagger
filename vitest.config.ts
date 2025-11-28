import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"], // só olha os testes em src
    exclude: ["node_modules/**", "dist/**"], // ignora node_modules e dist
  },
});
