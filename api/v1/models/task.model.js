const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    default: 'active'
  },
  parent_id: String,
  content: String,
  timeStart: Date,
  timeFinish: Date,
  deleted: {
    type: Boolean,
    default: false
  },
  listUser: Array,
  createBy: {
    user_id: String,
    createAt: {
      type: Date,
      default: Date.now
    }
  },
  deletedAt: Date
}, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;