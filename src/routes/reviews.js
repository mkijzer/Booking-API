import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/UpdateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while retrieving all the reviews.");
  }
});

// GET REVIEW BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      return res.status(404).send(`Review with id ${id} not found`);
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

// CREATE REVIEW
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

// EDIT REVIEW
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const updatedReview = await updateReviewById(
      id,
      userId,
      propertyId,
      rating,
      comment
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

// DELETE REVIEW
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);

    if (!deletedReview) {
      throw new Error(`Review with id ${id} was not found`);
    }

    res.status(200).json({
      message: `Review with id ${id} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
