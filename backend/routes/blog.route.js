import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getSingleBlogs, getMyBlogs } from '../controller/blog.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/authUser.js';

const router= express.Router();

router.post("/create", isAuthenticated,isAdmin("admin"),createBlog);
router.delete("/delete/:id", isAuthenticated,isAdmin("admin"),deleteBlog);
router.get("/all-blogs", isAuthenticated,getAllBlogs)
router.get("/single-blog/:id", isAuthenticated, getSingleBlogs)

router.get("/my-blog", isAuthenticated,isAdmin("admin"), getMyBlogs)
export default router;