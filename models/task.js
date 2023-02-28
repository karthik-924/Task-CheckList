const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [30, "Name cannot be more than 30 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
        
})

module.exports = mongoose.model("Task", schema);