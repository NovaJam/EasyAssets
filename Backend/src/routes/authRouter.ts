
import express from 'express';
import { signup, login, logout, resetPassword } from "../controllers/authController";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/reset-password', resetPassword);

export default router;
