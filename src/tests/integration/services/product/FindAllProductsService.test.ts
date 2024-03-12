import testPrisma from "lib/testPrisma";
import { FindAllProductsService } from "services/product/FindAllProductsService";

describe("GET /product", () => {
  let findAllProductsService: FindAllProductsService;

  beforeAll(() => {
    findAllProductsService = new FindAllProductsService();
  });

  afterEach(async () => {
    await testPrisma.product.deleteMany();
  });

  it("Should return all products from the database", async () => {
    const products = await testPrisma.product.createMany({
      data: [
        { productName: "Test product 1", price: 100 },
        { productName: "Test product 2", price: 110 },
        { productName: "Test product 3", price: 120 },
      ],
    });

    const allProducts = await findAllProductsService.execute(testPrisma);

    expect(allProducts).toHaveLength(products.count);
  });

  it("Should inform when no products are registered yet", async () => {
    await testPrisma.product.deleteMany();
    const allProducts = await findAllProductsService.execute(testPrisma);

    expect(allProducts).toEqual("There is no products registered yet.");
  });
});
