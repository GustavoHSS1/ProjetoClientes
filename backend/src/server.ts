import Fastify from 'fastify';
import { routes } from './routes.js';
import cors from '@fastify/cors';

const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
    const message = error instanceof Error ? error.message : 'erro desconhecido';
    reply.code(400).send({ message })
})

const start = async () => {
  await app.register(cors)
  await app.register(routes);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" })
    console.log("Server rodando em http://localhost:3333")
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start();

// teste pra ver se commita
