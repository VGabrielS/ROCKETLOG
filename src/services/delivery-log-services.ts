import { AppError } from "@/utils/AppError";
import { findDeliveryById } from "@/repository/delivery.repository";
import { createDeliveryLog } from "@/repository/delivery-log-repository";

type RequestData = {
  delivery_id: string;
  description: string;
};

export async function createDeliveryLogService(data: RequestData) {
  const delivery = await findDeliveryById(data.delivery_id);

  if (!delivery) {
    throw new AppError("Delivery not found", 404);
  }

  if (delivery.status === "delivered") {
    throw new AppError("This order has already been delivered", 400);
  }

  if (delivery.status === "processing") {
    throw new AppError("Change status to shipped", 400);
  }

  return await createDeliveryLog(data);
}