import testPrisma from "lib/testPrisma";
import { UpdateRoleService } from "services/role/UpdateRoleService";

describe("PUT /role", () => {
  interface IRoleRequest {
    id: string;
    roleName?: string;
  }

  let role;
  let updateRoleService: UpdateRoleService;

  beforeAll(() => {
    updateRoleService = new UpdateRoleService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-update-role" },
    });
  });

  afterEach(async () => {
    await testPrisma.role.deleteMany();
  });

  it("Should update a role by ID", async () => {
    const updateRoleProperties: IRoleRequest = {
      id: role.id,
      roleName: "role-updated",
    };

    const updatedRole = await updateRoleService.execute(
      updateRoleProperties,
      testPrisma,
    );

    expect(updatedRole).toBeDefined();
    expect(updatedRole.id).toBeDefined();
    expect(updatedRole.roleName).toBe(updateRoleProperties.roleName);
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateRoleProperties = {
      id: role.id,
    };

    const existentRole = await testPrisma.role.findUnique({
      where: { id: role.id },
    });

    const updatedRole = await updateRoleService.execute(
      updateRoleProperties,
      testPrisma,
    );

    expect(updatedRole).toBeDefined();
    expect(updatedRole.id).toBeDefined();
    expect(updatedRole.id).toBe(existentRole.id);
    expect(updatedRole.roleName).toBe(existentRole.roleName);
  });

  it("Should throw an error when role already exists", async () => {
    const newRole: IRoleRequest = {
      id: role.id,
      roleName: role.roleName,
    };

    await expect(
      updateRoleService.execute(newRole, testPrisma),
    ).rejects.toThrow("Role already exists.");
  });

  it("Should throw an error when role doesnt exists", async () => {
    const updateRoleProperties: IRoleRequest = {
      id: "invalid-id",
      roleName: "role-with-invalid-id",
    };

    await expect(
      updateRoleService.execute(updateRoleProperties, testPrisma),
    ).rejects.toThrow("Role not found.");
  });
});
