import mongoose, { Mongoose } from "mongoose";

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
