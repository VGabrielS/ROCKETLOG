import { createDeliveriesRepository, findManyDeliveries } from "@/repository/deliveries-repository";
import { User } from "@prisma/client";


type RequestData = {
    user_id: User["id"];
    description: string
}

export async function DeliveriesCreate(data: RequestData) {
  const delivery = await createDeliveriesRepository({
    user_id: data.user_id,
    description: data.description,
  });

  return delivery;
}

export async function DeliveriesFind(){
const delivery = await findManyDeliveries();

  return delivery;
}   