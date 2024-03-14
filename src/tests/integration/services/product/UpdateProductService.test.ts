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

  it("Should throw an error when 3 > product name < 255", async () => {
    const newInvalidProductNameProduct: IProductRequest = {
      id: product.id,
      productName: "Pr",
      price: 120,
    };

    await expect(
      updateProductService.execute(newInvalidProductNameProduct, testPrisma),
    ).rejects.toThrow(
      "Product name must be between 3 and 255 characters long.",
    );
  });

  it("Should throw an error when price < 0 or is not a number", async () => {
    const newInvalidPriceProduct: IProductRequest = {
      id: product.id,
      productName: "Invalid price product",
      price: -1,
    };

    await expect(
      updateProductService.execute(newInvalidPriceProduct, testPrisma),
    ).rejects.toThrow("Price must be a positive number.");
  });

  it("Should throw an error when description > 1000 characters", async () => {
    const newInvalidDescriptionProduct: IProductRequest = {
      id: product.id,
      productName: "Invalid description product",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices vitae auctor eu augue ut lectus arcu. Sed id semper risus in hendrerit gravida. Mi quis hendrerit dolor magna eget. Mattis aliquam faucibus purus in massa tempor nec feugiat. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Metus vulputate eu scelerisque felis. Nec tincidunt praesent semper feugiat nibh. Vel facilisis volutpat est velit egestas dui. Ultrices in iaculis nunc sed augue lacus viverra vitae. Congue mauris rhoncus aenean vel elit. Turpis egestas integer eget aliquet nibh. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec Sed tempus urna et pharetra pharetra. Malesuada bibendum arcu vitae elementum curabitur. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Sit amet venenatis urna cursus eget",
      price: 120,
    };

    await expect(
      updateProductService.execute(newInvalidDescriptionProduct, testPrisma),
    ).rejects.toThrow("Description must be less than 1000 characters long.");
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
