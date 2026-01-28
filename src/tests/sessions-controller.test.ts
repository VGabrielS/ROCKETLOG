import request from "supertest"
import { prisma } from "@/database/prisma";

import { app } from "@/app"

describe("SessionsController", () => {
    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    });

    it("should authenticate a and get acess token", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Test User", 
            email: "testuser@example.com",
            password: "passoword123"
        })


        user_id = userResponse.body.id

        const sesionResponse = await request(app).post("/sessions").send({
            email: "testuser@example.com",
            password: "passoword123"
        })

        expect(sesionResponse.status).toBe(200)
        expect(sesionResponse.body.token).toEqual(expect.any(String))
    })
})