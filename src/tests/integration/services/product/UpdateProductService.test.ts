import testPrisma from "lib/testPrisma";
import { UpdateProductService } from "services/product/UpdateProductService";

describe("PUT /product", () => {
  interface IProductRequest {
    id: string;
    productName?: string;
    description?: string;
    price?: number;
  }

  let product;
  let updateProductService: UpdateProductService;

  beforeAll(() => {
    updateProductService = new UpdateProductService();
  });

  beforeEach(async () => {
    product = await testPrisma.product.create({
      data: { productName: "test-update-product", price: 15 },
    });
  });

  afterEach(async () => {
    await testPrisma.product.deleteMany();
  });

  it("Should update a product by ID", async () => {
    const updateProductProperties: IProductRequest = {
      id: product.id,
      productName: "product-updated",
      price: 20,
    };

    const updatedProduct = await updateProductService.execute(
      updateProductProperties,
      testPrisma,
    );

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.id).toBeDefined();
    expect(updatedProduct.productName).toBe(
      updateProductProperties.productName,
    );
    expect<String>(updatedProduct.price.toString()).toBe<String>(
      updateProductProperties.price.toString(),
    );
  });

  it("Should return the same object when no values are sent to update", async () => {
    const updateProductProperties = {
      id: product.id,
    };

    const existentProduct = await testPrisma.product.findUnique({
      where: { id: product.id },
    });

    const updatedProduct = await updateProductService.execute(
      updateProductProperties,
      testPrisma,
    );

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.id).toBeDefined();
    expect(updatedProduct.id).toBe(existentProduct.id);
    expect(updatedProduct.productName).toBe(existentProduct.productName);
    expect<String>(updatedProduct.price.toString()).toBe<String>(
      existentProduct.price.toString(),
    );
  });

  it("Should throw an error when product doesnt exists", async () => {
    const updateProductProperties: IProductRequest = {
      id: "invalid-id",
      productName: "product-with-invalid-id",
    };

    await expect(
      updateProductService.execute(updateProductProperties, testPrisma),
    ).rejects.toThrow("Product not found.");
  });
});
