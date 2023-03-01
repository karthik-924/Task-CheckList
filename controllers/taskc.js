const Task = require("../models/task");
const asyncwrapper=require("../middleware/async");
const getTasks = asyncwrapper(async(req, res) => {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
})

const createTask = asyncwrapper(async (req, res) => {
        const name = req.body.name;
        if (!name) {
            return res.status(400).json({ "msg": "Please provide a name" });
        }
        const task = await Task.find({ name }, async(err, task) => {
            if (err) {
                res.status(400).json({ "msg": "Task already exists" });
            }
            else {
                if (task.length > 0) {
                    res.status(400).json({ "msg": "Task already exists" });
                }
                else {
                    const task = await Task.create(req.body);
                    res.status(200).json({ task });
                }
            }
        });
})

const getTask = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ "msg": error.message })
    }
}

const updateTask = async(req, res) => {
    try{
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({task});
    }
    catch (error) {
        res.status(500).json({ "msg": error.message })
    }

    // res.send("Task Manager for update");
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({success: true});
    }
    catch (error) {
        res.status(500).json({ "msg": error.message })
    }
    // res.send("Task Manager for delete");
}

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}