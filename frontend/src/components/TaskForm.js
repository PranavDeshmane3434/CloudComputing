import { useState } from "react";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description
        })
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-form-card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-textarea"
        />

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;