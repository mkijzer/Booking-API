import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const updatedReview = await prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  if (!updatedReview || updatedReview.count === 0) {
    throw new Error(`Review with id ${id} not found`);
  }

  return {
    message: `Review with id ${id} was updated!`,
  };
};

export default updateReviewById;
