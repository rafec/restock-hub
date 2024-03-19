import testPrisma from "lib/testPrisma";
import bcrypt from "bcrypt";
import { CreateUserService } from "services/user/CreateUserService";

describe("POST /user", () => {
  interface IUserRequest {
    name: string;
    email: string;
    password: string;
    zipcode?: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    roleId: string;
  }

  let role;
  let createUserService: CreateUserService;

  beforeAll(() => {
    createUserService = new CreateUserService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-user-role",
      },
    });
  });

  afterEach(async () => {
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new user", async () => {
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const newUser: IUserRequest = {
      name: "Test user",
      email: "test-user@mail.com",
      password: hashedPassword,
      roleId: role.id,
    };

    const user = await createUserService.execute(newUser, testPrisma);

    const passwordIsValid = await bcrypt.compare(
      newUser.password,
      user.password,
    );

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
    expect(passwordIsValid).toBeTruthy();
    expect(user.roleId).toBe(newUser.roleId);
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidUser: IUserRequest = {
      name: "",
      email: "",
      password: "",
      roleId: "",
    };

    await expect(
      createUserService.execute(newInvalidUser, testPrisma),
    ).rejects.toThrow("Name, email, password, and roleId are required.");
  });

  it("Should throw an error when email format is invalid", async () => {
    const newInvalidEmailUser: IUserRequest = {
      name: "Invalid email user",
      email: "invalidmailuser.com",
      password: "password",
      roleId: "role-id-123",
    };

    await expect(
      createUserService.execute(newInvalidEmailUser, testPrisma),
    ).rejects.toThrow("Invalid email address format.");
  });

  it("Should throw an error when password lenght < 8", async () => {
    const newInvalidPasswordUser: IUserRequest = {
      name: "Invalid password user",
      email: "invalidpassworduser@mail.com",
      password: "12345",
      roleId: "role-id-123",
    };

    await expect(
      createUserService.execute(newInvalidPasswordUser, testPrisma),
    ).rejects.toThrow("Password must be at least 8 characters long.");
  });

  it("Should throw an error when role doesnt exists", async () => {
    const newInvalidRoleIdUser: IUserRequest = {
      name: "Invalid role user",
      email: "invalidroleuser@mail.com",
      password: "12345678",
      roleId: "role-id-123",
    };

    await expect(
      createUserService.execute(newInvalidRoleIdUser, testPrisma),
    ).rejects.toThrow("Role not found.");
  });

  it("Should throw an error when user already exists", async () => {
    const newUser: IUserRequest = {
      name: "new user",
      email: "newuser@mail.com",
      password: "12345678",
      roleId: role.id,
    };

    const existingUser = await createUserService.execute(newUser, testPrisma);

    const newAlreadyExistingUser: IUserRequest = {
      name: "already existing user",
      email: "newuser@mail.com",
      password: "12345678",
      roleId: role.id,
    };

    await expect(
      createUserService.execute(newAlreadyExistingUser, testPrisma),
    ).rejects.toThrow("Email address is already in use.");
  });
});
