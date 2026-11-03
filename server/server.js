import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activities", activityRoutes);

//test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "API is running",
    });
});

//MongoDB connection and server startup
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
}
