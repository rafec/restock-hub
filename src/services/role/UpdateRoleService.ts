import prisma from "lib/prisma";

interface IRoleRequest {
  id: string;
  roleName?: string;
}

class UpdateRoleService {
  async execute({ id, roleName }: IRoleRequest) {
    const roleExists = await prisma.role.findUnique({
      where: {
        id,
      },
    });
    if (!roleExists) {
      throw new Error("Role not found.");
    }

    const roleAlreadyExists = await prisma.role.findUnique({
      where: {
        roleName,
      },
    });
    if (roleAlreadyExists) {
      throw new Error("Role name already exists.");
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
