import express from "express";
import { authenticate } from "../middlewares/auth";
import { getTickets, getTicket, createTicket } from "../controllers/ticket";

const router = express.Router();

router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicket);
router.post("/", authenticate, createTicket);

export default router;
