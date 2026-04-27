import { prisma } from "@/database/prisma";

export async function createDeliveryLog(data: {delivery_id: string, description: string}) {

    return await prisma.deliveryLog.create({
      data: {
        deliveryId: data.delivery_id,
        description: data.description,
      },
    });

}