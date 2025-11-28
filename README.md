# 🚀 API de Usuários — Fastify + TypeScript + SOLID + Swagger

Este projeto é uma **API completa de gerenciamento de usuários**, construída com **Fastify** e **TypeScript**, aplicando na prática princípios de **Clean Architecture, Domain-Driven Design (DDD) e SOLID**.

Além da arquitetura profissional, o projeto inclui documentação automática com Swagger, testes, Docker, e pipeline de deploy usando Azure DevOps — servindo como um template real de mercado para APIs bem estruturadas.

---

## 🏗️ Tecnologias Utilizadas

* Core da Aplicação
    * Node.js + TypeScript
    * Fastify (servidor web principal)
    * Fastify-TypeProvider + Zod (tipagem e validação)
    * Swagger / OpenAPI 3 (documentação automática)
* Arquitetura & Organização
    * Clean Architecture
    * SOLID
    * Factories
    * Repositorios com Inversão de Dependência
* Qualidade e Padronização
    * Vitest (testes unitários)
    * ESLint + Prettier (linting e formatação)
* Infraestrutura e Deploy
    * Docker + Docker Compose
    * Azure DevOps (CI/CD) — build, testes, release e deploy automatizado

---

## 📐 Arquitetura (Clean Architecture + SOLID)

O projeto segue uma arquitetura profissional baseada em Clean Architecture, com camadas bem definidas e baixo acoplamento.

A estrutura principal:

``` bash
src/
├── domain/                 # Regras de negócio puras (Entidades e Interfaces)
│   ├── entities/           # Modelos e comportamentos do domínio
│   └── repositories/       # Contratos de repositórios (interfaces)
│
├── application/            # Casos de uso (Use Cases)
│   └── factories/          # Factories para orquestrar use cases + dependências
│
├── infra/                  # Implementações concretas
│   └── repositories/       # Repositórios (ex: InMemoryUserRepository)
│
├── interfaces/
│   └── http/               # Controllers, schemas e rotas (Fastify)
│
└── server.ts               # Registro das rotas e inicialização do servidor

```

**✔️ Benefícios dessa abordagem**

* Separação clara de responsabilidades (SRP).
* Dependência sempre de dentro para fora (Dependency Inversion).
* Camadas puras, que facilitam testes e manutenção.
* Repositórios podendo trocar de InMemory para DB real sem alterar use cases.
* Controllers pequenos e sem regra de negócio.
* Fluxo de execução organizado:

``` bash
Rotas → Controllers → Use Cases → Repositórios → Entidades
```

---

## 👤 Endpoints (CRUD de Usuário)

A API expõe um CRUD completo para gerenciamento de usuários.
Todas as rotas possuem:

| Método | Rota         | Descrição                | Status Codes        |
| ------ | ------------ | ------------------------ | ------------------- |
| POST   | `/users`     | Criar um novo usuário    | `201`, `400`        |
| GET    | `/users`     | Listar todos os usuários | `200`               |
| GET    | `/users/:id` | Buscar usuário por ID    | `200`, `404`        |
| PUT    | `/users/:id` | Atualizar usuário        | `200`, `400`, `404` |
| DELETE | `/users/:id` | Remover usuário          | `204`, `404`        |


**🔍 Observações**
* O ID é gerado automaticamente dentro do repositório.
* As validações garantem nome e email válidos.
* A resposta segue o contrato definido nos schemas.

---

## 📘 Documentação (Swagger / OpenAPI 3)

A API possui documentação automática gerada com Fastify-Swagger seguindo o padrão OpenAPI 3.0.

Após iniciar o servidor, acesse:

👉 http://localhost:3000/docs


**🌟 O que o Swagger exibe?**

* Todas as rotas e métodos HTTP
* Schemas de entrada e saída totalmente tipados
* Exemplos automáticos baseados nos schemas do Zod
* Status codes e respostas possíveis
* Descrição de cada campo do payload
* Teste das rotas diretamente na interface (“Try it out”)

**🔧 Como funciona internamente**

* O Swagger é configurado a partir de:
* Schemas definidos nas rotas (Zod + TypeProvider)
* Handlers dos controllers
* Definições de tags e grupos de rotas

A documentação sempre reflete automaticamente o estado atual da API.

---

## 🐳 Docker

