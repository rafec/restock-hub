import prisma from "../../lib/prisma";

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

    const role = await prisma.role.create({
      data: {
        roleName,
      },
    });

    return role;
  }
}

export { CreateRoleService };
