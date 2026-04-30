function TaskList({ tasks, fetchTasks }) {
  const toggleStatus = async (task) => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            status: task.status === "pending" ? "completed" : "pending"
          })
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`, {
        method: "DELETE"
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-left">
            <div
              className={`status-dot ${
                task.status === "completed"
                  ? "completed-dot"
                  : "pending-dot"
              }`}
            ></div>

            <div>
              <h3
                className={`task-title ${
                  task.status === "completed" ? "completed-text" : ""
                }`}
              >
                {task.title}
              </h3>

              <p className="task-description">{task.description}</p>
            </div>
          </div>

          <div className="task-actions">
            <button
              className="status-btn"
              onClick={() => toggleStatus(task)}
            >
              ✅
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;