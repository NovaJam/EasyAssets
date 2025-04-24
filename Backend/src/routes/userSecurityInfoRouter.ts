import { Router } from "express";
import { getAllSecurityQuestions, insertDefaultSecurityQuestions } from "../controllers/securityQuestions.controller";
import { 
    //deleteUserSecurityInfoController, 
    getUserSecurityQuestions, saveUserSecurityInfo, verifySecurityAnswers } from "../controllers/userSecurityInfo.controller";

const router = Router();

/**
 * @swagger
 * /api/security-questions/insert-default:
 *   post:
 *     summary: Insert default security questions into the database (One time addition)
 *     tags: [Security Questions]
 *     responses:
 *       201:
 *         description: Security questions inserted successfully
 *       200:
 *         description: Security questions already inserted
 *       500:
 *         description: Failed to insert security questions
 */
router.post('/insert-default', insertDefaultSecurityQuestions);

/**
 * @swagger
 * /api/security-questions:
 *   get:
 *     summary: Get all default security questions
 *     tags: [Security Questions]
 *     responses:
 *       200:
 *         description: List of security questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Failed to fetch security questions
 */
router.get('/',getAllSecurityQuestions);

/**
 * @swagger
 * /api/security-questions/save:
 *   post:
 *     summary: Save user's selected security questions and answers
 *     tags: [Security Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, securityQuestion1, answer1, securityQuestion2, answer2]
 *             properties:
 *               email:
 *                 type: string
 *               securityQuestion1:
 *                 type: string
 *               answer1:
 *                 type: string
 *               securityQuestion2:
 *                 type: string
 *               answer2:
 *                 type: string
 *     responses:
 *       201:
 *         description: Security questions saved successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to save security info
 */
router.post('/save', saveUserSecurityInfo);

/**
 * @swagger
 * /api/security-questions/user:
 *   post:
 *     summary: Get the user-selected security questions by email
 *     tags: [Security Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Return the two security questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 securityQuestion1:
 *                   type: string
 *                 securityQuestion2:
 *                   type: string
 *       400:
 *         description: Validation error
 *       404:
 *         description: User or security questions not found
 *       500:
 *         description: Failed to retrieve security questions
 */
router.post('/user',getUserSecurityQuestions);

/**
 * @swagger
 * /api/security-questions/verify:
 *   post:
 *     summary: Verify user's answers to security questions
 *     tags: [Security Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, answer1, answer2]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               answer1:
 *                 type: string
 *               answer2:
 *                 type: string
 *     responses:
 *       200:
 *         description: Security answers verified successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Security answers did not match
 *       500:
 *         description: Internal server error
 */
router.post('/verify',verifySecurityAnswers);

//Used for deleting saved questions while testing APIs
// /**
//  * @swagger
//  * /api/security-questions/delete:
//  *   delete:
//  *     summary: Delete user's saved security questions
//  *     description: Deletes the user's security questions from the database.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [email]
//  *             properties:
//  *               email:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Security questions deleted successfully
//  *       400:
//  *         description: User ID is missing
//  *       404:
//  *         description: No security questions found for this user
//  *       500:
//  *         description: Failed to delete security questions
//  */
// router.delete("/delete", deleteUserSecurityInfoController);

export default router;