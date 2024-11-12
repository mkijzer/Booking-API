import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getReviews = async () => {
  return prisma.review.findMany();
};

export default getReviews;
