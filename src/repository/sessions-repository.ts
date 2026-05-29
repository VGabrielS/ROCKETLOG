import { prisma } from "@/database/prisma";

export async function SessionsRepositoryFindFirst(data: { email: string }) {
  return await prisma.user.findFirst({
    where: { email: data.email },
  });
}
