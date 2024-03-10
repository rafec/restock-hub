import testPrisma from "lib/testPrisma";
import { CreateRoleService } from "src/services/role/CreateRoleService";

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
    const newRole = {
      roleName: "test-role",
    };

    const role = await createRoleService.execute(newRole, testPrisma);

    expect(role).toBeDefined();
    expect(role.id).toBeDefined();
    expect(role.roleName).toBe(newRole.roleName);
  });
});
