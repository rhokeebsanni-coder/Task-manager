import React from "react";
import {Navigate} from "react-router-dom"
import Input from "../components/Input";
import Task from "../components/Task";
import API from "../api/tasks";
import HomepageSkeleton from "../components/HomepageSkeleton";

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
  const [token , setToken] = React.useState(localStorage.getItem("token"))

  if(!token) {
    return <Navigate to="/login" replace={true} />;
  }
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setHomeLoading(true);
        const response = await API.get("/tasks");
        setTask(response.data);
        setMessage({ msg: "Data loaded successfully", success: true });
      } catch (error) {
        setMessage({
          msg: error.response?.data?.msg || "Something went wrong",
          success: false,
        });
      } finally {
        setHomeLoading(false);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    };
    fetchData();
  }, []);

  const renderTask = (task) => (
    <Task
      key={task._id}
      id={task._id}
      value={task.task}
      completed={task.completed}
      handleChange={handleChange}
      setShowDelete={setShowDelete}
      setShowEdit={setShowEdit}
      setId={setDelId}
    />
  );

  const completedTasks = task.filter((t) => t.completed).map(renderTask);
  const unCompletedTasks = task.filter((t) => !t.completed).map(renderTask);

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
      setTimeout(() => {
        setMessage(null);
      }, 2000);
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
      });
      setTask((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, task: response.data.task } : t,
        ),
      );
      setMessage({ msg: "Update successful", success: true });
    } catch (error) {
      setMessage({
        msg: error.response?.data?.msg || "Something went wrong",
        success: false,
      });
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      setHint(false);
      setShowEdit(false);
      setLoading(false);
    }
  }

  async function handleChange(id, checked) {
    try {
      const response = await API.patch(`/tasks/${id}`, { completed: checked });
      console.log(response.data);
      setTask((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: response.data.completed } : t,
        ),
      );
      setMessage({ msg: "Update successful", success: true });
    } catch (error) {
      setMessage({
        msg: error.response?.data?.msg || "Something went wrong",
        success: false,
      });
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  }
  if (homeLoading) {
    return <HomepageSkeleton />;
  }
  return (
    <div className="app-wrapper">
      <div className="main-card">
        <header className="header">
          <h1>What we cooking?</h1>
          <p>Capture your thoughts, one task at a time.</p>
        </header>

        <Input
          taskRef={inputRef}
          setTasks={setTask}
          setLoading={setLoading}
          setMessage={setMessage}
        />

        <div className="sections-container">
          {unCompletedTasks.length > 0 && (
            <section className="task-section">
              <h2 className="section-title">Ongoing</h2>
              <div className="list-gap">{unCompletedTasks}</div>
            </section>
          )}

          {completedTasks.length > 0 && (
            <section className="task-section finished">
              <h2 className="section-title">Finished</h2>
              <div className="list-gap">{completedTasks}</div>
            </section>
          )}
        </div>
      </div>

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

      {showEdit && (
        <div className="modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={(e) => editTask(e, delId)}>
              <h3>Edit Task</h3>
              <input
                ref={editRef}
                className="modal-input"
                autoFocus
                placeholder="Edit Task..."
              />
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
          <div className="loader"></div>
        </div>
      )}
      {message && (
        <div
          className={`toast-notification ${message.success ? null : "msg-error"}`}
        >
          <div className="toast-content">
            <span className="toast-icon">☕</span>
            <p className="toast-message">{message.msg}</p>
          </div>
          <button className="toast-close" onClick={() => setMessage("")}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
