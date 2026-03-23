import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },
    contact_info: {
        email: {
            type: String,
            required: true,
            minLength: 3,
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
        }
    },
    status: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, { timestamp: true });

export default mongoose.model('Customer', customerSchema);