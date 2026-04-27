import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { z } from "zod"

class SessionsController {
    async create(request:Request, response: Response){
        const bodySchema = z.object({
            email: z.string().email().toLowerCase(),
            password: z.string().min(6),

        })

        const { email, password } = bodySchema.parse(request.body)

        // Consulta ao banco -> Mover para repository
        const user = await prisma.user.findFirst({
            where: { email },
        })

        // Regra de negócio -> Mover para services
        if(!user){
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Invalid email or password", 401)
        }

        const {secret, expiresIn} = authConfig.jwt

        const token = sign({ role:user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn,
        })

        const { password:hashedPassword, ...userWithoutPassword } = user 

        return response.json({ token, user: userWithoutPassword})
    }
}

export { SessionsController }