import testPrisma from "lib/testPrisma";
import { UpdateDemandService } from "services/demand/UpdateDemandService";

describe("PUT /demand", () => {
  interface IDemandRequest {
    id: string;
    userId?: string;
    description?: string;
    keywords?: string[];
    status?: string;
  }

  let role;
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
        status: "pending",
      },
    });
  });

  afterEach(async () => {
    await testPrisma.demand.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should update a demand by ID", async () => {
    const updateDemandProperties: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Test description update demand [UPDATED].",
      keywords: ["test", "demand", "updated"],
      status: "approved",
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
    expect(updatedDemand.status).toBe(updateDemandProperties.status);
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
    expect(updatedDemand.status).toBe(existentDemand.status);
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
      status: "pending",
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
      status: "pending",
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
      status: "pending",
    };

    await expect(
      updateDemandService.execute(newInvalidKeywordsDemand, testPrisma),
    ).rejects.toThrow("Keywords must be provided as a non-empty array.");
  });

  it("Should throw an error when status is not an allowed value", async () => {
    const newInvalidStatusDemand: IDemandRequest = {
      id: demand.id,
      userId: user.id,
      description: "Test status demand",
      keywords: ["test", "demand", "invalid-status"],
      status: "invalid-status",
    };

    await expect(
      updateDemandService.execute(newInvalidStatusDemand, testPrisma),
    ).rejects.toThrow("Invalid status value.");
  });
});