Toda a API está preparada para rodar completamente dentro de containers Docker, incluindo build, dependências e execução.

### 🔧 Build & Run

Para criar e rodar a imagem manualmente:

``` bash
docker build -t fastify-api .
docker run -p 3000:3000 fastify-api
```
A porta 3000 será exposta automaticamente.

### ▶️ Usando Docker Compose

Execute tudo com um único comando:

``` bash
docker compose up -d
```
Outros comandos úteis:

```bash
docker compose logs -f       # acompanhar logs
docker compose down          # derrubar containers
docker compose restart       # reiniciar serviços
```

### 📦 O que o Dockerfile faz?

* Instala dependências
* Compila o TypeScript (npm run build)
* Copia apenas arquivos necessários para produção
* Inicia o Fastify usando npm start
* Mantém a imagem pequena e otimizada

### 🧪 Testes com Docker (opcional)
Se quiser rodar testes dentro do container:

``` bash
docker compose exec app npm test
```

---

## ⚙️ Scripts úteis (package.json)

O projeto possui scripts configurados para facilitar o desenvolvimento, testes e build.

### 🛠️ Desenvolvimento
* `npm run dev`

    Inicia o servidor em modo desenvolvimento usando ts-node-dev, com hot reload.
### 🏗️ Build
* `npm run build`

    Compila todos os arquivos TypeScript para JavaScript dentro de `dist/`.
* `npm run start`

    Inicia a versão compilada em produção (roda o `server.js` gerado em `dist/`).

### 🧪 Testes
* `npm run test`

    Executa os testes usando Vitest.
* `npm run test:watch`(opcional)

    Roda testes em modo observação.

### ✨ Qualidade de Código
* `npm run lint`

    Executa o ESLint para verificar problemas de código.
* `npm run format`

    Formata o projeto com Prettier.

---

## ✔️ Testes

O projeto utiliza Vitest para garantir qualidade e confiabilidade do código.
A arquitetura (Clean Architecture + SOLID) torna os testes simples, pois cada camada é isolada e possui uma única responsabilidade.

### 🧪 O que é testado?

* **Entidades (domain/entities)**
    
    Regras de negócio puras (ex: criação do usuário, validações internas).
* **Use Cases (application)**

    Fluxo de criação, listagem, atualização e remoção de usuários.
* **Repositórios (infra)**

    Implementações como o `InMemoryUserRepository`.
* **Controllers (interfaces/http)**

    Testes garantindo status codes e respostas corretas.

### ▶️ Como rodar os testes

``` bash
npm run test
```

### 📊 Rodar testes com coverage

``` bash
npm run test -- --coverage
```

Isso gera um relatório mostrando o quanto do código está coberto por testes.

---
## 🌐 Deploy (Azure DevOps)

O projeto será preparado para deployment completo usando Azure DevOps, com um pipeline CI/CD dividido em duas etapas principais:

### 🧩 1. CI — Integração Contínua
Executado a cada push ou pull request.
Etapas:

1. nstalar dependências (`npm ci`)
2. Rodar testes com Vitest
3. Gerar build da aplicação
4. Criar a imagem Docker
5. Publicar a imagem no Azure Container Registry (ACR)

### 🚀 2. CD — Deploy Contínuo
Após a imagem ser enviada para o ACR, a pipeline de release fará:

1. Baixar a imagem mais recente
2. Realizar o deploy no ambiente configurado (Dev/HML/PRD)
3. Reiniciar containers se necessário
4. Enviar logs e status do deploy

### 🔒 Variáveis e credenciais
A pipeline usará:
* Azure Service Connection
    
    Para autenticar com o ACR e outros serviços.
* Variables / Variable Groups

    Para armazenar:
    * nomes de imagens
    * IDs de registry
    * credenciais secretas (não expostas no repositório)

### 📄 Documentação completa
No final do desenvolvimento, um arquivo específico será criado com o passo a passo completo do pipeline CI/CD.

---

## 🧑‍💻 Autor

Projeto criado por **Marcio Sena**
* 🔗 GitHub: https://github.com/marciosena
* 💼 LinkedIn: https://linkedin.com/in/marciosena
* 📧 Contato para projetos e consultoria: (opcional)

Este repositório faz parte de um estudo prático sobre arquitetura de software, Fastify e Clean Architecture, servindo como um template profissional para APIs modernas e bem estruturadas.
