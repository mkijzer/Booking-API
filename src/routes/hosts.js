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

// GET HOST BY ID
router.get("/:id", async (req, res) => {
  try {
    const host = await getHostById(req.params.id);
    res.status(200).json(host);
  } catch (error) {
    res.status(404).send(`Host with id ${req.params.id} not found.`);
  }
});

// CREATE HOST
router.post("/", authMiddleware, async (req, res, next) => {
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
    const existingHost = await prisma.host.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingHost) {
      return res.status(201).json(existingHost);
    }

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

// UPDATE HOST BY ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    const updatedHost = await updateHostById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(200).json(updatedHost);
  } catch (error) {
    next(error);
  }
});

// DELETE HOST BY ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await deleteHost(req.params.id);
    res.status(200).send(`Host with id ${req.params.id} deleted.`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
