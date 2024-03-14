import testPrisma from "lib/testPrisma";
import { UpdateUserService } from "services/user/UpdateUserService";

describe("PUT /user", () => {
  interface IUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    roleId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  let role;
  let user;
  let updateUserService: UpdateUserService;

  beforeAll(() => {
    updateUserService = new UpdateUserService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-update-user-role" },
    });

    user = await testPrisma.user.create({
      data: {
        name: "Test User",
        email: "user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should update a user by ID", async () => {
    const updateUserProperties: IUserRequest = {
      id: user.id,
      name: "Updated Test User",
      email: "updatedemail@mail.com",
    };

    const updatedUser = await updateUserService.execute(
      updateUserProperties,
      testPrisma,
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBeDefined();
    expect(updatedUser.name).toBe(updateUserProperties.name);
    expect(updatedUser.email).toBe(updateUserProperties.email);
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateUserProperties = {
      id: user.id,
    };

    const existentUser = await testPrisma.user.findUnique({
      where: { id: user.id },
    });

    const updatedUser = await updateUserService.execute(
      updateUserProperties,
      testPrisma,
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBeDefined();
    expect(updatedUser.id).toBe(existentUser.id);
    expect(updatedUser.name).toBe(existentUser.name);
    expect(updatedUser.email).toBe(existentUser.email);
  });

  it("Should throw an error when user already exists", async () => {
    const updateUserProperties: IUserRequest = {
      id: user.id,
      email: user.email,
    };

    await expect(
      updateUserService.execute(updateUserProperties, testPrisma),
    ).rejects.toThrow("Email address is already in use.");
  });

  it("Should throw an error when user doesnt exists", async () => {
    const updateUserProperties: IUserRequest = {
      id: "invalid-id",
      name: "user-with-invalid-id",
      email: "invaliduser@mail.com",
    };

    await expect(
      updateUserService.execute(updateUserProperties, testPrisma),
    ).rejects.toThrow("User not found.");
  });
});
