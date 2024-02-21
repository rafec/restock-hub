import { CreateRoleService } from "../../../../services/role/CreateRoleService";
import { DeleteRoleService } from "../../../../services/role/DeleteRoleService";
test("Create new role should return a Role object", async () => {
  const expectedRoleFormat = {
    id: expect.any(String),
    roleName: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  const createRoleService = new CreateRoleService();
  const deleteRoleService = new DeleteRoleService();
  const roleName = "test";
  const role = await createRoleService.execute(roleName);
  console.log(role);
  expect(role).toMatchObject(expectedRoleFormat);
  await deleteRoleService.execute(roleName);
});
