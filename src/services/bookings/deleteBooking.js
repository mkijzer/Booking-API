import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteBooking = async (id) => {
  const deletedBooking = await prisma.booking.deleteMany({
    where: { id },
  });

  if (!deletedBooking || deletedBooking.count === 0) {
    throw new Error(`Booking with id ${id} not found`);
  }

  return id;
};

export default deleteBooking;
