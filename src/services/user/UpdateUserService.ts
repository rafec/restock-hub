import prisma from "lib/prisma";

interface IUserRequest {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  roleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class UpdateUserService {
  async execute({ id, ...props }: IUserRequest) {
    if (!id) {
      throw new Error("Invalid user id.");
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error("User not found.");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...props },
    });

    return updatedUser;
  }
}

export { UpdateUserService };
