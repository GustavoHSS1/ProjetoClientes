import prismaClient from "../database/index.js";
import { ObjectId } from "bson";

interface CreateCustomerProps {
    name: string;
    email: string;
}

class CreateCustomerService {
    async execute({ name, email }: CreateCustomerProps) {
        if (!name || !email) {
            throw new Error("Preencha todos os campos");
        }

        const customer = await prismaClient.customer.create({
            data: {
                id: new ObjectId().toString(),
                name,
                email,
                status: true
            }
        });

        return customer;
    }
}

export { CreateCustomerService };
