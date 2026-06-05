const Task = require("../models/tasks");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async")
const CustomError = require("../errors/custom-error")

// GET ALL TASKS
const getAllTasks = asyncWrapper( async (req, res) => {
  
    const tasks = await Task.find({owner: req.user.userId});
    res.json(tasks); // return [] if empty (standard practice)

});

// CREATE TASK
const createTask =asyncWrapper( async (req, res) => {
  
    const newTask = await Task.create({...req.body,owner: req.user.userId});
    res.status(201).json(newTask);

});

// GET SINGLE TASK
const getTask = asyncWrapper(async (req, res) => {
  
    const { id } = req.params;

    //verifies whether id is a valid ObjectId shape (typically a 24-character hex string).
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid task ID format", 400); //throw = “something went wrong, stop immediately
    }

    const task = await Task.findOne({_id: id,owner: req.user.userId});

    //it handles the case where the database query didn’t find anything
    if (!task) {
      throw new CustomError(`No task with id ${id}`, 404);
    }

    res.json(task);
  
});

const getTaskStats = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({
    owner: req.user.userId,
  });

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

// UPDATE TASK
const updateTask = asyncWrapper(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid task ID format",400);
    }
    
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, owner: req.user.userId },
      req.body,
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

// DELETE TASK
const deleteTask = asyncWrapper(async (req, res) => {
  
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid task ID format", 400);
    }
    
    const deletedTask = await Task.findOneAndDelete({_id: id,owner: req.user.userId});

    if (!deletedTask) {
      throw new CustomError(`No task with id ${id}`, 404);
    }

    res.json({ msg: "Task deleted successfully"});
  
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  getTaskStats,
  updateTask,
  deleteTask,
};
