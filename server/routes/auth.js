import express from "express";
import { loggedIn } from "../controller/auth.js";

const router = express.Router();

router.post("/login", loggedIn)

export default router;