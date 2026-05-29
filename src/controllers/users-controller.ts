import { Request, Response } from "express";
import { z } from "zod"

import { UsersServices } from "@/services/users-services";

class UsersController{
    async create(request:Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email().toLowerCase(),
            password: z.string().min(6)
            })

        const { name, email, password } = bodySchema.parse(request.body)

        const user = await UsersServices({ name, email, password } )

       /*
        const userWithSameEmail = await prisma.user.findFirst({ where: { email }})

        if (userWithSameEmail) {
            throw new AppError("User with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const { password: _, ...userWithoutPassword } = user

        return response.status(201).json(userWithoutPassword)
        */

        return response.status(201).json(user)
    }
}

export { UsersController }