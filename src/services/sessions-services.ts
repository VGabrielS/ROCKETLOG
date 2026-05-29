import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { UserRole } from "@prisma/client";
import { SessionsRepositoryFindFirst } from "@/repository/sessions-repository";

type RequestData = {
  email: string;
  password: string;
};

export async function SessionsServices(data: RequestData) {
  const user = await SessionsRepositoryFindFirst({ email: data.email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatched = await compare(data.password, user.password);

  if (!passwordMatched) {
    throw new AppError("Invalid email or password", 401);
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({ role: user.role ?? "customer" }, secret, {
    subject: user.id,
    expiresIn,
  });

  const { password: hashedPassword, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword}
  
}
