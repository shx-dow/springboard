import Project from "../models/Project.js";
import Issue from "../models/Issue.js";
import Activity from "../models/Activity.js";
import mongoose from "mongoose";

//create project
export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Project name is required",
            });
        }

        const project = await Project.create({
            name: name.trim(),
            description,
            createdBy: req.user.id,
        });

        res.status(201).json({
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            createdBy: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//get single project
export const getProjectById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }
        const project = await Project.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({
            message: "Invalid project ID",
        });
    }
};

//update project
export const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        if (name !== undefined && !name.trim()) {
            return res.status(400).json({
                message: "Project name cannot be empty",
            });
        }

        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user.id,
            },
            {
                $set: {
                    ...(name !== undefined && { name: name.trim() }),
                    ...(description !== undefined && { description }),
                },
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

//delete project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        //delete all issues belonging to this project
        const issues = await Issue.find({ projectId: project._id }).select("_id");
        const issueIds = issues.map(({ _id }) => _id);
        await Promise.all([
            Issue.deleteMany({ _id: { $in: issueIds } }),
            Activity.deleteMany({ issueId: { $in: issueIds } }),
        ]);

        res.status(200).json({
            message: "Project and its issues deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
