import testPrisma from "lib/testPrisma";
import { DeleteRoleService } from "services/role/DeleteRoleService";

describe("DELETE /role/:id", () => {
  let role;
  let deleteRoleService: DeleteRoleService;

  beforeAll(() => {
    deleteRoleService = new DeleteRoleService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-delete-role" },
    });
  });

  afterEach(async () => {
    await testPrisma.role.deleteMany();
  });

  it("Should delete a role", async () => {
    const roleId = role.id;
    const deletedRole = await deleteRoleService.execute(roleId, testPrisma);

    const roleAfterDeletion = await testPrisma.role.findUnique({
      where: { id: roleId },
    });

    expect(deletedRole).toBeDefined();
    expect(deletedRole.id).toBe(roleId);
    expect(roleAfterDeletion).toBeNull();
  });

  it("Should throw an error if role doesnt exists", async () => {
    const invalidRoleId = "invalid-role-id";

    await expect(
      deleteRoleService.execute(invalidRoleId, testPrisma),
    ).rejects.toThrow("Role not found.");
  });
});
