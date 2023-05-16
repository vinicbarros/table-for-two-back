import { PrismaClient } from "@prisma/client";

export let prisma = new PrismaClient();

export async function connectDb() {
  prisma = new PrismaClient();
}

export async function disconnectDb() {
  await prisma?.$disconnect;
}
