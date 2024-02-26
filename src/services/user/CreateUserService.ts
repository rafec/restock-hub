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
    if (!name || !email || !password || !roleId) {
      throw new Error("Name, email, password, and roleId are required.");
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
      throw new Error("User not found.");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email address is already in use.");
    }

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
