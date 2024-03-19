import testPrisma from "lib/testPrisma";
import { FindStatusService } from "services/status/FindStatusService";

describe("GET /status/:id", () => {
  let findStatusService;

  beforeAll(() => {
    findStatusService = new FindStatusService();
  });

  afterEach(async () => {
    await testPrisma.status.deleteMany();
  });

  it("Should find a specific status by ID", async () => {
    const newStatus = await testPrisma.status.create({
      data: { name: "test-find-status" },
    });

    const statusId = newStatus.id;

    const statusFound = await findStatusService.execute(statusId, testPrisma);

    expect(statusFound).toBeDefined();
    expect(statusFound.id).toBe(statusId);
    expect(statusFound.name).toBe(newStatus.name);
  });

  it("Should throw an error when status is not found", async () => {
    const invalidStatusId = "invalid-status-id";

    await expect(
      findStatusService.execute(invalidStatusId, testPrisma),
    ).rejects.toThrow("Status not found.");
  });
});
