import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET ALL PROPERTIES with optional filters
router.get("/", async (req, res) => {
  const { location, pricePerNight, amenities } = req.query;

  try {
    const properties = await getProperties({
      location,
      pricePerNight,
      amenities,
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while retrieving properties.");
  }
});

// GET PROPERTY BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      return res.status(404).send(`Property with id ${id} not found`);
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

// CREATE PROPERTY
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    } = req.body;
    const newProperty = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProperty = await updatePropertyById(id, req.body);
    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
});

// DELETE PROPERTY
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deleteProperty(id);

    if (!deletedProperty) {
      throw new Error(`Property with id ${id} was not found`);
    }

    res.status(200).json({
      message: `Property with id ${id} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
