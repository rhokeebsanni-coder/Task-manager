import React from "react";

const PRIORITY_LABELS = { high: "🔴 High", mid: "🟡 Mid", low: "🟢 Low" };

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return (
      "Today · " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    );
  }
  if (isYesterday) return "Yesterday";
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const Task = ({
  id,
  value,
  completed,
  priority = "mid",
  createdAt,
  handleChange,
  setShowDelete,
  setShowEdit,
  setId,
  setEditPriority,
}) => {
  const handleDelete = () => {
    setId(id);
    setShowDelete(true);
  };

  const handleEdit = () => {
    setId(id);
    setEditPriority(priority);
    setShowEdit(true);
  };

  return (
    <div
      className={`task-item priority-${priority}${completed ? " completed-task" : ""}`}
    >
      <div className="task-left">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={completed}
          onChange={(e) => handleChange(id, e.target.checked)}
          aria-label={`Mark "${value}" as ${completed ? "incomplete" : "complete"}`}
        />

        <div className="task-text-wrap">
          <p className={`task-text${completed ? " completed" : ""}`}>{value}</p>
          <div className="task-meta-row">
            {priority && (
              <span className={`priority-badge ${priority}`}>
                {PRIORITY_LABELS[priority]}
              </span>
            )}
            {createdAt && (
              <span className="task-timestamp">{formatDate(createdAt)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="action-btn"
          onClick={handleEdit}
          aria-label="Edit task"
          title="Edit"
        >
          ✏️
        </button>
        <button
          className="action-btn delete"
          onClick={handleDelete}
          aria-label="Delete task"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Task;
