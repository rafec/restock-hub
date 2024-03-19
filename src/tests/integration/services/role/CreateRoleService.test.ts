import testPrisma from "lib/testPrisma";
import { CreateRoleService } from "services/role/CreateRoleService";

describe("POST /role", () => {
  interface IRoleRequest {
    roleName: string;
  }

  let createRoleService: CreateRoleService;

  beforeAll(() => {
    createRoleService = new CreateRoleService();
  });

  afterEach(async () => {
    await testPrisma.role.deleteMany();
  });

  it("Should create a new role", async () => {
    const newRole: IRoleRequest = {
      roleName: "test-role",
    };

    const role = await createRoleService.execute(newRole, testPrisma);

    expect(role).toBeDefined();
    expect(role.id).toBeDefined();
    expect(role.roleName).toBe(newRole.roleName);
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidRole: IRoleRequest = {
      roleName: "",
    };

    await expect(
      createRoleService.execute(newInvalidRole, testPrisma),
    ).rejects.toThrow("Invalid role name.");
  });

  it("Should throw an error when role already exists", async () => {
    const newRole: IRoleRequest = {
      roleName: "test-existing-role",
    };

    const existingRole = await createRoleService.execute(newRole, testPrisma);

    await expect(
      createRoleService.execute(newRole, testPrisma),
    ).rejects.toThrow("Role already exists.");
  });

  it("Should throw an error when role name isnt between 2 and 25 characters long", async () => {
    const newRole: IRoleRequest = {
      roleName: "R",
    };

    await expect(
      createRoleService.execute(newRole, testPrisma),
    ).rejects.toThrow("Role name must be between 2 and 25 characters long.");
  });
});
