import testPrisma from "lib/testPrisma";
import { DeleteTransactionService } from "services/transaction/DeleteTransactionService";

describe("DELETE /transaction/:id", () => {
  let role;
  let buyer;
  let supplier;
  let product;
  let transaction;
  let deleteTransactionService: DeleteTransactionService;

  beforeAll(() => {
    deleteTransactionService = new DeleteTransactionService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-transaction-delete-role",
      },
    });

    supplier = await testPrisma.user.create({
      data: {
        name: "Test supplier",
        email: "supplier@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    buyer = await testPrisma.user.create({
      data: {
        name: "Test buyer",
        email: "buyer@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    product = await testPrisma.product.create({
      data: {
        productName: "Test transaction delete product",
        price: 200,
      },
    });

    transaction = await testPrisma.transaction.create({
      data: {
        buyerId: buyer.id,
        supplierId: supplier.id,
        productId: product.id,
        quantity: 15,
        totalValue: 3000,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.transaction.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should delete a transaction", async () => {
    const transactionId = transaction.id;
    const deletedTransaction = await deleteTransactionService.execute(
      transactionId,
      testPrisma,
    );

    const transactionAfterDeletion = await testPrisma.transaction.findUnique({
      where: { id: transactionId },
    });

    expect(deletedTransaction).toBeDefined();
    expect(deletedTransaction.id).toBe(transactionId);
    expect(transactionAfterDeletion).toBeNull();
  });

  it("Should throw an error if transaction doesnt exists", async () => {
    const invalidTransactionId = "invalid-transaction-id";

    await expect(
      deleteTransactionService.execute(invalidTransactionId, testPrisma),
    ).rejects.toThrow("Transaction not found.");
  });
});
