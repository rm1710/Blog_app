import express from 'express';
import { register, login, logout, getMyProfile, getAdmins } from '../controller/user.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';


const router= express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated,isAdmin('admin'), logout);
router.get('/my-profile', isAuthenticated,getMyProfile);
router.get("/admins",getAdmins);

export default router;