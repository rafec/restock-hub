import prisma from "src/lib/prisma";

class UpdateRoleService {
  async execute(id: string, roleName: string) {
    if (!id) {
      throw new Error("Invalid role id.");
    }

    const roleExists = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!roleExists) {
      throw new Error("Role not found.");
    }

    const updatedRole = await prisma.role.update({
      where: {
        id,
      },
      data: {
        roleName,
      },
    });

    return updatedRole;
  }
}

export { UpdateRoleService };
