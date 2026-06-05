import React from "react";
import { Navigate } from "react-router-dom";
import Input from "../components/Input";
import Task from "../components/Task";
import API from "../api/tasks";
import HomepageSkeleton from "../components/HomepageSkeleton";

/* ── Streak helpers ───────────────────────────────────────── */
function getStreak() {
  return JSON.parse(
    localStorage.getItem("db_streak") || '{"count":0,"lastDate":null}',
  );
}

function updateStreak() {
  const today = new Date().toDateString();
  const stored = getStreak();
  if (stored.lastDate === today) return stored.count;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isConsecutive = stored.lastDate === yesterday.toDateString();
  const newCount = isConsecutive ? stored.count + 1 : 1;
  localStorage.setItem(
    "db_streak",
    JSON.stringify({ count: newCount, lastDate: today }),
  );
  return newCount;
}

function getStreakFromStorage() {
  const stored = getStreak();
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (!stored.lastDate) return 0;
  if (stored.lastDate === today || stored.lastDate === yesterday.toDateString())
    return stored.count;
  return 0;
}

const Home = () => {
  const inputRef = React.useRef(null);
  const editRef = React.useRef(null);

  const [task, setTask] = React.useState([]);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [delId, setDelId] = React.useState();
  const [hint, setHint] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [homeLoading, setHomeLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [editPriority, setEditPriority] = React.useState("mid");
  const [streak, setStreak] = React.useState(5);
  const [token] = React.useState(localStorage.getItem("token"));

  if (!token) return <Navigate to="/login" replace />;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setHomeLoading(true);
        const response = await API.get("/tasks");
        setTask(response.data);
        setMessage({ msg: "Tasks loaded", success: true });
      } catch (error) {
        setMessage({
          msg: error.response?.data?.msg || "Something went wrong",
          success: false,
        });
      } finally {
        setHomeLoading(false);
        setTimeout(() => setMessage(null), 2000);
      }
    };
    fetchData();
  }, []);

  /* ── stats ── */
  const totalTasks = task.length;
  const completedCount = task.filter((t) => t.completed).length;
  const remainingCount = totalTasks - completedCount;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  const todayLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  /* ── filter + search + split ── */
  const afterFilter =
    filter === "all"
      ? task
      : filter === "active"
        ? task.filter((t) => !t.completed)
        : task.filter((t) => t.completed);

  const afterSearch = search.trim()
    ? afterFilter.filter((t) =>
        t.task.toLowerCase().includes(search.toLowerCase()),
      )
    : afterFilter;

  const unCompletedTasks = afterSearch.filter((t) => !t.completed);
  const completedTasks = afterSearch.filter((t) => t.completed);

  const renderTask = (t) => (
    <Task
      key={t._id}
      id={t._id}
      value={t.task}
      completed={t.completed}
      priority={t.priority}
      createdAt={t.createdAt}
      handleChange={handleChange}
      setShowDelete={setShowDelete}
      setShowEdit={setShowEdit}
      setId={setDelId}
      setEditPriority={setEditPriority}
    />
  );

  /* ── actions ── */
  async function deleteTask(id) {
    try {
      setLoading(true);
      const response = await API.delete(`/tasks/${id}`);
      setMessage({ msg: response.data.msg, success: true });
      setTask((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      setMessage({
        msg: error.response?.data?.msg || "Something went wrong",
        success: false,
      });
    } finally {
      setShowDelete(false);
      setLoading(false);
      setTimeout(() => setMessage(null), 2000);
    }
  }

  async function editTask(e, id) {
    e.preventDefault();
    try {
      const value = editRef.current.value.trim();
      setLoading(true);
      if (!value) return setHint(true);
      const response = await API.patch(`/tasks/${id}`, {
        task: value,
        priority: editPriority,
      });
      setTask((prev) =>
        prev.map((t) =>
          t._id === id
            ? {
                ...t,
                task: response.data.task,
                priority: response.data.priority,
              }
            : t,
        ),
      );
      setMessage({ msg: "Update successful", success: true });
    } catch (error) {
      setMessage({
        msg: error.response?.data?.msg || "Something went wrong",
        success: false,
      });
    } finally {
      setTimeout(() => setMessage(null), 2000);
      setHint(false);
      setShowEdit(false);
      setLoading(false);
    }
  }

  async function handleChange(id, checked) {
    try {
      const response = await API.patch(`/tasks/${id}`, { completed: checked });
      setTask((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: response.data.completed } : t,
        ),
      );
      setMessage({ msg: "Update successful", success: true });
      if (checked) {
        const newStreak = updateStreak();
        setStreak(newStreak);
      }
    } catch (error) {
      setMessage({
        msg: error.response?.data?.msg || "Something went wrong",
        success: false,
      });
    } finally {
      setTimeout(() => setMessage(null), 2000);
    }
  }

  if (homeLoading) return <HomepageSkeleton />;

  return (
    <div className="app-wrapper">
      <div className="main-card">
        {/* ── Dashboard ── */}
        <div className="dashboard-card">
          <div className="dashboard-header">
            <div className="dashboard-title-row">
              <div>
                <h1>What we cooking? ☕</h1>
                <p className="today-label">{todayLabel}</p>
              </div>
              {streak > 0 && (
                <div className="streak-badge">
                  <span className="streak-fire">🔥</span>
                  <span className="streak-count">{streak}</span>
                  <span className="streak-label">
                    day{streak !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-info">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <h2>{totalTasks}</h2>
              <span>Total</span>
            </div>
            <div className="stat-box completed">
              <h2>{completedCount}</h2>
              <span>Done</span>
            </div>
            <div className="stat-box remaining">
              <h2>{remainingCount}</h2>
              <span>Left</span>
            </div>
          </div>
        </div>

        {/* ── Input + search + filters ── */}
        <div className="input-outer">
          <Input
            taskRef={inputRef}
            setTasks={setTask}
            setLoading={setLoading}
            setMessage={setMessage}
          />

          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-tabs">
            {["all", "active", "done"].map((f) => (
              <button
                key={f}
                className={`filter-tab${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── Task lists ── */}
        <div className="sections-container">
          {task.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">☕</div>
              <h3>Nothing brewing yet</h3>
              <p>Add your first task to get started.</p>
            </div>
          )}

          {search && afterSearch.length === 0 && task.length > 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No results for "{search}"</h3>
              <p>Try a different keyword.</p>
            </div>
          )}

          {unCompletedTasks.length > 0 && (
            <section className="task-section">
              <h2 className="section-title">Ongoing</h2>
              <div className="list-gap">{unCompletedTasks.map(renderTask)}</div>
            </section>
          )}

          {completedTasks.length > 0 && (
            <section className="task-section finished">
              <h2 className="section-title">Finished</h2>
              <div className="list-gap">{completedTasks.map(renderTask)}</div>
            </section>
          )}
        </div>
      </div>

      {/* ── Delete modal ── */}
      {showDelete && (
        <div className="modal-overlay" onClick={() => setShowDelete(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Task?</h3>
            <p>This will remove the task permanently.</p>
            <div className="modal-btns">
              <button
                onClick={() => setShowDelete(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button onClick={() => deleteTask(delId)} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit modal ── */}
      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={(e) => editTask(e, delId)}>
              <h3>Edit Task</h3>
              <input
                ref={editRef}
                className="modal-input"
                autoFocus
                placeholder="Edit task..."
              />
              <select
                className="priority-select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: "8px",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid rgba(28,16,8,0.12)",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                }}
              >
                <option value="low">🟢 Low</option>
                <option value="mid">🟡 Mid</option>
                <option value="high">🔴 High</option>
              </select>
              {hint && (
                <p
                  style={{
                    color: "var(--priority-high)",
                    fontSize: "0.8rem",
                    marginBottom: "8px",
                  }}
                >
                  Please enter a task name.
                </p>
              )}
              <div className="modal-btns">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading && (
        <div className="modal-overlay">
          <div className="loader" />
        </div>
      )}

      {message && (
        <div
          className={`toast-notification${message.success ? "" : " msg-error"}`}
        >
          <div className="toast-content">
            <span className="toast-icon">☕</span>
            <p className="toast-message">{message.msg}</p>
          </div>
          <button className="toast-close" onClick={() => setMessage(null)}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
