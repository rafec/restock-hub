import prisma from "lib/prisma";

class FindAllUsersService {
  async execute() {
    const allUsers = await prisma.user.findMany({
      include: {
        role: {
          select: {
            id: true,
            roleName: true,
          },
        },
      },
    });

    if (allUsers.length === 0) return "There is no users registered yet.";

    return allUsers;
  }
}

export { FindAllUsersService };
