import prisma from "lib/prisma";

class DeleteUserService {
  async execute(id: string) {
    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!id) {
      throw new Error("The ID informed is invalid.");
    }

    if (!userExists) {
      throw new Error("User not found.");
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    const userAfterDeletion = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (userAfterDeletion) {
      throw new Error("Failed to delete user. User deleted.");
    }

    return deletedUser;
  }
}

export { DeleteUserService };
