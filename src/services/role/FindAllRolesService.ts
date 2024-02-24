import prisma from "src/lib/prisma";

class FindAllRolesService {
  async execute() {
    const allRoles = await prisma.role.findMany();

    if (allRoles.length === 0)
      return "There is no roles registered or they were not found.";

    return allRoles;
  }
}

export { FindAllRolesService };
