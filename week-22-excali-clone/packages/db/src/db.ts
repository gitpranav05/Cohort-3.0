import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}
const adapter = new PrismaPg({
  connectionString
});

export const prismaClient = new PrismaClient({
  adapter,
});
