const Task = require("../models/task");

const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json({ "msg": error })
    }
}

const createTask = async (req, res) => {
    try {
        const name=req.body.name;
        const task = await Task.find({ name }, async(err, task) => {
            if (err) {
                console.log(err);
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
    }
    catch (error) {
        res.status(500).json({"msg":error.message})
    }
    
}

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

const updateTask = (req, res) => {
    

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