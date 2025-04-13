import { Request, Response } from 'express';
import { getSupportTickets, getSupportTicketById, deleteSupportTicket, } from '../services/Support-Services/supportTickets';
import { SupportModel } from '../models/support/supportModel';
import { getUserById } from "../services/User-Services/user.service";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

export const admin = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.sessionToken;
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return
        }
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };

        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return
        }
        const user = await getUserById(decoded.id);

        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return
        }

        if (user.role !== "Admin") {
            res.status(403).json({ success: false, message: "Admin role needed." });
            return
        }
        const tickets = await getSupportTickets();
        if (!tickets) {
            res.status(404).json({ success: false, message: "No tickets found" });
            return
        }
        res.status(200).json({ success: true, tickets });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return
    }
}

// make ticket 
export const newTicket = async (req: Request, res: Response) => {
    const { userName, userEmail, subject, message } = req.body;
    try {
        const ticket = await SupportModel.create({ userName, userEmail, subject, message });
         res.status(201).json({ ticket });
    } catch (err) {
        const errorMessage = (err as any)?.errors?.userEmail?.properties?.message;

        console.error(err);
        res.status(400).json({
            error: 'Failed to create support ticket:',
            message: errorMessage,
        });

        res.status(500).json({
            error: 'Failed to create support ticket',
            message: 'An error occurred while creating the support ticket.',
        });
    }
};

// get all tickets
export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await getSupportTickets();
         res.status(200).json({ tickets });
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Failed to fetch support tickets' });
    }
};

// get ticket by id
export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await getSupportTicketById(id);
        if (!ticket) {
             res.status(404).json({ error: 'Ticket not found' });
        }
         res.status(200).json({ ticket });
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Failed to fetch support ticket' });
    }
};

// delete ticket by id
export const deleteTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await deleteSupportTicket(id);
        if (!ticket) {
             res.status(404).json({ error: 'Ticket not found' });
        }
         res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Failed to delete support ticket' });
    }
};

// update ticket by id
export const updateTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const ticket = await SupportModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!ticket) {
             res.status(404).json({ error: 'Ticket not found' });
        }
         res.status(200).json({ ticket });
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Failed to update support ticket' });
    }
};