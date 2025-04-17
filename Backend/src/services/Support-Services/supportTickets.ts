import { SupportModel } from "../../models/support/supportModel";

export const getSupportTickets = (filter = {}) => SupportModel.find(filter).populate('user');
export const getSupportTicketById = (id: string) => SupportModel.findById(id).populate('user');
export const resolveSupportTicket = (id: string) => 
    SupportModel.findByIdAndUpdate(
        id,
        { status: 'resolved', resolvedAt: new Date() },
        { new: true }
    );