import {
  DeliveriesStatusUpdate,
  DeliveriesStatusCreate,
} from "@/repository/deliveries-status-repository";
import { DeliveryStatus } from "@prisma/client";

type RequestData = {
    id: string
    status: DeliveryStatus
}

export async function DeliveryStatusUpdate(data: RequestData) {
  const delivery = await DeliveriesStatusUpdate({
    id: data.id,
    status: data.status,
  });

  await DeliveriesStatusCreate({
    id: data.id,
    status: data.status,
  });

  return delivery;
}
