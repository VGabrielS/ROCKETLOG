import { Request, Response } from "express";
import { z } from "zod";

import { showDeliveryLogService } from "@/services/delivery-show-log-services";
import { createDeliveryLogService } from "@/services/delivery-create-log-services";

class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const result = await createDeliveryLogService({ delivery_id, description });

    return response.status(201).json(result);
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);
    const { id, role } = request.user;

  
    const result = await showDeliveryLogService({
      delivery_id,  
      role,
      userId: id,
    });

    return response.json(result)
  }
}

export { DeliveryLogsController };
