import prisma from "lib/prisma";

interface IUserRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  roleId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class CreateUserService {
  async execute({ name, email, password, roleId }: IUserRequest) {
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        roleId,
      },
    });

    return createdUser;
  }
}

export { CreateUserService };
