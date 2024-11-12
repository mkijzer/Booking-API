import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  // Check if the booking exists
  const bookingExists = await prisma.booking.findUnique({
    where: { id },
  });

  if (!bookingExists) {
    throw new Error(`Booking with id ${id} not found`);
  }

  // Update the booking details
  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return {
    message: `Booking with id ${id} was updated!`,
    updatedBooking,
  };
};

export default updateBookingById;
