import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController.js";
import prismaClient from "./database/index.js";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/customer", async (request, reply) => {
    const customers = await prismaClient.customer.findMany();
    return customers;
});
 

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })

}