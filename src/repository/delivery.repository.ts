import { prisma } from "@/database/prisma";

export async function findDeliveryById (delivery_id: string) {

    const delivery = await prisma.delivery.findUnique({
        where: { id: delivery_id },
    });

    return delivery
}