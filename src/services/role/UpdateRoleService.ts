import prisma from "lib/prisma";

interface IRoleRequest {
  id: string;
  roleName?: string;
}

class UpdateRoleService {
  async execute({ id, roleName }: IRoleRequest) {
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
