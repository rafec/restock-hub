import prisma from "lib/prisma";

class DeleteRoleService {
  async execute(id: string) {
    const roleExists = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!id) {
      throw new Error("The ID informed is invalid.");
    }

    if (!roleExists) {
      throw new Error("Role not found.");
    }

    const deletedRole = await prisma.role.delete({
      where: {
        id,
      },
    });

    const roleAfterDeletion = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (roleAfterDeletion) {
      throw new Error("Failed to delete role.");
    }

    return deletedRole;
  }
}

export { DeleteRoleService };
