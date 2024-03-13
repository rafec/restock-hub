import testPrisma from "lib/testPrisma";
import { FindAllDemandsService } from "services/demand/FindAllDemandsService";

describe("GET /demand", () => {
  let role;
  let user;
  let findAllDemandsService: FindAllDemandsService;

  beforeAll(() => {
    findAllDemandsService = new FindAllDemandsService();
  });

  afterEach(async () => {
    await testPrisma.demand.deleteMany();
    await testPrisma.user.deleteMany();
    await testPrisma.role.deleteMany();
  });

  it("Should return all demands from the database", async () => {
    role = await testPrisma.role.create({
      data: {
        roleName: "test-find-all-demands-role",
      },
    });

    user = await testPrisma.user.create({
      data: {
        name: "Test user",
        email: "user@mail.com",
        password: "password",
        roleId: role.id,
      },
    });

    const demands = await testPrisma.demand.createMany({
      data: [
        {
          userId: user.id,
          description: "Test description find all demands 1.",
          keywords: ["test", "delete", "demand-1"],
          status: "pending",
        },
        {
          userId: user.id,
          description: "Test description find all demands 2.",
          keywords: ["test", "delete", "demand-2"],
          status: "pending",
        },
        {
          userId: user.id,
          description: "Test description find all demands 3.",
          keywords: ["test", "delete", "demand-3"],
          status: "pending",
        },
      ],
    });

    const allDemands = await findAllDemandsService.execute(testPrisma);

    expect(allDemands).toHaveLength(demands.count);
  });

  it("Should inform when no demands are registered yet", async () => {
    await testPrisma.demand.deleteMany();
    const allDemands = await findAllDemandsService.execute(testPrisma);

    expect(allDemands).toEqual("There is no demands registered yet.");
  });
});
