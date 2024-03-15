import testPrisma from "lib/testPrisma";
import { CreateStatusService } from "services/status/CreateStatusService";

describe("POST /status", () => {
  interface IStatusRequest {
    name: string;
  }

  let createStatusService;

  beforeAll(() => {
    createStatusService = new CreateStatusService();
  });

  afterEach(async () => {
    await testPrisma.status.deleteMany();
  });

  it("Should create a new status", async () => {
    const newStatus: IStatusRequest = {
      name: "test-status",
    };

    const status = await createStatusService.execute(newStatus, testPrisma);

    expect(status).toBeDefined();
    expect(status.id).toBeDefined();
    expect(status.name).toBe(newStatus.name);
  });
});
