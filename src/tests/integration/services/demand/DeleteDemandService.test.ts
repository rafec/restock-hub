import testPrisma from "lib/testPrisma";
import { DeleteDemandService } from "services/demand/DeleteDemandService";

describe("DELETE /demand/:id", () => {
  let role;
  let status;
  let user;
  let demand;
  let deleteDemandService: DeleteDemandService;

  beforeAll(() => {
    deleteDemandService = new DeleteDemandService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-demand-delete-role",
      },
    });

    status = await testPrisma.status.create({
      data: { name: "test-delete-demand-status" },
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
        description: "Test description delete demand.",
        keywords: ["test", "delete", "demand"],
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

  it("Should delete a demand", async () => {
    const demandId = demand.id;
    const deletedDemand = await deleteDemandService.execute(
      demandId,
      testPrisma,
    );

    const demandAfterDeletion = await testPrisma.demand.findUnique({
      where: { id: demandId },
    });

    expect(deletedDemand).toBeDefined();
    expect(deletedDemand.id).toBe(demandId);
    expect(demandAfterDeletion).toBeNull();
  });

  it("Should throw an error if demand doesnt exists", async () => {
    const invalidDemandId = "invalid-demand-id";

    await expect(
      deleteDemandService.execute(invalidDemandId, testPrisma),
    ).rejects.toThrow("Demand not found.");
  });
});
