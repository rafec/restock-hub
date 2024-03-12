import testPrisma from "lib/testPrisma";
import { FindAllRolesService } from "services/role/FindAllRolesService";

describe("GET /role", () => {
  let findAllRolesService: FindAllRolesService;

  beforeAll(() => {
    findAllRolesService = new FindAllRolesService();
  });

  afterEach(async () => {
    await testPrisma.role.deleteMany();
  });

  it("Should return all roles from the database", async () => {
    const roles = await testPrisma.role.createMany({
      data: [
        { roleName: "test-find-all-roles-1" },
        { roleName: "test-find-all-roles-2" },
        { roleName: "test-find-all-roles-3" },
      ],
    });

    const allRoles = await findAllRolesService.execute(testPrisma);

    expect(allRoles).toHaveLength(roles.count);
  });

  it("Should inform when no roles are registered yet", async () => {
    await testPrisma.role.deleteMany();
    const allRoles = await findAllRolesService.execute(testPrisma);

    expect(allRoles).toEqual("There is no roles registered yet.");
  });
});
