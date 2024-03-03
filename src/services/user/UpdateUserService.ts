import prisma from "lib/prisma";

interface IUserRequest {
  id: string;
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
  async execute({
    id,
    name,
    email,
    password,
    country,
    state,
    city,
    address,
    roleId,
  }: IUserRequest) {
    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new Error("User not found.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address format.");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new Error("Role not found.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email address is already in use.");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        country,
        state,
        city,
        address,
        roleId,
      },
      include: {
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
    });

    return updatedUser;
  }
}

export { UpdateUserService };
