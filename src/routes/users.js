import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";

const router = express.Router();

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while retrieving all the users");
  }
});

//GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).send(`User with id ${id} not found`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong while retrieving the user");
  }
});
export default router;

// CREATE USER
router.post(
  "/",
  // authMiddleware,
  async (req, res) => {
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
  }
);
