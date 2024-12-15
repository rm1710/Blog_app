import express from 'express';
import { register, login, logout } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router= express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);

export default router;