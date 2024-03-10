import testPrisma from "lib/testPrisma";
import { CreateStockService } from "services/stock/CreateStockService";

describe("POST /stock", () => {
  interface IStockRequest {
    supplierId: string;
    productId: string;
    quantity: number;
  }

  let role;
  let supplier;
  let product;
  let createStockService: CreateStockService;

  beforeAll(() => {
    createStockService = new CreateStockService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-stock-role",
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

    product = await testPrisma.product.create({
      data: {
        productName: "Test stock product",
        price: 200,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.stock.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should create a new stock", async () => {
    const newStock = {
      supplierId: supplier.id,
      productId: product.id,
      quantity: 5,
    };

    const stock = await createStockService.execute(newStock, testPrisma);

    expect(stock).toBeDefined();
    expect(stock.supplierId).toBe(newStock.supplierId);
    expect(stock.productId).toBe(newStock.productId);
    expect(stock.quantity).toBe(newStock.quantity);
  });

  it("Should throw an error when stock entry already exists", async () => {
    const newStock = {
      supplierId: supplier.id,
      productId: product.id,
      quantity: 5,
    };

    const existingStock = await createStockService.execute(
      newStock,
      testPrisma,
    );

    const newAlreadyExistingStock = {
      supplierId: supplier.id,
      productId: product.id,
      quantity: 10,
    };

    await expect(
      createStockService.execute(newAlreadyExistingStock, testPrisma),
    ).rejects.toThrow(
      "Stock entry already exists for this supplier and product.",
    );
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidStock: IStockRequest = {
      supplierId: supplier.id,
      productId: "",
      quantity: 5,
    };

    await expect(
      createStockService.execute(newInvalidStock, testPrisma),
    ).rejects.toThrow("Supplier ID, product ID, and quantity are required.");
  });

  it("Should throw an error when supplier dont exists", async () => {
    const newInvalidSupplierIdStock: IStockRequest = {
      supplierId: "invalid-supplier-id",
      productId: product.id,
      quantity: 5,
    };

    await expect(
      createStockService.execute(newInvalidSupplierIdStock, testPrisma),
    ).rejects.toThrow("Supplier not found.");
  });

  it("Should throw an error when product dont exists", async () => {
    const newInvalidSupplierIdStock: IStockRequest = {
      supplierId: supplier.id,
      productId: "invalid-product-id",
      quantity: 5,
    };

    await expect(
      createStockService.execute(newInvalidSupplierIdStock, testPrisma),
    ).rejects.toThrow("Product not found.");
  });

  it("Should throw an error when quantity < 0 and is not integer", async () => {
    const newInvalidQuantityStock: IStockRequest = {
      supplierId: supplier.id,
      productId: product.id,
      quantity: -1,
    };

    await expect(
      createStockService.execute(newInvalidQuantityStock, testPrisma),
    ).rejects.toThrow("Quantity must be an integer, and can't be negative.");
  });
});
