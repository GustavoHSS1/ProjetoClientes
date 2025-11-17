import Fastify from 'fastify';
import { routes } from './routes.js';
import cors from '@fastify/cors';

const app = Fastify({ logger: true })

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
