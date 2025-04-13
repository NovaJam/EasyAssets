import { SupportModel } from "../../models/support/supportModel";

export const getSupportTickets = () => SupportModel.find();
export const getSupportTicketById = (id: string) => SupportModel.findById(id);
export const deleteSupportTicket = (id: string) => SupportModel.findByIdAndDelete(id);