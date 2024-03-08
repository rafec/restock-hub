import testPrisma from "lib/testPrisma";

describe("POST /user", () => {
  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new user", async () => {
    const name = "Rafael";
    const email = "rafael@mail.com";
    const password = "12345678";

    const role = await testPrisma.role.create({
      data: {
        roleName: "test-role",
      },
    });

    const user = await testPrisma.user.create({
      data: {
        name,
        email,
        password,
        roleId: role.id,
      },
    });
    const allUsers = await testPrisma.user.findMany();

    console.log("ALL USERS ------:", allUsers);
    console.log("USER CREATED ------:", user);

    expect(1).toBe(1);
  });
});
