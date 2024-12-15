import express from 'express';
import { createBlog } from '../controller/blog.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router= express.Router();

router.post("/create", isAuthenticated,createBlog);

export default router;