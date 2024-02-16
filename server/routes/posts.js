import express from "express";
import { getFeedPosts, getUserPost, getLikesPost, getUserComments } from "../controller/post.js";

const router = express.Router();

router.get("/", getFeedPosts);
router.get("/:id/posts", getUserPost);
router.post("/comments", getUserComments)

// likes

router.patch("/:id/like", getLikesPost);

export default router;