import { PrismaClient } from "@prisma/client/extension";

/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

// const client = globalThis.prisma || new PrismaClient();
const client = globalThis.prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
