import Activity from "../models/Activity.js";
import Issue from "../models/Issue.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";

export const getRecentActivities = async (req, res) => {
    try {
        const projectFilter = { createdBy: req.user.id };
        if (req.query.project) {
            if (!mongoose.isValidObjectId(req.query.project)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            projectFilter._id = req.query.project;
        }
        const projects = await Project.find(projectFilter).select("_id");
        if (req.query.project && projects.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        const projectIds = projects.map(({ _id }) => _id);

        // Find issues belonging to those projects
        const issueIds = await Issue.find({
            projectId: { $in: projectIds },
        }).distinct("_id");

        // Get recent activities
        const activities = await Activity.find({
            userId: req.user.id,
            issueId: { $in: issueIds },
        })
            .populate("userId", "name")
            .populate("issueId", "title")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json(activities);
    } catch (error) {
        console.error("Activity fetch failed:", error);
        res.status(500).json({ message: "Unable to load recent activity" });
    }
};
