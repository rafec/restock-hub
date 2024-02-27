import prisma from "lib/prisma";

class CreateRoleService {
  async execute(roleName: string) {
    if (!roleName) {
      throw new Error("Invalid role name.");
    }

    const roleAlreadyExists = await prisma.role.findUnique({
      where: {
        roleName,
      },
    });
    if (roleAlreadyExists) {
      throw new Error("Role already exists.");
    }

    const createdRole = await prisma.role.create({
      data: {
        roleName,
      },
    });

    return createdRole;
  }
}

export { CreateRoleService };
