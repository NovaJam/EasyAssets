import mongoose, {Document, Schema} from "mongoose";
import { nanoid } from "nanoid";

const id = nanoid();

export interface Support extends Document {
    ticketId: string;
    subject: string;
    userName: string;
    userEmail: string;
    message: string;
    status: 'open' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
    resolvedAt: Date | null;
}

const supportSchema = new Schema<Support>({
    ticketId: {
        type: String,
        required: true,
        unique: true,
        default: id,
    },
    subject: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
          'Please fill a valid email address',
        ],
      },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'resolved'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date,
        default: null
    },
});

export const SupportModel = mongoose.model<Support>('Support Ticket', supportSchema);