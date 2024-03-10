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
});
