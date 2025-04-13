import express from "express";
import { newTicket, getAllTickets, getTicketById, deleteTicketById, updateTicketById, admin} from "../controllers/supportController";

const router = express.Router();

/**
* @swagger
* /api/support/new:
*   post:
*     summary: creates new support ticket for the user
*     tags:
*       - Issue
*     responses:
*       '200':
*         description: Success response
*       '201':
*         description: Created successfully
*       '400':
*         description: Bad request
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

router.post('/new', newTicket);

/**
* @swagger
* /api/support/getAll:
*   get:
*     summary: Rertrieve all support tickets (Admin only)
*     tags: [Support, help, ticket]
*     responses:
*       201:
*         description: successfully retrieved all tickets
*       400:
*         description: No tickets found
*       500:
*         description: Internal server error
*/
router.get('/getAll', admin, getAllTickets);

/**
 * @swagger
 * /api/support/get/{id}:
 *   get:
 *     summary: Get all support tickets by ID (Admin only)
 *     tags: [Support, help, ticket]
 *     responses:
 *       200:
 *         description: List of all support tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       subject:
 *                 type: string
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               message:
 *                 type: string
 *       400:
 *         description: No tickets found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', admin, getTicketById);

/**
 * @swagger
 * /api/support/delete/{id}:
 *   delete:
 *     summary: Removes a ticket (Admin only)
 *     tags: [ticket, support, help]
 *     description: Deletes a ticket by ID (Admin only)
 *     parameters:
 *         id: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Category ID is required
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied (Admin role required)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', admin, deleteTicketById);

export default router;