import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBookingById = async (id) => {
  return prisma.booking.findUnique({
    where: {
      id,
    },
  });
};

export default getBookingById;
