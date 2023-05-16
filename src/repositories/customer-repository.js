import { prisma } from "../config/database.js";

async function createCustomer({ name, email, password }) {
  return await prisma.customer.create({
    data: {
      name,
      email,
      password,
    },
  });
}

async function findCustomerByEmail(email) {
  return await prisma.customer.findFirst({
    where: {
      email,
    },
  });
}

async function findCustomerById(id) {
  return await prisma.customer.findFirst({
    where: {
      id,
    },
  });
}

const customerRepository = {
  createCustomer,
  findCustomerByEmail,
  findCustomerById,
};

export default customerRepository;
