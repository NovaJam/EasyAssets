import express, {Response, Request} from "express";
import { newTicket, getAllTickets, getTicketById, CloseTicketById, updateTicketById, isSupport } from "../controllers/supportController";

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
router.get('/getAll', isSupport, (req, res) => getAllTickets(req, res));

/**
* @swagger
* /api/support/get/:id:
*   get:
*     summary: Get all support tickets by ID (support only)
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
router.get('/get/:id', isSupport, getTicketById);

/**
* @swagger
* /api/support/update/:id:
*   patch:
*     summary: update support ticket by ID (support only)
*     tags:
*       - Support
*     responses:
*       '200':
*         description: Success
*       '304':
*         description: Not Modified
*       '400':
*         description: Failed to update support ticket
*       '500':
*         description: Server error
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 description: status of the ticket (resolved, open)
*             required:
*               - status
* 
*/
router.patch('/update/:id', isSupport, updateTicketById);

/**
* @swagger
* /api/support/delete/:id:
*   delete:
*     summary: ' Closes a ticket by ID (support only)'
*     tags:
*       - Support
*     responses:
*       '204':
*         description: resource deleted successfully
*       '400':
*         description: Failed to update delete ticket
*       '500':
*         description: Server error
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*                 description: ticket ID
*             required:
*               - id
* 
*/
router.delete('/delete/:id', isSupport, CloseTicketById);

export default router;