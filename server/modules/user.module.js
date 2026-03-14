import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    agentCode: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: "agent",
    }
}, { timestamps: true })

const User = mongoose.model("User", agentSchema)

export default User