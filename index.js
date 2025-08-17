import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { serve } from "inngest/express";

import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import { inngest } from "./inngest/client.js";
import { onSignUp } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onSignUp, onTicketCreated],
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(port, () => console.log(`🚀server http://localhost${port}`));
  })
  .catch((err) => console.error("❌ MongoDB Error", err));
