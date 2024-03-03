import prisma from "lib/prisma";

class FindUserService {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

export { FindUserService };
