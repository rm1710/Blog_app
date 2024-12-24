import express from 'express';
import { createBlog } from '../controller/blog.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/authUser.js';

const router= express.Router();

router.post("/create", isAuthenticated,isAdmin("admin"),createBlog);

export default router;