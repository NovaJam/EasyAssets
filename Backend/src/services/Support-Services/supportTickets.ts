import { SupportModel } from "../../models/support/supportModel";

export const getSupportTickets = async () => await SupportModel.find();
export const getSupportTicketById = (ticketId: string) =>
  SupportModel.findOne({ ticketId }).populate("user");
export const resolveSupportTicket = (ticketId: string) =>
  SupportModel.findOneAndUpdate(
    { ticketId },
    { status: "resolved", resolvedAt: new Date() },
    { new: true }
  );

export const getSupportTicketByassetId = (assetId: string) => {
    return SupportModel.findOne({ assetId }).populate("user");
  };