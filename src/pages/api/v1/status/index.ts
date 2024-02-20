import { Request, Response } from "express";
import prisma from "src/lib/prisma";

async function status(request: Request, response: Response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await prisma.$queryRaw`SHOW server_version;`;
  const databaseVersionValue = databaseVersionResult[0].server_version;

  const databaseMaxConnectionsResult =
    await prisma.$queryRaw`SHOW max_connections;`;
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult =
    await prisma.$queryRaw`SELECT count(*)::int FROM pg_stat_activity WHERE datname = ${databaseName}`;
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
