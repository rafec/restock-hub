import testPrisma from "src/lib/testPrisma";
import { CreateProductService } from "src/services/product/CreateProductService";

describe("POST /product", () => {
  interface IProductRequest {
    productName: string;
    description?: string;
    price: number;
  }

  let createProductService: CreateProductService;

  beforeAll(() => {
    createProductService = new CreateProductService();
  });

  afterEach(async () => {
    await testPrisma.product.deleteMany();
  });

  it("Should create a new product", async () => {
    const newProduct: IProductRequest = {
      productName: "Test product",
      price: 120,
    };

    const product = await createProductService.execute(newProduct, testPrisma);

    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    expect(product.productName).toBe(newProduct.productName);
    expect(parseInt(product.price)).toBe(newProduct.price);
  });

  it("Should throw an error when required fields are missing", async () => {
    const newInvalidProduct: IProductRequest = {
      productName: "",
      price: 120,
    };

    await expect(
      createProductService.execute(newInvalidProduct, testPrisma),
    ).rejects.toThrow("Product name and price are required.");
  });

  it("Should throw an error when 3 > product name < 255", async () => {
    const newInvalidProductNameProduct: IProductRequest = {
      productName: "Pr",
      price: 120,
    };

    await expect(
      createProductService.execute(newInvalidProductNameProduct, testPrisma),
    ).rejects.toThrow(
      "Product name must be between 3 and 255 characters long.",
    );
  });

  it("Should throw an error when price < 0 or is not a number", async () => {
    const newInvalidPriceProduct = {
      productName: "Invalid price product",
      price: -1,
    };

    await expect(
      createProductService.execute(newInvalidPriceProduct, testPrisma),
    ).rejects.toThrow("Price must be a positive number.");
  });

  it("Should throw an error when description > 1000 characters", async () => {
    const newInvalidDescriptionProduct = {
      productName: "Invalid description product",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices vitae auctor eu augue ut lectus arcu. Sed id semper risus in hendrerit gravida. Mi quis hendrerit dolor magna eget. Mattis aliquam faucibus purus in massa tempor nec feugiat. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Metus vulputate eu scelerisque felis. Nec tincidunt praesent semper feugiat nibh. Vel facilisis volutpat est velit egestas dui. Ultrices in iaculis nunc sed augue lacus viverra vitae. Congue mauris rhoncus aenean vel elit. Turpis egestas integer eget aliquet nibh. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec Sed tempus urna et pharetra pharetra. Malesuada bibendum arcu vitae elementum curabitur. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Sit amet venenatis urna cursus eget",
      price: 120,
    };

    await expect(
      createProductService.execute(newInvalidDescriptionProduct, testPrisma),
    ).rejects.toThrow("Description must be less than 1000 characters long.");
  });
});
