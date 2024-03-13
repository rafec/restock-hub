import testPrisma from "lib/testPrisma";
import { FindDemandService } from "services/demand/FindDemandService";

describe("GET /demand/:id", () => {
  let role;
  let user;
  let findDemandService;

  beforeAll(() => {
    findDemandService = new FindDemandService();
  });

  afterEach(async () => {
    await testPrisma.demand.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should find a specific demand by ID", async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-find-demand-role" },
    });

    const user = await testPrisma.user.create({
      data: {
        name: "Test User",
        email: "user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    const newDemand = await testPrisma.demand.create({
      data: {
        userId: user.id,
        description: "Test find user demand.",
        keywords: ["test", "find", "demand"],
        status: "pending",
      },
    });

    const demandId = newDemand.id;

    const demandFound = await findDemandService.execute(demandId, testPrisma);

    expect(demandFound).toBeDefined();
    expect(demandFound.id).toBe(demandId);
  });

  it("Should throw an error when demand is not found", async () => {
    const invalidDemandId = "invalid-demand-id";

    await expect(
      findDemandService.execute(invalidDemandId, testPrisma),
    ).rejects.toThrow("Demand not found.");
  });
});
