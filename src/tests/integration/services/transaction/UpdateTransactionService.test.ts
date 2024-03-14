import testPrisma from "lib/testPrisma";
import { UpdateTransactionService } from "services/transaction/UpdateTransactionService";

describe("PUT /transaction", () => {
  interface ITransactionRequest {
    id: string;
    buyerId?: string;
    supplierId?: string;
    productId?: string;
    quantity?: number;
    totalValue?: number;
  }

  let role;
  let buyer;
  let supplier;
  let product;
  let transaction;
  let updateTransactionService: UpdateTransactionService;

  beforeAll(() => {
    updateTransactionService = new UpdateTransactionService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-transaction-update-role",
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
        productName: "Test transaction update product",
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

  it("Should update a transaction by ID", async () => {
    const updateTransactionProperties: ITransactionRequest = {
      id: transaction.id,
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: product.id,
      quantity: 20,
      totalValue: 4000,
    };

    const updatedTransaction = await updateTransactionService.execute(
      updateTransactionProperties,
      testPrisma,
    );

    expect(updatedTransaction).toBeDefined();
    expect(updatedTransaction.id).toBeDefined();
    expect(updatedTransaction.buyerId).toBe(
      updateTransactionProperties.buyerId,
    );
    expect(updatedTransaction.supplierId).toBe(
      updateTransactionProperties.supplierId,
    );
    expect(updatedTransaction.productId).toBe(
      updateTransactionProperties.productId,
    );
    expect<String>(updatedTransaction.quantity.toString()).toBe<String>(
      updateTransactionProperties.quantity.toString(),
    );
    expect<String>(updatedTransaction.totalValue.toString()).toBe<String>(
      updateTransactionProperties.totalValue.toString(),
    );
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateTransactionProperties = {
      id: transaction.id,
    };

    const existentTransaction = await testPrisma.transaction.findUnique({
      where: { id: transaction.id },
    });

    const updatedTransaction = await updateTransactionService.execute(
      updateTransactionProperties,
      testPrisma,
    );

    expect(updatedTransaction).toBeDefined();
    expect(updatedTransaction.id).toBeDefined();
    expect(updatedTransaction.buyerId).toBe(existentTransaction.buyerId);
    expect(updatedTransaction.supplierId).toBe(existentTransaction.supplierId);
    expect(updatedTransaction.productId).toBe(existentTransaction.productId);
    expect<String>(updatedTransaction.quantity.toString()).toBe<String>(
      existentTransaction.quantity.toString(),
    );
    expect<String>(updatedTransaction.totalValue.toString()).toBe<String>(
      existentTransaction.totalValue.toString(),
    );
  });

  it("Should throw an error when transaction doesnt exists", async () => {
    const updateTransactionProperties: ITransactionRequest = {
      id: "invalid-id",
    };

    await expect(
      updateTransactionService.execute(updateTransactionProperties, testPrisma),
    ).rejects.toThrow("Transaction not found.");
  });
});
