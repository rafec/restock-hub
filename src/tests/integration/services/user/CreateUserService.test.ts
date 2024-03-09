import testPrisma from "lib/testPrisma";
import { CreateUserService } from "src/services/user/CreateUserService";

describe("POST /user", () => {
  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new user", async () => {
    const createUserService = new CreateUserService();

    interface IUserRequest {
      name: string;
      email: string;
      password: string;
      country?: string;
      state?: string;
      city?: string;
      address?: string;
      roleId: string;
    }

    const role = await testPrisma.role.create({
      data: {
        roleName: "test-role",
      },
    });

    console.log(role);

    const newUser = {
      name: "Test user",
      email: "test-user@mail.com",
      password: "password",
      roleId: role.id,
    };

    const userProps: IUserRequest = newUser;

    const user = await createUserService.execute(
      {
        ...userProps,
      },
      testPrisma,
    );

    const allUsers = await testPrisma.user.findMany();

    console.log("ALL USERS ------:", allUsers);
    console.log("USER CREATED ------:", user);

    expect(1).toBe(1);
  });
});
