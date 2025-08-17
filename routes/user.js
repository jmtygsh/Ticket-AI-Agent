import express from "express";
import {
  getUsers,
  logIn,
  logOut,
  signUp,
  updateUser,
} from "../controllers/user.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

export default router;
