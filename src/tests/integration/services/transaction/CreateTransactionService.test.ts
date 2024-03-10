import testPrisma from "lib/testPrisma";
import { CreateTransactionService } from "services/transaction/CreateTransactionService";

describe("POST /transaction", () => {
  interface ITransactionRequest {
    buyerId: string;
    supplierId: string;
    productId: string;
    quantity: number;
    totalValue: number;
  }

  let role;
  let buyer;
  let supplier;
  let product;
  let createTransactionService: CreateTransactionService;

  beforeAll(() => {
    createTransactionService = new CreateTransactionService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-transaction-role",
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
        productName: "Test transaction product",
        price: 200,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.transaction.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new transaction", async () => {
    const newTransaction: ITransactionRequest = {
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: product.id,
      quantity: 15,
      totalValue: 3000,
    };

    const transaction = await createTransactionService.execute(
      newTransaction,
      testPrisma,
    );

    expect(transaction).toBeDefined();
    expect(transaction.id).toBeDefined();
    expect(transaction.buyerId).toBe(newTransaction.buyerId);
    expect(transaction.supplierId).toBe(newTransaction.supplierId);
    expect(transaction.quantity).toBe(newTransaction.quantity);
    expect(parseInt(transaction.totalValue)).toBe(newTransaction.totalValue);
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidTransaction: ITransactionRequest = {
      buyerId: "",
      supplierId: "",
      productId: "",
      quantity: 0,
      totalValue: 0,
    };

    await expect(
      createTransactionService.execute(newInvalidTransaction, testPrisma),
    ).rejects.toThrow(
      "Buyer ID, supplier ID, product ID, quantity, and total value are required.",
    );
  });

  it("Should throw an error when buyer dont exists", async () => {
    const newInvalidBuyerIdTransaction: ITransactionRequest = {
      buyerId: "invalid-buyer-id",
      supplierId: supplier.id,
      productId: product.id,
      quantity: 15,
      totalValue: 3000,
    };

    await expect(
      createTransactionService.execute(
        newInvalidBuyerIdTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Buyer not found.");
  });

  it("Should throw an error when supplier dont exists", async () => {
    const newInvalidSupplierIdTransaction: ITransactionRequest = {
      buyerId: buyer.id,
      supplierId: "invalid-supplier-id",
      productId: product.id,
      quantity: 15,
      totalValue: 3000,
    };

    await expect(
      createTransactionService.execute(
        newInvalidSupplierIdTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Supplier not found.");
  });

  it("Should throw an error when product dont exists", async () => {
    const newInvalidProductIdTransaction: ITransactionRequest = {
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: "invalid-product-id",
      quantity: 15,
      totalValue: 3000,
    };

    await expect(
      createTransactionService.execute(
        newInvalidProductIdTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Product not found.");
  });

  it("Should throw an error when quantity <= 0 and is not integer", async () => {
    const newInvalidQuantityTransaction: ITransactionRequest = {
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: product.id,
      quantity: -1,
      totalValue: 3000,
    };

    await expect(
      createTransactionService.execute(
        newInvalidQuantityTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Quantity must be a positive integer.");
  });

  it("Should throw an error when totalValue <= 0", async () => {
    const newInvalidTotalValueTransaction: ITransactionRequest = {
      buyerId: buyer.id,
      supplierId: supplier.id,
      productId: product.id,
      quantity: 15,
      totalValue: -1,
    };

    await expect(
      createTransactionService.execute(
        newInvalidTotalValueTransaction,
        testPrisma,
      ),
    ).rejects.toThrow("Total value must be a positive decimal number.");
  });
});
