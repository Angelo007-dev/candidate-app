import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    status: {
        type: String,
        default: 'pending',
    },
    deletedAt: Date,
}, { timestamps: true });
export default mongoose.model("Candidate", candidateSchema);