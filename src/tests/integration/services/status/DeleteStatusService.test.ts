import testPrisma from "lib/testPrisma";
import { DeleteStatusService } from "services/status/DeleteStatusService";

describe("DELETE /status/:id", () => {
  let status;
  let deleteStatusService: DeleteStatusService;

  beforeAll(() => {
    deleteStatusService = new DeleteStatusService();
  });

  beforeEach(async () => {
    status = await testPrisma.status.create({
      data: { name: "test-delete-status" },
    });
  });

  afterEach(async () => {
    await testPrisma.status.deleteMany();
  });

  it("Should delete a status", async () => {
    const statusId = status.id;
    const deletedStatus = await deleteStatusService.execute(
      statusId,
      testPrisma,
    );

    const statusAfterDeletion = await testPrisma.status.findUnique({
      where: { id: statusId },
    });

    expect(deletedStatus).toBeDefined();
    expect(deletedStatus.id).toBe(statusId);
    expect(statusAfterDeletion).toBeNull();
  });

  it("Should throw an error if status doesnt exists", async () => {
    const invalidStatusId = "invalid-status-id";

    await expect(
      deleteStatusService.execute(invalidStatusId, testPrisma),
    ).rejects.toThrow("Status not found.");
  });
});
