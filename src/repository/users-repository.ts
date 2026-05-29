import { prisma } from "@/database/prisma";

export async function UsersRepositoryfindFirst(data: { email: string }) {
  return await prisma.user.findFirst({
    where: { email: data.email },
  });
}

export async function UsersRepositoryCreate(data: { name: string, email:string, password:string}) {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password
    },
  });
}
