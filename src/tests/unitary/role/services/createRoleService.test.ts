import { CreateRoleService } from "../../../../services/role/CreateRoleService";
import prisma from "../../../../lib/prisma";

test("Create new role should return a Role object", async () => {
  const expectedRoleFormat = {
    id: expect.any(String),
    roleName: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  const createRoleService = new CreateRoleService();
  const roleName = "test";
  const role = await createRoleService.execute(roleName);
  console.log(role);
  expect(role).toMatchObject(expectedRoleFormat);

  await prisma.role.delete({
    where: {
      roleName,
    },
  });
});
