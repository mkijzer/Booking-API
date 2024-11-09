import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while retrieving all the users.");
  }
});

// GET USER BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).send(`User with id ${id} not found`);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// CREATE USER
router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// EDIT USER
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    const updatedUser = await updateUserById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE USER
router.delete(
  "/:id",
  // authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await deleteUser(id); // Renamed the variable here

      if (!deletedUser) {
        // If deletion fails, send 404 with message
        throw new Error(`User with id ${id} was not found`);
      }

      res.status(200).json({
        message: `User with id ${id} was deleted!`, // Using `id` directly here for clarity
      });
    } catch (error) {
      next(error); // Pass the error to error-handling middleware
    }
  },
  notFoundErrorHandler
);

export default router;
