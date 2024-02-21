import prisma from "../../lib/prisma";

class DeleteRoleService {
  async execute(roleName: string) {
    const role = await prisma.role.delete({
      where: {
        roleName,
      },
    });
  }
}

export { DeleteRoleService };
