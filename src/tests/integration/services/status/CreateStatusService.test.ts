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

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidStatus: IStatusRequest = {
      name: "",
    };

    await expect(
      createStatusService.execute(newInvalidStatus, testPrisma),
    ).rejects.toThrow("Invalid status name.");
  });

  it("Should throw an error when status already exists", async () => {
    const newStatus: IStatusRequest = {
      name: "test-existing-status",
    };

    const existingStatus = await createStatusService.execute(
      newStatus,
      testPrisma,
    );

    await expect(
      createStatusService.execute(newStatus, testPrisma),
    ).rejects.toThrow("Status already exists.");
  });

  it("Should throw an error when status name isnt between 2 and 25 characters long", async () => {
    const newStatus: IStatusRequest = {
      name: "R",
    };

    await expect(
      createStatusService.execute(newStatus, testPrisma),
    ).rejects.toThrow("Status name must be between 2 and 25 characters long.");
  });
});
