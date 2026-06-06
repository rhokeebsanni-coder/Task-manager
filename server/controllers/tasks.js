const mongoose = require("mongoose");

const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const CustomError = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ owner: req.user.userId }).sort({
    createdAt: -1,
  });
  res.json(tasks);
});

const createTask = asyncWrapper(async (req, res) => {
  const { task, priority } = req.body;
  const newTask = await Task.create({
    task,
    priority,
    owner: req.user.userId,
  });

  res.status(201).json(newTask);
});

const getTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid task ID format", 400);
  }

  const task = await Task.findOne({ _id: id, owner: req.user.userId });

  if (!task) {
    throw new CustomError(`No task with id ${id}`, 404);
  }

  res.json(task);
});

const getTaskStats = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({ owner: req.user.userId });
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  res.json({
    total,
    completed,
    remaining,
    progress,
  });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid task ID format", 400);
  }

  const allowedUpdates = {};
  if (Object.prototype.hasOwnProperty.call(req.body, "task")) {
    allowedUpdates.task = req.body.task;
  }
  if (Object.prototype.hasOwnProperty.call(req.body, "completed")) {
    allowedUpdates.completed = req.body.completed;
  }
  if (Object.prototype.hasOwnProperty.call(req.body, "priority")) {
    allowedUpdates.priority = req.body.priority;
  }

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, owner: req.user.userId },
    allowedUpdates,
    {
      new: true,
      runValidators: true,
      context: "query",
    },
  );

  if (!updatedTask) {
    throw new CustomError(`No task with id ${id}`, 404);
  }

  res.json(updatedTask);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid task ID format", 400);
  }

  const deletedTask = await Task.findOneAndDelete({
    _id: id,
    owner: req.user.userId,
  });

  if (!deletedTask) {
    throw new CustomError(`No task with id ${id}`, 404);
  }

  res.json({ msg: "Task deleted successfully" });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  getTaskStats,
  updateTask,
  deleteTask,
};
