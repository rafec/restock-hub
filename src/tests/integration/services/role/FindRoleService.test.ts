import testPrisma from "lib/testPrisma";
import { FindRoleService } from "services/role/FindRoleService";

describe("GET /role/:id", () => {
  let findRoleService;

  beforeAll(() => {
    findRoleService = new FindRoleService();
  });

  afterEach(async () => {
    await testPrisma.role.deleteMany();
  });

  it("Should find a specific role by ID", async () => {
    const newRole = await testPrisma.role.create({
      data: { roleName: "test-find-role" },
    });

    const roleId = newRole.id;

    const roleFound = await findRoleService.execute(roleId, testPrisma);

    expect(roleFound).toBeDefined();
    expect(roleFound.id).toBe(roleId);
    expect(roleFound.roleName).toBe(newRole.roleName);
  });

  it("Should throw an error when role is not found", async () => {
    const invalidRoleId = "invalid-role-id";

    await expect(
      findRoleService.execute(invalidRoleId, testPrisma),
    ).rejects.toThrow("Role not found.");
  });
});
