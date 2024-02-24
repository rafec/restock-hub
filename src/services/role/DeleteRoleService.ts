import prisma from "../../lib/prisma";

class DeleteRoleService {
  async execute(id: string) {
    const role = await prisma.role.delete({
      where: {
        id,
      },
    });
  }
}

export { DeleteRoleService };
