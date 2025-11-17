import prismaClient from "../database/index.js";

class ListCustomerService {
    async execute() {

        const customers = await prismaClient.customer.findMany() 

        return customers

    }
}

export { ListCustomerService }