import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateBookingById = async (
  id,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const existingBooking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!existingBooking) {
    throw new Error(`Booking with id ${id} not found`);
  }

  return await prisma.booking.update({
    where: { id },
    data: {
      ...existingBooking,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default updateBookingById;
