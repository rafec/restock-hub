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
});
