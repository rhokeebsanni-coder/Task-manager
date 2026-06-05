const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  getTaskStats,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const authMiddleware = require("../middleware/authMiddleware.js");

router.use(authMiddleware);
router.route("/").get(getAllTasks).post(createTask);
router.route("/stats").get(getTaskStats)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
