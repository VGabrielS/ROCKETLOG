import { AppError } from "@/utils/AppError";
import {
  UsersRepositoryfindFirst,
  UsersRepositoryCreate,
} from "@/repository/users-repository";
import { hash } from "bcrypt";

type RequestData = {
  name: string;
  email: string;
  password: string;
};

export async function UsersServices(data: RequestData) {
  const userWithSameEmail = await UsersRepositoryfindFirst({
    email: data.email,
  });

  if (userWithSameEmail) {
    throw new AppError("User with same email already exists");
  }

  const hashedPassword = await hash(data.password, 8);

  const user = await UsersRepositoryCreate({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
