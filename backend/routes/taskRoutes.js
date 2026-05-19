const router = require("express").Router();
const auth = require("../middleware/auth");
const TaskController = require("../controllers/taskController");

router.post("/", auth, TaskController.createTask);

router.get("/", auth, TaskController.getTasks);

router.get("/today", auth, TaskController.getTodayTasks);

router.get("/:id", auth, TaskController.getTaskById);

router.patch("/:id", auth, TaskController.updateTask);

router.delete("/:id", auth, TaskController.deleteTask);

module.exports = router;