import { DeleteRoleService } from "services/role/DeleteRoleService";
import prisma from "lib/prisma";

describe("DeleteRoleService", () => {
  let deleteRoleService: DeleteRoleService;

  beforeAll(() => {
    deleteRoleService = new DeleteRoleService();
  });

  afterEach(async () => {
    await prisma.role.deleteMany();
  });

  it("Should delete an existing role", async () => {
    const roleName = "test-role";
    const createdRole = await prisma.role.create({ data: { roleName } });

    const deletedRole = await deleteRoleService.execute(createdRole.id);

    expect(deletedRole).toBeDefined();
    expect(deletedRole.id).toBe(createdRole.id);

    const roleAfterDeletion = await prisma.role.findUnique({
      where: { id: createdRole.id },
    });
    expect(roleAfterDeletion).toBeNull();
  });

  it("Should throw an error when deleting a non-existent role", async () => {
    const nonExistentRoleId = "non-existent-id";

    await expect(deleteRoleService.execute(nonExistentRoleId)).rejects.toThrow(
      "Role not found.",
    );
  });

  it("Should throw an error with an invalid role ID", async () => {
    const invalidRoleId = ""; // Invalid role ID

    await expect(deleteRoleService.execute(invalidRoleId)).rejects.toThrow(
      "The ID informed is invalid.",
    );
  });
});
