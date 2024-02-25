import { FindAllRolesService } from "services/role/FindAllRolesService";
import prisma from "lib/prisma";

describe("FindAllRolesService", () => {
  let findAllRolesService: FindAllRolesService;

  beforeAll(() => {
    findAllRolesService = new FindAllRolesService();
  });

  afterEach(async () => {
    await prisma.role.deleteMany();
  });

  it("should return all roles when roles are present in the database", async () => {
    const rolesToCreate = [
      { roleName: "role1" },
      { roleName: "role2" },
      { roleName: "role3" },
    ];
    await prisma.role.createMany({ data: rolesToCreate });

    const allRoles = await findAllRolesService.execute();

    expect(allRoles.length).toBeGreaterThan(2);
  });

  it("should return a message when no roles are present in the database", async () => {
    const result = await findAllRolesService.execute();

    expect(result).toBe("There is no roles registered or they were not found.");
  });
});
