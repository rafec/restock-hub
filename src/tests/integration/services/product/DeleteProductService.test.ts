import testPrisma from "lib/testPrisma";
import { DeleteProductService } from "services/product/DeleteProductService";

describe("DELETE /product/:id", () => {
  let product;
  let deleteProductService: DeleteProductService;

  beforeAll(() => {
    deleteProductService = new DeleteProductService();
  });

  beforeEach(async () => {
    product = await testPrisma.product.create({
      data: {
        productName: "Test delete product",
        price: 120,
      },
    });
  });

  afterEach(async () => {
    await testPrisma.product.deleteMany();
  });

  it("Should delete a product", async () => {
    const productId = product.id;
    const deletedProduct = await deleteProductService.execute(
      productId,
      testPrisma,
    );

    const productAfterDeletion = await testPrisma.product.findUnique({
      where: { id: productId },
    });

    expect(deletedProduct).toBeDefined();
    expect(deletedProduct.id).toBe(productId);
    expect(productAfterDeletion).toBeNull();
  });

  it("Should throw an error if product doesnt exists", async () => {
    const invalidProductId = "invalid-product-id";

    await expect(
      deleteProductService.execute(invalidProductId, testPrisma),
    ).rejects.toThrow("Product not found.");
  });
});
