const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    status: {
        type: String,
        default: 'Initial'
    },
    content: String,
    timeStart: Date,
    timeFinish: Date,
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;