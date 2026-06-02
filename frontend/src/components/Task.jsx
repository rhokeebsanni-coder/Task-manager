import React from "react";
import Edit from "../assets/editicon.png";
import Delete from "../assets/deleteicon.png";

const Task = (props) => {
  return (
    <div className="task-item">
      <div className="task-left">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={props.completed}
          onChange={(e) => props.handleChange(props.id, e.target.checked)}
        />
        <p className={props.completed ? "task-text completed" : "task-text"}>
          {props.value}
        </p>
      </div>

      <div className="task-actions">
        <button
          onClick={() => {
            props.setShowEdit(true);
            props.setId(props.id);
          }}
          className="action-btn"
        >
          <img src={Edit} alt="Edit" />
        </button>
        <button
          onClick={() => {
            props.setShowDelete(true);
            props.setId(props.id);
          }}
          className="action-btn delete"
        >
          <img src={Delete} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default Task;
