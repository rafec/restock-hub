import { DeleteRoleService } from "services/role/DeleteRoleService";
import prisma from "lib/prisma";

describe("DeleteRoleService", () => {
  let deleteRoleService: DeleteRoleService;

  beforeAll(() => {
    // Initialize the DeleteRoleService instance before running the tests
    deleteRoleService = new DeleteRoleService();
  });

  afterEach(async () => {
    // Clean up the database after each test by deleting any roles created during the test
    await prisma.role.deleteMany();
  });

  it("should delete an existing role", async () => {
    // Arrange
    const roleName = "test-role";
    const createdRole = await prisma.role.create({ data: { roleName } });

    // Act
    const deletedRole = await deleteRoleService.execute(createdRole.id);

    // Assert
    expect(deletedRole).toBeDefined();
    expect(deletedRole.id).toBe(createdRole.id);

    // Verify that the role no longer exists in the database
    const roleAfterDeletion = await prisma.role.findUnique({
      where: { id: createdRole.id },
    });
    expect(roleAfterDeletion).toBeNull();
  });

  it("should throw an error when deleting a non-existent role", async () => {
    // Arrange
    const nonExistentRoleId = "non-existent-id";

    // Act & Assert
    await expect(deleteRoleService.execute(nonExistentRoleId)).rejects.toThrow(
      "Role not found.",
    );
  });

  it("should throw an error with an invalid role ID", async () => {
    // Arrange
    const invalidRoleId = ""; // Invalid role ID

    // Act & Assert
    await expect(deleteRoleService.execute(invalidRoleId)).rejects.toThrow(
      "The ID informed is invalid.",
    );
  });
});
