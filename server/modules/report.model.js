import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true,
        enam: ["intelligence", "logistics", "alert"]
    },
    urgency: {
        type: String,
        required: true,
        enam: ["low", "medium", "high"]
    },
    message: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        default: ""
    },
    sourceType: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Report = mongoose.model("Report", reportSchema)
export default Report