import app from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = 3000;

try {
  await prisma.$connect();
  console.log("Connected to database.");

  app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
} catch (error) {
  console.log("Error connecting to database: ", error);
  process.exit(1);
}
