import testPrisma from "lib/testPrisma";
import { DeleteStockService } from "services/stock/DeleteStockService";

describe("DELETE /stock/:id", () => {
  let role;
  let supplier;
  let product;
  let stock;
  let deleteStockService: DeleteStockService;

  beforeAll(() => {
    deleteStockService = new DeleteStockService();
  });

  beforeEach(async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-stock-delete-role",
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
        productName: "Test stock delete product",
        price: 200,
      },
    });

    stock = await testPrisma.stock.create({
      data: {
        supplierId: supplier.id,
        productId: product.id,
        quantity: 5,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.stock.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should delete a stock", async () => {
    const stockId = {
      supplierId: supplier.id,
      productId: product.id,
    };
    const deletedStock = await deleteStockService.execute(stockId, testPrisma);

    const stockAfterDeletion = await testPrisma.stock.findUnique({
      where: { id: stockId },
    });

    expect(deletedStock).toBeDefined();
    expect(deletedStock.supplierId).toBe(stockId.supplierId);
    expect(deletedStock.productId).toBe(stockId.productId);
    expect(stockAfterDeletion).toBeNull();
  });

  it("Should throw an error if stock doesnt exists", async () => {
    const invalidStockId = {
      supplierId: "invalid-supplier-id",
      productId: "invalid-product-id",
    };

    await expect(
      deleteStockService.execute(invalidStockId, testPrisma),
    ).rejects.toThrow("Stock entry not found.");
  });
});
