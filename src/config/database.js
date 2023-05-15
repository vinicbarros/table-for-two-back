import { PrismaClient } from "@prisma/client";

export let prisma;

export async function connectDb() {
  prisma = new PrismaClient();
}

export async function disconnectDb() {
  await prisma?.$disconnect;
}
