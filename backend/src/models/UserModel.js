import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
        trim: true,
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "AGENT"],
        default: "AGENT"
    }
},
    { timestamps: true }
)

export default mongoose.model('User',userSchema)