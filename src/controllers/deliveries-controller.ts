import { Request, Response } from "express";
import { createDeliveriesRepository, findManyDeliveries } from "@/repository/deliveries-repository";
import{ z } from "zod"

class DeliveriesController {
    async create(request:Request, response: Response){
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        })

        const { user_id, description } = bodySchema.parse(request.body)

        const result = await createDeliveriesRepository({user_id, description})

        /*
        // transferir para repository 
        await prisma.delivery.create({
            data:{
                userId: user_id,
                description: description
            }
        })
        */

        return response.status(201).json(result)
    }

    async index(request:Request, response: Response){
        
        /*
        // transferir para repository 
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {select: { name:true, email: true }}
            }
        })
            */

        const  deliveries = await findManyDeliveries()

        return response.json(deliveries)
    }
}

export { DeliveriesController }