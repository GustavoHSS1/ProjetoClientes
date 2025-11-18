import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController.js";
import { ListCustomersController } from "./controllers/ListCustomersController.js";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController.js";
import prismaClient from "./database/index.js";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/customer", async (request, reply) => {
    const customers = await prismaClient.customer.findMany();
    return customers;
});
 

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })

    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply)
    })

    fastify.delete("/customer/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })

}