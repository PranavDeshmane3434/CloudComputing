const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Task = require("./models/Task");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

/*
  GET ALL TASKS
*/
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

/*
  CREATE TASK
*/
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

/*
  UPDATE TASK
*/
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

/*
  DELETE TASK
*/
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});