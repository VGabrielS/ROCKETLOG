import { prisma } from "@/database/prisma";

export async function createDeliveriesRepository(data: {
  user_id: string;
  description: string;
}) {
  return await prisma.delivery.create({
    data: {
      userId: data.user_id,
      description: data.description,
    },
  });
}

export async function findManyDeliveries() {
  return await prisma.delivery.findMany({
    include: {
      user: { select: { name: true, email: true } },
    },
  });
}
