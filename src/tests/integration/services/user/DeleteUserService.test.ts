import testPrisma from "lib/testPrisma";
import { DeleteUserService } from "services/user/DeleteUserService";

describe("DELETE /user/:id", () => {
  let role;
  let user;
  let deleteUserService: DeleteUserService;

  beforeAll(() => {
    deleteUserService = new DeleteUserService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-delete-user-role" },
    });

    user = await testPrisma.user.create({
      data: {
        name: "Test delete user",
        email: "test-user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should delete a user", async () => {
    const userId = user.id;
    const deletedUser = await deleteUserService.execute(userId, testPrisma);

    const userAfterDeletion = await testPrisma.user.findUnique({
      where: { id: userId },
    });

    expect(deletedUser).toBeDefined();
    expect(deletedUser.id).toBe(userId);
    expect(userAfterDeletion).toBeNull();
  });

  it("Should throw an error if user doesnt exists", async () => {
    const invalidUserId = "invalid-user-id";

    await expect(
      deleteUserService.execute(invalidUserId, testPrisma),
    ).rejects.toThrow("User not found.");
  });
});
