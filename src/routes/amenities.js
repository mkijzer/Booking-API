import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET ALL AMENITIES
router.get("/", async (req, res) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving amenities.");
  }
});

// GET AMENITY BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (!amenity) {
      return res.status(404).send(`Amenity with id ${id} not found`);
    }
    res.status(200).json(amenity);
  } catch (error) {
    next(error);
  }
});

// CREATE AMENITY
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newAmenity = await createAmenity(name, description);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

// EDIT AMENITY
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedAmenity = await updateAmenityById(id, name, description);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    next(error);
  }
});

// DELETE AMENITY
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenity = await deleteAmenity(id);

    if (!deletedAmenity) {
      throw new Error(`Amenity with id ${id} was not found`);
    }

    res.status(200).json({ message: `Amenity with id ${id} was deleted!` });
  } catch (error) {
    next(error);
  }
});
export default router;
