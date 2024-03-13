import testPrisma from "lib/testPrisma";
import { FindStockService } from "services/stock/FindStockService";

describe("GET /stock/:id", () => {
  let role;
  let supplier;
  let product;
  let findStockService;

  beforeAll(() => {
    findStockService = new FindStockService();
  });

  afterEach(async () => {
    await testPrisma.stock.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should find a specific stock by ID", async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-find-stock-role",
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
        productName: "Test find stock product",
        price: 200,
      },
    });

    const newStock = await testPrisma.stock.create({
      data: {
        supplierId: supplier.id,
        productId: product.id,
        quantity: 10,
      },
    });

    const stockId = {
      supplierId: newStock.supplierId,
      productId: newStock.productId,
    };

    const stockFound = await findStockService.execute(stockId, testPrisma);

    expect(stockFound).toBeDefined();
    expect(stockFound.supplierId).toBe(stockId.supplierId);
    expect(stockFound.productId).toBe(stockId.productId);
  });

  it("Should throw an error when stock is not found", async () => {
    const invalidStockId = {
      supplierId: "invalid-supplier-id",
      productId: "invalid-product-id",
    };

    await expect(
      findStockService.execute(invalidStockId, testPrisma),
    ).rejects.toThrow("Stock not found.");
  });
});
