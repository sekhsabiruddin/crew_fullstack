const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "underreview", "finished"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["urgent", "medium", "low"],
    default: "urgent",
  },
  deadline: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
