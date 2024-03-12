import testPrisma from "lib/testPrisma";
import { FindAllUsersService } from "services/user/FindAllUsersService";

describe("GET /user", () => {
  let role;
  let findAllUsersService: FindAllUsersService;

  beforeAll(() => {
    findAllUsersService = new FindAllUsersService();
  });

  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should return all users from the database", async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-find-all-users-role" },
    });

    const users = await testPrisma.user.createMany({
      data: [
        {
          name: "Test User 1",
          email: "test1@mail.com",
          password: "password",
          roleId: role.id,
        },
        {
          name: "Test User 2",
          email: "test2@mail.com",
          password: "password",
          roleId: role.id,
        },
        {
          name: "Test User 3",
          email: "test3@mail.com",
          password: "password",
          roleId: role.id,
        },
      ],
    });

    const allUsers = await findAllUsersService.execute(testPrisma);

    expect(allUsers).toHaveLength(users.count);
  });

  it("Should inform when no users are registered yet", async () => {
    await testPrisma.user.deleteMany();
    const allUsers = await findAllUsersService.execute(testPrisma);

    expect(allUsers).toEqual("There is no users registered yet.");
  });
});
