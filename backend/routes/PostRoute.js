import express from "express";
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from "../controllers/Posts.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/posts',verifyUser, getPosts);
router.get('/posts/:id',verifyUser, getPostById);
router.post('/posts',verifyUser, createPost);
router.patch('/posts/:id',verifyUser, updatePost);
router.delete('/posts/:id',verifyUser, deletePost);

export default router;