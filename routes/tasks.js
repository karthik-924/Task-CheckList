const express = require("express");
const router = express.Router();
const {getTasks,createTask,getTask,updateTask,deleteTask}=require("../controllers/taskc")

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;