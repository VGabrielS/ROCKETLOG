import { prisma } from "@/database/prisma";
import { DeliveryStatus } from "@prisma/client";

export async function DeliveriesStatusUpdate({
  id,
  status
}: { id: string, status: DeliveryStatus }) {
  return await prisma.delivery.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });
}

export async function DeliveriesStatusCreate({
  id,
  status
}: { id: string, status: DeliveryStatus }) {
    return await prisma.deliveryLog.create({
      data:{
        deliveryId: id,
        description: status
      }
    })
}
