import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET ALL BOOKINGS, optionally filtered by userId
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while retrieving bookings.");
  }
});

// GET BOOKING BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      return res.status(404).send(`Booking with id ${id} not found`);
    }
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

// CREATE BOOKING
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

// EDIT BOOKING
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const updatedBooking = await updateBookingById(
      id,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
});

// DELETE BOOKING
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await deleteBooking(id);

    if (!deletedBooking) {
      throw new Error(`Booking with id ${id} was not found`);
    }

    res.status(200).json({
      message: `Booking with id ${id} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
