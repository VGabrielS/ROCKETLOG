import { PrismaClient } from "@prisma/client";
import { query } from "express";

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production"  ? [] : ["query"]
})