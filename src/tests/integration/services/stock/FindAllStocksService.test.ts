import testPrisma from "lib/testPrisma";
import { FindAllStocksService } from "services/stock/FindAllStocksService";

describe("GET /stock", () => {
  let role;
  let supplier;
  let products = [];
  let findAllStocksService: FindAllStocksService;

  beforeAll(() => {
    findAllStocksService = new FindAllStocksService();
  });

  afterEach(async () => {
    await testPrisma.stock.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should return all stocks from the database", async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-find-all-stocks-role",
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

    products.push(
      await testPrisma.product.create({
        data: { productName: "Test find all stocks product 1", price: 200 },
      }),
    );
    products.push(
      await testPrisma.product.create({
        data: { productName: "Test find all stocks product 2", price: 200 },
      }),
    );
    products.push(
      await testPrisma.product.create({
        data: { productName: "Test find all stocks product 3", price: 200 },
      }),
    );

    console.log(products);

    const stocks = await testPrisma.stock.createMany({
      data: [
        { supplierId: supplier.id, productId: products[0].id, quantity: 10 },
        { supplierId: supplier.id, productId: products[1].id, quantity: 11 },
        { supplierId: supplier.id, productId: products[2].id, quantity: 12 },
      ],
    });

    const allStocks = await findAllStocksService.execute(testPrisma);

    expect(allStocks).toHaveLength(stocks.count);
  });

  it("Should inform when no stocks are registered yet", async () => {
    await testPrisma.stock.deleteMany();
    const allStocks = await findAllStocksService.execute(testPrisma);

    expect(allStocks).toEqual("There is no stocks registered yet.");
  });
});
