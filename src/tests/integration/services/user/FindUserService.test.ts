import testPrisma from "lib/testPrisma";
import { FindUserService } from "services/user/FindUserService";

describe("GET /user/:id", () => {
  let role;
  let findUserService;

  beforeAll(() => {
    findUserService = new FindUserService();
  });

  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should find a specific user by ID", async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-find-user-role" },
    });

    const newUser = await testPrisma.user.create({
      data: {
        name: "Test User",
        email: "user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    const userId = newUser.id;

    const userFound = await findUserService.execute(userId, testPrisma);

    expect(userFound).toBeDefined();
    expect(userFound.id).toBe(userId);
    expect(userFound.email).toBe(newUser.email);
  });

  it("Should throw an error when user is not found", async () => {
    const invalidUserId = "invalid-user-id";

    await expect(
      findUserService.execute(invalidUserId, testPrisma),
    ).rejects.toThrow("User not found.");
  });
});
