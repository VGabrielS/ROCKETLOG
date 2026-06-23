import { Request, Response } from "express";
import { z } from "zod";

import { SessionsServices } from "@/services/sessions-services";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email().toLowerCase(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);

    const sessions = await SessionsServices({ email, password });

    return response.json(sessions);
  }
}

export { SessionsController };
