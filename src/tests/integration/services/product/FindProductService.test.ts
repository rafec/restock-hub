import testPrisma from "lib/testPrisma";
import { FindProductService } from "services/product/FindProductService";

describe("GET /product/:id", () => {
  let findProductService;

  beforeAll(() => {
    findProductService = new FindProductService();
  });

  afterEach(async () => {
    await testPrisma.product.deleteMany();
  });

  it("Should find a specific product by ID", async () => {
    const newProduct = await testPrisma.product.create({
      data: { productName: "Test find product", price: 50 },
    });

    const productId = newProduct.id;

    const productFound = await findProductService.execute(
      productId,
      testPrisma,
    );

    expect(productFound).toBeDefined();
    expect(productFound.id).toBe(productId);
  });

  it("Should throw an error when product is not found", async () => {
    const invalidProductId = "invalid-product-id";

    await expect(
      findProductService.execute(invalidProductId, testPrisma),
    ).rejects.toThrow("Product not found.");
  });
});
