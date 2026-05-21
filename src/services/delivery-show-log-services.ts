import { AppError } from "@/utils/AppError";
import { UserRole, User } from "@prisma/client";
import { findDeliveryByIdWithLogs } from "@/repository/delivery-logs.repository";

type RequestData = {
  delivery_id: string;
  role: UserRole;
  userId: User["id"];
};

export async function showDeliveryLogService(data: RequestData) {
  const delivery = await findDeliveryByIdWithLogs(data.delivery_id);

  if (!delivery) {
    throw new AppError("delivery not found", 404);
  }

  if (data.role === "customer" && data.userId !== delivery?.userId) {
    throw new AppError("The user can only viem their deliveries", 401);
  }

  return delivery;
}
