import prisma from "lib/prisma";

class FindAllRolesService {
  async execute() {
    const allRoles = await prisma.role.findMany();

    if (allRoles.length === 0) return "There is no roles registered yet.";

    return allRoles;
  }
}

export { FindAllRolesService };
