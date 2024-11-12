import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteReview = async (id) => {
  const deletedReview = await prisma.review.deleteMany({
    where: { id },
  });

  if (!deletedReview || deletedReview.count === 0) {
    throw new Error(`Review with id ${id} not found`);
  }

  return id;
};

export default deleteReview;
