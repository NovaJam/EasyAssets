import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    categoryId: string;
    name: string;
    createdAt: Date;
}

const categorySchema = new Schema<ICategory>({
    categoryId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);