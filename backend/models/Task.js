const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { // title of the task
        type: String,
        required: true
    },
    completed: { // whether or not task is complete
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);
//cam