import { CreateRoleService } from "services/role/CreateRoleService";
import prisma from "lib/prisma";

describe("CreateRoleService", () => {
  let createRoleService: CreateRoleService;

  beforeAll(() => {
    createRoleService = new CreateRoleService();
  });

  afterEach(async () => {
    await prisma.role.deleteMany();
  });

  it("Should create a new role with a valid role name", async () => {
    const roleName = "valid-role-name";

    const role = await createRoleService.execute(roleName);

    expect(role).toBeDefined();
    expect(role.roleName).toBe(roleName);
  });

  it("Should throw an error with an invalid role name", async () => {
    const roleName = ""; // Invalid role name

    await expect(createRoleService.execute(roleName)).rejects.toThrow(
      "Invalid role name.",
    );
  });

  it("Should throw an error if the role already exists", async () => {
    const roleName = "admin";

    await prisma.role.create({ data: { roleName } });

    await expect(createRoleService.execute(roleName)).rejects.toThrow(
      "Role already exists.",
    );
  });
});
