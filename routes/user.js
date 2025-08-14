import express from "express";
import { getUsers, logIn, logOut, signUp, updateUser } from "../controllers/user";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers)


router.post("/signup", signUp);
router.get("/login", logIn);
router.get("/logout", logOut);

export default router;
