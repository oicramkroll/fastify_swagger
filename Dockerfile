# ============================
# 1) Etapa de build (TypeScript -> JavaScript)
# ============================
FROM node:20-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas arquivos de dependências primeiro (para aproveitar cache)
COPY package*.json ./
COPY tsconfig*.json ./

# Instala todas as dependências (dev + prod)
RUN npm ci

# Copia o restante do código
COPY . .

# Build do TypeScript
RUN npm run build


# ============================
# 2) Etapa de runtime (somente o necessário pra rodar)
# ============================
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Copia somente package*.json para instalar apenas dependências de produção
COPY package*.json ./

# Instala só dependências de produção
RUN npm ci --omit=dev

# Copia o build gerado na etapa anterior
COPY --from=builder /app/dist ./dist

# Se você tiver uma pasta de assets estáticos, swagger ou afins, copie aqui também:
# COPY --from=builder /app/public ./public

# Porta exposta de acordo com o server.ts da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/server.js"]
