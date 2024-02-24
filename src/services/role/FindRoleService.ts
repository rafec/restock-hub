import prisma from "src/lib/prisma";

class FindRoleService {
  async execute(id: string) {
    const role = await prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new Error("Role not found.");
    }

    return role;
  }
}

export { FindRoleService };
