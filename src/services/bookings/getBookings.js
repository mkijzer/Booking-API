import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBookings = async ({ userId }) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  return prisma.booking.findMany({
    where: filter,
  });
};

export default getBookings;
