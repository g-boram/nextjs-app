import { PrismaClient } from "@prisma/client/extension";

declare global {
  var prisma: PrismaClient | undefined;
}

// const client = globalThis.prisma || new PrismaClient();
const client = globalThis.prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
