import testPrisma from "lib/testPrisma";
import { CreateDemandService } from "services/demand/CreateDemandService";

describe("POST /demand", () => {
  interface IDemandRequest {
    userId: string;
    description: string;
    keywords: string[];
    statusId: string;
  }

  let role;
  let status;
  let user;
  let createDemandService: CreateDemandService;

  beforeAll(() => {
    createDemandService = new CreateDemandService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-demand-role" },
    });

    status = await testPrisma.status.create({
      data: { name: "test-demand-status" },
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
    await testPrisma.status.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new demand", async () => {
    const newDemand: IDemandRequest = {
      userId: user.id,
      description: "Test demand",
      keywords: ["test", "demand"],
      statusId: status.id,
    };

    const validStatusValues = await testPrisma.status.findMany();
    console.log(validStatusValues);

    const demand = await createDemandService.execute(newDemand, testPrisma);

    expect(demand).toBeDefined();
    expect(demand.id).toBeDefined();
    expect(demand.userId).toBe(newDemand.userId);
    expect(demand.description).toBe(newDemand.description);
    expect(demand.keywords).toStrictEqual(newDemand.keywords);
    expect(demand.statusId).toBe(newDemand.statusId);
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidDemand: IDemandRequest = {
      userId: "",
      description: "",
      keywords: [],
      statusId: "",
    };

    await expect(
      createDemandService.execute(newInvalidDemand, testPrisma),
    ).rejects.toThrow(
      "User ID, description, keywords, and status ID are required.",
    );
  });

  it("Should throw an error when user doesnt exists", async () => {
    const newInvalidUserIdDemand: IDemandRequest = {
      userId: "invalid-user-id",
      description: "Test description",
      keywords: ["test", "demand", "invalid-user"],
      statusId: status.id,
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
      statusId: status.id,
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
      statusId: status.id,
    };

    await expect(
      createDemandService.execute(newInvalidKeywordsDemand, testPrisma),
    ).rejects.toThrow("Keywords must be provided as a non-empty array.");
  });

  it("Should throw an error when status doesnt exists", async () => {
    const newInvalidStatusDemand: IDemandRequest = {
      userId: user.id,
      description: "Test status demand",
      keywords: ["test", "demand", "invalid-status"],
      statusId: "invalid-status",
    };

    await expect(
      createDemandService.execute(newInvalidStatusDemand, testPrisma),
    ).rejects.toThrow("Status not found.");
  });
});
