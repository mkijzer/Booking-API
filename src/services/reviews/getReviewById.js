import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getReviewById = async (id) => {
  return prisma.review.findUnique({
    where: {
      id,
    },
  });
};

export default getReviewById;
