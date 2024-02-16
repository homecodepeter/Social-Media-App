import express from "express"
import { getUser, getUserFriends, AddRemoveFriend } from "../controller/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);

// AddAndRemoveFriend

router.patch("/:id/:friendId", AddRemoveFriend)

export default router;