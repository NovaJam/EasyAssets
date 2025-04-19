import mongoose, { model, Document, Schema } from "mongoose";

export interface IUserSecurityInfo extends Document{
    userId : mongoose.Types.ObjectId,
    securityQuestion1: string,
    answer1: string,
    securityQuestion2: string,
    answer2:string
}

const userSecurityInfoSchema = new Schema<IUserSecurityInfo>({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    securityQuestion1:{type: String, required: true},
    answer1:{type: String, required: true, select:false},
    securityQuestion2:{type: String, required: true},
    answer2:{type: String, required: true, select:false}
});

export const UserSecurityInfo = model<IUserSecurityInfo>('UserSecurityInfo', userSecurityInfoSchema);