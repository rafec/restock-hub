import prisma from "lib/prisma";

class FindUserService {
  async execute(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

export { FindUserService };
