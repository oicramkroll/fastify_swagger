import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { usersRoutes } from "./interfaces/http/routes/users-routes";

async function buildServer() {
  const app = Fastify({
    logger: true,
  });

  // Swagger config
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Users API",
        version: "1.0.0",
      },
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  // Register controllers
  app.register(usersRoutes);

  // Health check
  app.get("/health", async () => {
    return { status: "ok" };
  });

  // redirecionar root para /docs faz com que o swagger seja a página inicial
  app.get('/', async (request, reply) => {
    return reply.redirect('/docs')
  });


  return app;
}

// Start server only if this file is run directly
if (require.main === module) {
  buildServer()
    .then((app) => {
      const PORT = Number(process.env.PORT) || 3000;

      app.listen(
        {
          port: PORT,
          host: "0.0.0.0",
        },
        (err, address) => {
          if (err) {
            app.log.error(err);
            process.exit(1);
          }
          app.log.info(`Server running at ${address}`);
        },
      );
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { buildServer };
