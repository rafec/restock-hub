import testPrisma from "src/lib/testPrisma";
import { CreateStockService } from "src/services/stock/CreateStockService";

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
});
