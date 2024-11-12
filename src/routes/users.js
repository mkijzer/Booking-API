import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers({ username, email });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET user by ID
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

// CREATE user
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// EDIT user
router.put("/:id", authMiddleware, async (req, res, next) => {
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

// DELETE user
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({
      message: `User with id ${id} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
