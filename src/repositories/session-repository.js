import { prisma } from "../config/database.js";

async function create({ token, customerId }) {
  return prisma.session.create({
    data: {
      token,
      customerId,
    },
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
