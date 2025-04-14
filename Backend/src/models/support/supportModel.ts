import mongoose, { Document, Schema } from "mongoose";
import { nanoid } from "nanoid";

const id = nanoid();

export interface Support extends Document {
    ticketId: string;
    subject: string;
    user: mongoose.Types.ObjectId;  // Reference to User model
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
        required: [true, 'Subject is required'],
        trim: true,
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    userEmail: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
          'Please fill a valid email address',
        ],
      },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
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

// Add pre-save hook for resolvedAt
supportSchema.pre<Support>('save', function(next) {
    if (this.isModified('status') && this.status === 'resolved') {
        this.resolvedAt = new Date();
    }
    next();
});
export const SupportModel = mongoose.model<Support>('Support Ticket', supportSchema);