import { Request, Response } from "express";
import {
  DeliveriesCreate,
  DeliveriesFind,
} from "@/services/deliveries-service";
import { z } from "zod";

class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    const result = await DeliveriesCreate({ user_id, description });

    return response.status(201).json(result);
  }

  async index(request: Request, response: Response) {
    return response.json(await DeliveriesFind());
  }
}

export { DeliveriesController };
