import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }
declare global {
  interface GlobalThis {
    prisma?: PrismaClient;
  }
}

const client = (globalThis as GlobalThis).prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") (globalThis as GlobalThis).prisma = client;

export default client;
