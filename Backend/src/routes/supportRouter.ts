import express from "express";
import {
  newTicket,
  getAllTickets,
  getTicketById,
  CloseTicketById,
  updateTicketById,
  getTicketByAssetId,
  isSupport,
} from "../controllers/supportController";

const router = express.Router();

/**
 * @swagger
 * /api/support/new:
 *   post:
 *     summary: creates new support ticket for the user
 *     tags:
 *       - Support
 *     responses:
 *       '200':
 *         description: Success response
 *       '201':
 *         description: Created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server Error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Name of the user
 *               userEmail:
 *                 type: string
 *                 description: Email of the user
 *               subject:
 *                 type: string
 *                 description: Subject of the ticket
 *               assetId:
 *                 type: string
 *                 description: Asset ID (optional)
 *               message:
 *                 type: string
 *                 description: the content of the support ticket
 *             required:
 *               - userName
 *               - userEmail
 *               - subject
 *               - message
 *
 */
router.post("/new", newTicket);

/**
 * @swagger
 * /api/support/getAll:
 *   get:
 *     summary: Rertrieve all support tickets (support only)
 *     tags:
 *       - Support
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: No tickets found
 *       '500':
 *         description: Server Error
 *
 */
router.get("/getAll", isSupport, (req, res) => getAllTickets(req, res));

/**
 * @swagger
 * /api/support/get/{ticketId}:
 *   get:
 *     summary: Get a support ticket by ID (support only)
 *     tags:
 *       - Support
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the support ticket to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the support ticket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   description: Support ticket details
 *       '400':
 *         description: No ticket found with the provided ID
 *       '500':
 *         description: Server error
 */
router.get("/get/:ticketId", isSupport, getTicketById);

/**
 * @swagger
 * /api/support/get/{assetid}:
 *   get:
 *     summary: Get the ticket from the assetId (if it exists) and Support only
 *     tags:
 *       - Support
 *     responses:
 *       '200':
 *         description: Success response
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: User not found
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: Failed to fetch support tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetid:
 *                 type: string
 *                 description: asset ID included with the Ticket
 *             required:
 *               - assetid
 *
 */
router.get("/get/:assetid", isSupport, getTicketByAssetId);

/**
 * @swagger
 * /api/support/update/{ticketId}:
 *   patch:
 *     summary: Update support ticket by ID (support only)
 *     tags:
 *       - "Support"
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the support ticket to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status of the ticket
 *                 enum: [open, resolved]
 *                 default: open
 *             required:
 *               - status
 *     responses:
 *       "200":
 *         description: Success
 *       "304":
 *         description: Not Modified
 *       "400":
 *         description: Failed to update support ticket
 *       "500":
 *         description: Server error
 */
router.patch("/update/:ticketId", isSupport, updateTicketById);

/**
 * @swagger
 * /api/support/close/{id}:
 *   delete:
 *     summary: Resolve (soft delete) a support ticket by ID (support only)
 *     description: This endpoint marks a ticket as "resolved".
 *     tags:
 *       - "Support"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the support ticket to resolve
 *     responses:
 *       "204":
 *         description: Ticket marked as resolved successfully
 *       "400":
 *         description: Failed to resolve ticket
 *       "500":
 *         description: Server error
 */
router.delete("/close/:id", isSupport, CloseTicketById);

export default router;
