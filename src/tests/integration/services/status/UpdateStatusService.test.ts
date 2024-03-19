import testPrisma from "lib/testPrisma";
import { UpdateStatusService } from "services/status/UpdateStatusService";

describe("PUT /status", () => {
  interface IStatusRequest {
    id: string;
    name?: string;
  }

  let status;
  let updateStatusService: UpdateStatusService;

  beforeAll(() => {
    updateStatusService = new UpdateStatusService();
  });

  beforeEach(async () => {
    status = await testPrisma.status.create({
      data: { name: "test-update-status" },
    });
  });

  afterEach(async () => {
    await testPrisma.status.deleteMany();
  });

  it("Should update a status by ID", async () => {
    const updateStatusProperties: IStatusRequest = {
      id: status.id,
      name: "status-updated",
    };

    const updatedStatus = await updateStatusService.execute(
      updateStatusProperties,
      testPrisma,
    );

    expect(updatedStatus).toBeDefined();
    expect(updatedStatus.id).toBeDefined();
    expect(updatedStatus.name).toBe(updateStatusProperties.name);
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateStatusProperties = {
      id: status.id,
    };

    const existentStatus = await testPrisma.status.findUnique({
      where: { id: status.id },
    });

    const updatedStatus = await updateStatusService.execute(
      updateStatusProperties,
      testPrisma,
    );

    expect(updatedStatus).toBeDefined();
    expect(updatedStatus.id).toBeDefined();
    expect(updatedStatus.id).toBe(existentStatus.id);
    expect(updatedStatus.name).toBe(existentStatus.name);
  });

  it("Should throw an error when status already exists", async () => {
    const updateStatusProperties: IStatusRequest = {
      id: status.id,
      name: status.name,
    };

    await expect(
      updateStatusService.execute(updateStatusProperties, testPrisma),
    ).rejects.toThrow("Status already exists.");
  });

  it("Should throw an error when status doesnt exists", async () => {
    const updateStatusProperties: IStatusRequest = {
      id: "invalid-id",
      name: "status-with-invalid-id",
    };

    await expect(
      updateStatusService.execute(updateStatusProperties, testPrisma),
    ).rejects.toThrow("Status not found.");
  });

  it("Should throw an error when status name isnt between 2 and 25 characters long", async () => {
    const updateStatusProperties: IStatusRequest = {
      id: status.id,
      name: "R",
    };

    await expect(
      updateStatusService.execute(updateStatusProperties, testPrisma),
    ).rejects.toThrow("Status name must be between 2 and 25 characters long.");
  });
});
