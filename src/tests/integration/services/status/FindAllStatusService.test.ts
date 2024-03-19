import testPrisma from "lib/testPrisma";
import { FindAllStatusService } from "services/status/FindAllStatusService";

describe("GET /status", () => {
  let findAllStatusService: FindAllStatusService;

  beforeAll(() => {
    findAllStatusService = new FindAllStatusService();
  });

  afterEach(async () => {
    await testPrisma.status.deleteMany();
  });

  it("Should return all status from the database", async () => {
    const status = await testPrisma.status.createMany({
      data: [
        { name: "test-find-all-status-1" },
        { name: "test-find-all-status-2" },
        { name: "test-find-all-status-3" },
      ],
    });

    const allStatus = await findAllStatusService.execute(testPrisma);

    expect(allStatus).toHaveLength(status.count);
  });

  it("Should inform when no status are registered yet", async () => {
    await testPrisma.status.deleteMany();
    const allStatus = await findAllStatusService.execute(testPrisma);

    expect(allStatus).toEqual("There is no status registered yet.");
  });
});
