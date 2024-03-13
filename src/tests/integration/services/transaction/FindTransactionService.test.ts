import testPrisma from "lib/testPrisma";
import { FindTransactionService } from "services/transaction/FindTransactionService";

describe("GET /transaction/:id", () => {
  let role;
  let buyer;
  let supplier;
  let product;
  let findTransactionService;

  beforeAll(() => {
    findTransactionService = new FindTransactionService();
  });

  afterEach(async () => {
    await testPrisma.transaction.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should find a specific transaction by ID", async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-find-transaction-role",
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
        productName: "Test find transaction product",
        price: 200,
      },
    });

    const newTransaction = await testPrisma.transaction.create({
      data: {
        buyerId: buyer.id,
        supplierId: supplier.id,
        productId: product.id,
        quantity: 15,
        totalValue: 3000,
      },
    });

    const transactionId = newTransaction.id;

    const transactionFound = await findTransactionService.execute(
      transactionId,
      testPrisma,
    );

    expect(transactionFound).toBeDefined();
    expect(transactionFound.id).toBe(transactionId);
  });

  it("Should throw an error when transaction is not found", async () => {
    const invalidTransactionId = "invalid-transaction-id";

    await expect(
      findTransactionService.execute(invalidTransactionId, testPrisma),
    ).rejects.toThrow("Transaction not found.");
  });
});
