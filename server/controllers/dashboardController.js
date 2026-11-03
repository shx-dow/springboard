import Project from "../models/Project.js";
import Issue from "../models/Issue.js";

export const getDashboardStats = async (req, res) => {
    try {
        // Get projects created by logged-in user
        const projectIds = await Project.find({
            createdBy: req.user.id,
        }).distinct("_id");

        // Common issue filter
        const filter = {
            projectId: { $in: projectIds },
        };

        // Calculate statistics
        const [
            totalProjects,
            totalIssues,
            openIssues,
            inProgressIssues,
            completedIssues,
            highPriorityIssues,
        ] = await Promise.all([
            Project.countDocuments({
                createdBy: req.user.id,
            }),

            Issue.countDocuments(filter),

            Issue.countDocuments({
                ...filter,
                status: "todo",
            }),

            Issue.countDocuments({
                ...filter,
                status: "in-progress",
            }),

            Issue.countDocuments({
                ...filter,
                status: "done",
            }),

            Issue.countDocuments({
                ...filter,
                priority: "high",
            }),
        ]);

        res.status(200).json({
            totalProjects,
            totalIssues,
            openIssues,
            inProgressIssues,
            completedIssues,
            highPriorityIssues,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
