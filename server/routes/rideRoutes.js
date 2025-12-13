import express from "express";
import {
  createRide,
  searchRides,
  getRideById,
} from "../controllers/rideController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createRide); // create ride
router.get("/", searchRides); // search rides
router.get("/:id", getRideById); // ride details

export default router;

    