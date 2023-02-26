const getTasks = (req, res) => {
    res.send("Task Manager for all");
}

const createTask = (req, res) => {
    res.send("Task Manager for create");
}

const getTask = (req, res) => {
    res.send("Task Manager for single get");
}

const updateTask = (req, res) => {
    res.send("Task Manager for update");
}

const deleteTask = (req, res) => {
    res.send("Task Manager for delete");
}

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}