import testPrisma from "lib/testPrisma";
import { FindAllTransactionsService } from "services/transaction/FindAllTransactionsService";

describe("GET /transaction", () => {
  let role;
  let buyer;
  let supplier;
  let product;
  let findAllTransactionsService: FindAllTransactionsService;

  beforeAll(() => {
    findAllTransactionsService = new FindAllTransactionsService();
  });

  afterEach(async () => {
    await testPrisma.transaction.deleteMany();
    await testPrisma.product.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should return all transactions from the database", async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-find-all-transactions-role",
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

    buyer = await testPrisma.user.create({
      data: {
        name: "Test buyer",
        email: "buyer@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    product = await testPrisma.product.create({
      data: {
        productName: "Test find all transactions product",
        price: 200,
      },
    });

    const transactions = await testPrisma.transaction.createMany({
      data: [
        {
          buyerId: buyer.id,
          supplierId: supplier.id,
          productId: product.id,
          quantity: 15,
          totalValue: 3000,
        },
        {
          buyerId: buyer.id,
          supplierId: supplier.id,
          productId: product.id,
          quantity: 10,
          totalValue: 2000,
        },
        {
          buyerId: buyer.id,
          supplierId: supplier.id,
          productId: product.id,
          quantity: 5,
          totalValue: 1000,
        },
      ],
    });

    const allTransactions =
      await findAllTransactionsService.execute(testPrisma);

    expect(allTransactions).toHaveLength(transactions.count);
  });

  it("Should inform when no transactions are registered yet", async () => {
    await testPrisma.transaction.deleteMany();
    const allTransactions =
      await findAllTransactionsService.execute(testPrisma);

    expect(allTransactions).toEqual("There is no transactions registered yet.");
  });
});
