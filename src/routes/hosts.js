import express from "express";
import { PrismaClient } from "@prisma/client";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";
import authMiddleware from "../middleware/auth.js";

const prisma = new PrismaClient();
const router = express.Router();

// GET HOSTS
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts({ name });
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while retrieving hosts.");
  }
});

// GET HOST BY ID - Public Route
router.get("/:id", async (req, res) => {
  try {
    const host = await getHostById(req.params.id);
    res.status(200).json(host);
  } catch (error) {
    res.status(404).send(`Host with id ${req.params.id} not found.`);
  }
});

// CREATE HOST - Protected Route
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    const newHost = await prisma.host.create({
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create a new host.");
  }
});

// UPDATE HOST BY ID - Protected Route
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHost = await updateHostById(id, req.body);
    res.status(200).json(updatedHost);
  } catch (error) {
    res.status(404).send(`Host with id ${id} not found.`);
  }
});

// DELETE HOST BY ID - Protected Route
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await deleteHost(req.params.id);
    res.status(200).send(`Host with id ${req.params.id} deleted.`);
  } catch (error) {
    res.status(404).send(`Host with id ${req.params.id} not found.`);
  }
});

export default router;
