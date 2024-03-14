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

  it("Should throw an error when buyer doesnt exists", async () => {
    const newInvalidBuyerIdTransaction: ITransactionRequest = {
      id: transaction.id,
      buyerId: "invalid-buyer-id",
      supplierId: supplier.id,
      productId: product.id,
      quantity: 15,
      totalValue: 3000,
    };

    await expect(
      updateTransactionService.execute(
        newInvalidBuyerIdTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Buyer not found.");
  });

  it("Should throw an error when supplier doesnt exists", async () => {
    const newInvalidSupplierIdTransaction: ITransactionRequest = {
      id: transaction.id,
      buyerId: buyer.id,
      supplierId: "invalid-supplier-id",
      productId: product.id,
      quantity: 15,
      totalValue: 3000,
    };

    await expect(
      updateTransactionService.execute(
        newInvalidSupplierIdTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Supplier not found.");
  });

  it("Should throw an error when product doesnt exists", async () => {
    const newInvalidProductIdTransaction: ITransactionRequest = {
      id: transaction.id,
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: "invalid-product-id",
      quantity: 15,
      totalValue: 3000,
    };

    await expect(
      updateTransactionService.execute(
        newInvalidProductIdTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Product not found.");
  });

  it("Should throw an error when quantity <= 0 and is not integer", async () => {
    const newInvalidQuantityTransaction: ITransactionRequest = {
      id: transaction.id,
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: product.id,
      quantity: -1,
      totalValue: 3000,
    };

    await expect(
      updateTransactionService.execute(
        newInvalidQuantityTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Quantity must be a positive integer.");
  });

  it("Should throw an error when totalValue <= 0", async () => {
    const newInvalidTotalValueTransaction: ITransactionRequest = {
      id: transaction.id,
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: product.id,
      quantity: 15,
      totalValue: -1,
    };

    await expect(
      updateTransactionService.execute(
        newInvalidTotalValueTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Total value must be a positive decimal number.");
  });
});
