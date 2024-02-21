import { CreateRoleService } from "../../../../services/role/CreateRoleService";
import prisma from "../../../../lib/prisma";

test("Create new role should return a Role object", async () => {
  const roleName = "test";

  try {
    const createRoleService = new CreateRoleService();
    const role = await createRoleService.execute(roleName);
    const currentDate = new Date().getTime();

    expect(role).toHaveProperty("id");
    expect(role.roleName).toBe(roleName);
    expect(role.createdAt).toBeInstanceOf(Date);
    expect(role.updatedAt).toBeInstanceOf(Date);
    expect(role.createdAt.getTime()).toBeLessThanOrEqual(currentDate);
    expect(role.updatedAt).toEqual(role.createdAt);

    console.log(role);
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  } finally {
    await prisma.role.delete({
      where: {
        roleName,
      },
    });

    const deletedRole = await prisma.role.findUnique({
      where: {
        roleName,
      },
    });
    expect(deletedRole).toBeNull();
  }
});
