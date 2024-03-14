import testPrisma from "lib/testPrisma";
import { UpdateStockService } from "services/stock/UpdateStockService";

describe("PUT /stock", () => {
  interface IStockRequest {
    supplierId?: string;
    productId?: string;
    quantity?: number;
  }

  let role;
  let supplier;
  let anotherSupplier;
  let product;
  let anotherProduct;
  let stock;
  let currentSupplierId;
  let currentProductId;
  let updateStockService: UpdateStockService;

  beforeAll(() => {
    updateStockService = new UpdateStockService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: { roleName: "test-stock-update-role" },
    });

    supplier = await testPrisma.user.create({
      data: {
        name: "Test supplier",
        email: "supplier@mail.com",
        password: "password",
        roleId: role.id,
      },
    });
    anotherSupplier = await testPrisma.user.create({
      data: {
        name: "Test another supplier",
        email: "anothersupplier@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    product = await testPrisma.product.create({
      data: {
        productName: "Test stock update product",
        price: 200,
      },
    });
    anotherProduct = await testPrisma.product.create({
      data: {
        productName: "Test stock update another product",
        price: 400,
      },
    });

    stock = await testPrisma.stock.create({
      data: {
        supplierId: supplier.id,
        productId: product.id,
        quantity: 5,
      },
    });

    currentSupplierId = stock.supplierId;
    currentProductId = stock.productId;
  });

  afterEach(async () => {
    await testPrisma.stock.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should update a stock by ID", async () => {
    const updateStockProperties: IStockRequest = {
      supplierId: anotherSupplier.id,
      productId: anotherProduct.id,
      quantity: 1000,
    };

    const updatedStock = await updateStockService.execute(
      currentSupplierId,
      currentProductId,
      updateStockProperties,
      testPrisma,
    );

    expect(updatedStock).toBeDefined();
    expect(updatedStock.supplierId).toBe(updateStockProperties.supplierId);
    expect(updatedStock.productId).toBe(updateStockProperties.productId);
    expect<String>(updatedStock.quantity.toString()).toBe<String>(
      updateStockProperties.quantity.toString(),
    );
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateStockProperties: IStockRequest = {};
    const stockId = {
      id: {
        supplierId: currentSupplierId,
        productId: currentProductId,
      },
    };

    const existentStock = await testPrisma.stock.findUnique({
      where: stockId,
    });

    const updatedStock = await updateStockService.execute(
      currentSupplierId,
      currentProductId,
      updateStockProperties,
      testPrisma,
    );

    expect(updatedStock).toBeDefined();
    expect(updatedStock.supplierId).toBe(existentStock.supplierId);
    expect(updatedStock.productId).toBe(existentStock.productId);
    expect<String>(updatedStock.quantity.toString()).toBe<String>(
      existentStock.quantity.toString(),
    );
  });

  it("Should throw an error when stock already exists", async () => {
    const updateStockProperties: IStockRequest = {
      supplierId: currentSupplierId,
      productId: currentProductId,
    };

    await expect(
      updateStockService.execute(
        currentSupplierId,
        currentProductId,
        updateStockProperties,
        testPrisma,
      ),
    ).rejects.toThrow(
      "Stock entry already exists for this supplier and product",
    );
  });

  it("Should throw an error when stock doesnt exists", async () => {
    const updateStockProperties = {};
    const invalidCurrentSupplierId = "invalid-current-supplier-id";
    const invalidCurrentProductId = "invalid-current-product-id";

    await expect(
      updateStockService.execute(
        invalidCurrentSupplierId,
        invalidCurrentProductId,
        updateStockProperties,
        testPrisma,
      ),
    ).rejects.toThrow("Stock entry not found.");
  });

  it("Should throw an error when supplier doesnt exists", async () => {
    const newInvalidSupplierIdStock: IStockRequest = {
      supplierId: "invalid-supplier-id",
      productId: anotherProduct.id,
      quantity: 5,
    };

    await expect(
      updateStockService.execute(
        currentSupplierId,
        currentProductId,
        newInvalidSupplierIdStock,
        testPrisma,
      ),
    ).rejects.toThrow(
      "The supplier that will replace the current supplier was not found.",
    );
  });

  it("Should throw an error when product doesnt exists", async () => {
    const newInvalidSupplierIdStock: IStockRequest = {
      supplierId: anotherSupplier.id,
      productId: "invalid-product-id",
      quantity: 5,
    };

    await expect(
      updateStockService.execute(
        currentSupplierId,
        currentProductId,
        newInvalidSupplierIdStock,
        testPrisma,
      ),
    ).rejects.toThrow(
      "The product that will replace the current product was not found.",
    );
  });

  it("Should throw an error when quantity < 0 and is not integer", async () => {
    const newInvalidQuantityStock: IStockRequest = {
      supplierId: anotherSupplier.id,
      productId: anotherProduct.id,
      quantity: -1,
    };

    await expect(
      updateStockService.execute(
        currentSupplierId,
        currentProductId,
        newInvalidQuantityStock,
        testPrisma,
      ),
    ).rejects.toThrow("Quantity must be a positive integer.");
  });
});
