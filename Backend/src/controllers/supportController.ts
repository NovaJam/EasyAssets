import { Request, Response, NextFunction } from 'express';
import { getSupportTickets, getSupportTicketById } from '../services/Support-Services/supportTickets';
import { SupportModel } from '../models/support/supportModel';
import { getUserById } from "../services/User-Services/user.service";
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
const id = nanoid();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

// export const isSupport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const token = req.cookies.sessionToken;
//         if (!token) {
//             res.status(401).json({ success: false, message: "Unauthorized" });
//             return
//         }
//         const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };

//         if (!decoded) {
//             res.status(401).json({ success: false, message: "Unauthorized" });
//             return
//         }
//         const user = await getUserById(decoded.id);

//         if (!user) {
//             res.status(401).json({ success: false, message: "Unauthorized" });
//             return
//         }

//         if (user.role !== "Support") {
//             res.status(403).json({ success: false, message: "Support role needed." });
//             return
//         }
//         const tickets = await getSupportTickets();
//         if (!tickets) {
//             res.status(404).json({ success: false, message: "No tickets found" });
//             return
//         }
//         res.status(200).json({ success: true, tickets });
//         return;

//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//         return
//     }
// }

// make ticket 

export const isSupport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.sessionToken;
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };

        if (!decoded) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const user = await getUserById(decoded.id);

        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        if (user.role !== "Support") {
            res.status(403).json({ success: false, message: "Support role needed." });
            return;
        }

        // ✅ All good – move to the controller
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const newTicket = async (req: Request, res: Response): Promise<void> => {
    const { subject, message } = req.body;
    try {
        // 1. Authentication Check
        const token = req.cookies.sessionToken;
        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        // 2. Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await getUserById(decoded.id);
        if (!user) {
            res.status(401).json({ error: 'Invalid user' });
            return;
        }

        // 3. Create Ticket with VERIFIED User Info
        const ticket = await SupportModel.create({
            user: user._id, // Reference to user
            userName: user.name,
            userEmail: user.email, // From verified user, NOT request body
            subject,
            message
        });

        res.status(201).json({ ticket });

    } catch (err) {
        const errorMessage = (err as any)?.errors?.userEmail?.properties?.message;

         // 4. Handle Specific Errors
         if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token', message: errorMessage, });
            return;
        }

        console.error(err);
    }
};

// get all tickets
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.sessionToken;
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        const user = await getUserById(decoded.id);

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const filter = user.role === 'Support' ? {} : {
            user: decoded.id,
            status: 'open',
        };

        const tickets = await getSupportTickets(filter);
         res.status(200).json({ tickets });
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Failed to fetch support tickets' });
    }
};

// get ticket by id
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const token = req.cookies.sessionToken;
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        
        const ticket = await getSupportTicketById(id);
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        // Support can see all tickets, users only their open tickets
        if (decoded.role !== 'Support' && 
            (ticket.user.toString() !== decoded.id || ticket.status !== 'open')) {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        res.status(200).json({ ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch support ticket' });
    }
};

// update ticket by id
export const updateTicketById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const token = req.cookies.sessionToken;
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };

        if(decoded.role !== 'Support'){
            res.status(401).json({ error: 'Unauthorized' });
        }
        
        const ticket = await SupportModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!ticket) {
             res.status(404).json({ error: 'Ticket not found' })
        }
         res.status(200).json({ ticket });
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Failed to update support ticket' });
    }
};

// closae ticket by id
export const CloseTicketById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        // Verify authentication and authorization
        const token = req.cookies.sessionToken;
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        if (decoded.role !== "Support") {
            res.status(403).json({ success: false, message: "Support privileges required" });
        }

        // Resolve ticket instead of deleting
        const ticket = await SupportModel.findByIdAndUpdate(
            id,
            { 
                status: 'resolved',
                resolvedAt: new Date()
            },
            { new: true }
        );

        if (!ticket) {
            res.status(404).json({ success: false, error: 'Ticket not found' });
            return;
        }

        // Return updated ticket information
        res.status(200).json({ 
            success: true, 
            message: 'Ticket resolved successfully',
            ticket
        });

    } catch (error) {
        console.error(error);
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ success: false, error: 'Invalid token' });
        }
        res.status(500).json({ 
            success: false, 
            error: 'Failed to resolve support ticket' 
        });
    }
};
