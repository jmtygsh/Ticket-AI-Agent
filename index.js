import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(port, () => console.log(`🚀server http://localhost${port}`));
  })
  .catch((err) => console.error("❌ MongoDB Error", err));
