const Task = require("../models/Task");
const mongoose = require("mongoose");

class TaskController {
    static async createTask(req, res) {
        try {
            const { title, priority, dueDate } = req.body;

            const task = await Task.create({
                title,
                priority,
                dueDate,
                userId: req.user.id,
            });

            return res.status(201).json({
                message: "Task created successfully",
                data: task,
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async getTasks(req, res) {
        try {
            const sort = req.query.sort || "createdAt";

            const tasks = await Task.find({ userId: req.user.id }).sort(sort);

            return res.status(200).json({ data: tasks });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async getTaskById(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid task id" });
            }

            const task = await Task.findOne({ _id: id, userId: req.user.id });

            if (!task) return res.status(404).json({ error: "Task not found" });

            return res.status(200).json({ data: task });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async updateTask(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid task id" });
            }

            const task = await Task.findOneAndUpdate(
                { _id: id, userId: req.user.id },
                req.body,
                { new: true }
            );

            if (!task) return res.status(404).json({ error: "Task not found" });

            return res.status(200).json({
                message: "Task updated successfully",
                data: task,
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid task id" });
            }

            const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

            if (!task) return res.status(404).json({ error: "Task not found" });

            return res.status(200).json({ message: "Task deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async getTodayTasks(req, res) {
        try {
            const start = new Date();
            start.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            const tasks = await Task.find({
                userId: req.user.id,
                dueDate: { $gte: start, $lte: end },
            });

            return res.status(200).json({
                count: tasks.length,
                data: tasks,
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = TaskController;