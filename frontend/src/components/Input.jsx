import React from "react";
import placeHolders from "../data/placeHolders";
import API from "../api/tasks";

const Input = React.forwardRef(({ setTasks, setLoading, setMessage }, taskRef) => {
  const [hint, setHint] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [priority, setPriority] = React.useState("mid");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeHolders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = taskRef.current.value.trim();
    if (!value) return setHint(true);

    setHint(false);
    try {
      setLoading(true);
      const response = await API.post("/tasks", { task: value, priority });
      setTasks((prev) => [response.data, ...prev]);
      setMessage({ msg: "Task added successfully", success: true });
      setPriority("mid"); // reset after submit
    } catch (error) {
      setMessage({
        msg: error.response?.data?.msg || "Something went wrong",
        success: false,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 2000);
      taskRef.current.value = "";
    }
  };

  return (
    <div className="input-box">
      <form onSubmit={handleSubmit} className="input-form">
        <div className={hint ? "input-wrapper error" : "input-wrapper"}>
          <input
            className="main-input"
            ref={taskRef}
            placeholder={placeHolders[index]}
            onChange={() => hint && setHint(false)}
          />
          <select
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            title="Set priority"
          >
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
          </select>
          <button className="add-btn" type="submit">
            Add
          </button>
        </div>
        {hint && <p className="hint-text">Please enter a task</p>}
      </form>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
