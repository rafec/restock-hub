import testPrisma from "lib/testPrisma";
import { UpdateDemandService } from "services/demand/UpdateDemandService";

describe("PUT /demand", () => {
  interface IDemandRequest {
    id: string;
    userId?: string;
    description?: string;
    keywords?: string[];
    statusId?: string;
  }

  let role;
  let status;
  let user;
  let demand;
  let updateDemandService: UpdateDemandService;

  beforeAll(() => {
    updateDemandService = new UpdateDemandService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-demand-update-role",
      },
    });

    status = await testPrisma.status.create({
      data: { name: "test-demand-update-status" },
    });

    user = await testPrisma.user.create({
      data: {
        name: "Test user",
        email: "user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    demand = await testPrisma.demand.create({
      data: {
        userId: user.id,
        description: "Test description update demand.",
        keywords: ["test", "update", "demand"],
        statusId: status.id,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.demand.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.status.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should update a demand by ID", async () => {
    const updateDemandProperties: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Test description update demand [UPDATED].",
      keywords: ["test", "demand", "updated"],
      statusId: status.id,
    };

    const updatedDemand = await updateDemandService.execute(
      updateDemandProperties,
      testPrisma,
    );

    expect(updatedDemand).toBeDefined();
    expect(updatedDemand.id).toBeDefined();
    expect(updatedDemand.userId).toBe(updateDemandProperties.userId);
    expect(updatedDemand.description).toBe(updateDemandProperties.description);
    expect(updatedDemand.keywords).toStrictEqual(
      updateDemandProperties.keywords,
    );
    expect(updatedDemand.statusId).toBe(updateDemandProperties.statusId);
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateDemandProperties = {
      id: demand.id,
    };

    const existentDemand = await testPrisma.demand.findUnique({
      where: { id: demand.id },
    });

    const updatedDemand = await updateDemandService.execute(
      updateDemandProperties,
      testPrisma,
    );

    expect(updatedDemand).toBeDefined();
    expect(updatedDemand.id).toBeDefined();
    expect(updatedDemand.userId).toBe(existentDemand.userId);
    expect(updatedDemand.description).toBe(existentDemand.description);
    expect(updatedDemand.keywords).toStrictEqual(existentDemand.keywords);
    expect(updatedDemand.statusId).toBe(existentDemand.statusId);
  });

  it("Should throw an error when demand doesnt exists", async () => {
    const updateDemandProperties: IDemandRequest = {
      id: "invalid-id",
    };

    await expect(
      updateDemandService.execute(updateDemandProperties, testPrisma),
    ).rejects.toThrow("Demand not found.");
  });

  it("Should throw an error when user doesnt exists", async () => {
    const newInvalidUserIdDemand: IDemandRequest = {
      id: demand.id,
      userId: "invalid-user-id",
      description: "Test description",
      keywords: ["test", "demand", "invalid-user"],
      statusId: status.id,
    };

    await expect(
      updateDemandService.execute(newInvalidUserIdDemand, testPrisma),
    ).rejects.toThrow("User not found.");
  });

  it("Should throw an error when 5 > description > 255 characters", async () => {
    const newInvalidDescriptionDemand: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Tes",
      keywords: ["test", "demand", "invalid-description"],
      statusId: status.id,
    };

    await expect(
      updateDemandService.execute(newInvalidDescriptionDemand, testPrisma),
    ).rejects.toThrow("Description must be between 5 and 255 characters long.");
  });

  it("Should throw an error when keywords is not a non-empty array", async () => {
    const newInvalidKeywordsDemand: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Test keywords demand",
      keywords: [],
      statusId: status.id,
    };

    await expect(
      updateDemandService.execute(newInvalidKeywordsDemand, testPrisma),
    ).rejects.toThrow("Keywords must be provided as a non-empty array.");
  });

  it("Should throw an error when keywords is not a non-empty array", async () => {
    const newInvalidKeywordsDemand: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Test keywords demand",
      keywords: ["test", "s", "testing"],
      statusId: status.id,
    };

    await expect(
      updateDemandService.execute(newInvalidKeywordsDemand, testPrisma),
    ).rejects.toThrow("Keyword length must be between 2 and 20 characters.");
  });

  it("Should throw an error when status doesnt exists", async () => {
    const newInvalidStatusDemand: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Test status demand",
      keywords: ["test", "demand", "invalid-status"],
      statusId: "invalid-status",
    };

    await expect(
      updateDemandService.execute(newInvalidStatusDemand, testPrisma),
    ).rejects.toThrow("Status not found.");
  });
});
