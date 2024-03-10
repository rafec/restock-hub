import testPrisma from "lib/testPrisma";
import { CreateDemandService } from "services/demand/CreateDemandService";

describe("POST /demand", () => {
  interface IDemandRequest {
    userId: string;
    description: string;
    keywords: string[];
    status: string;
  }

  let role;
  let user;
  let createDemandService: CreateDemandService;

  beforeAll(() => {
    createDemandService = new CreateDemandService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-demand-role",
      },
    });

    user = await testPrisma.user.create({
      data: {
        name: "Test user",
        email: "user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.demand.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new demand", async () => {
    const newDemand = {
      userId: user.id,
      description: "Test demand",
      keywords: ["test", "demand"],
      status: "pending",
    };

    const demand = await createDemandService.execute(newDemand, testPrisma);

    console.log(demand.keywords);
    console.log(newDemand.keywords);

    expect(demand).toBeDefined();
    expect(demand.id).toBeDefined();
    expect(demand.userId).toBe(newDemand.userId);
    expect(demand.description).toBe(newDemand.description);
    expect(demand.keywords).toStrictEqual(newDemand.keywords);
    expect(demand.status).toBe(newDemand.status);
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidDemand: IDemandRequest = {
      userId: "",
      description: "",
      keywords: [],
      status: "",
    };

    await expect(
      createDemandService.execute(newInvalidDemand, testPrisma),
    ).rejects.toThrow(
      "User ID, description, keywords, and status are required.",
    );
  });

  it("Should throw an error when user dont exists", async () => {
    const newInvalidUserIdDemand: IDemandRequest = {
      userId: "invalid-user-id",
      description: "Test description",
      keywords: ["test", "demand", "invalid-user"],
      status: "pending",
    };

    await expect(
      createDemandService.execute(newInvalidUserIdDemand, testPrisma),
    ).rejects.toThrow("User not found.");
  });

  it("Should throw an error when 5 > description > 255 characters", async () => {
    const newInvalidDescriptionDemand: IDemandRequest = {
      userId: user.id,
      description: "Tes",
      keywords: ["test", "demand", "invalid-description"],
      status: "pending",
    };

    await expect(
      createDemandService.execute(newInvalidDescriptionDemand, testPrisma),
    ).rejects.toThrow("Description must be between 5 and 255 characters long.");
  });

  it("Should throw an error when keywords is not a non-empty array", async () => {
    const newInvalidKeywordsDemand: IDemandRequest = {
      userId: user.id,
      description: "Test keywords demand",
      keywords: [],
      status: "pending",
    };

    await expect(
      createDemandService.execute(newInvalidKeywordsDemand, testPrisma),
    ).rejects.toThrow("Keywords must be provided as a non-empty array.");
  });

  it("Should throw an error when status is not an allowed value", async () => {
    const newInvalidStatusDemand: IDemandRequest = {
      userId: user.id,
      description: "Test status demand",
      keywords: ["test", "demand", "invalid-status"],
      status: "invalid-status",
    };

    await expect(
      createDemandService.execute(newInvalidStatusDemand, testPrisma),
    ).rejects.toThrow("Invalid status value.");
  });
});
