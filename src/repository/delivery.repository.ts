import { prisma } from "@/database/prisma";

export async function findDeliveryById(delivery_id: string) {
  const delivery = await prisma.delivery.findUnique({
    where: { id: delivery_id },
  });

  return delivery;
}

export async function findDeliveryByIdWithLogs(delivery_id: string) {
  return await prisma.delivery.findUnique({
    where: { id: delivery_id },
    include: {
      logs: true,
      user: true,
    },
  });
}
