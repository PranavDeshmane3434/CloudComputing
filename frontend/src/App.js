import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/tasks`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      setTasks(data);
      setError("");
    } catch (err) {
      setError("Failed to connect to server. Check backend URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 To-Do Manager</h1>
          <p>Manage your tasks efficiently</p>
        </header>

        {error && <div className="error-banner">{error}</div>}

        <TaskForm fetchTasks={fetchTasks} />

        <div className="stats-bar">
          <div className="stat-pill total-pill">
            Total: {totalTasks}
          </div>

          <div className="stat-pill pending-pill">
            Pending: {pendingTasks}
          </div>

          <div className="stat-pill completed-pill">
            Completed: {completedTasks}
          </div>
        </div>

        <div className="filter-bar">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active-filter" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
        )}
      </div>
    </div>
  );
}

export default App;