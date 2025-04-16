import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/otpController';

const router = express.Router();

/**
* @swagger
* /api/otp/send-otp:
*   post:
*     summary: Sends an OTP to given email
*     tags:
*       - OTP
*     responses:
*       '200':
*         description: OTP sent successfully
*       '400':
*         description: Email is required
*       '500':
*         description: Internal Server Error
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*             required:
*               - email
* 
*/
router.post('/send-otp', sendOtp);

/**
* @swagger
* /api/otp/verify-otp:
*   post:
*     summary: Validates the OTP
*     tags:
*       - OTP
*     responses:
*       '200':
*         description: OTP verified successfully
*       '400':
*         description: Invalid or expired OTP
*       '500':
*         description: Internal Server Error
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               otp:
*                 type: string
*             required:
*               - email
*               - otp
* 
*/
router.post('/verify-otp', verifyOtp);

export default router;
