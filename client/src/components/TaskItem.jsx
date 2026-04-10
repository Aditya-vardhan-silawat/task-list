import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className="task-item">
      <div className="task-content">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggle(task.id, !task.completed)} 
        />
        <span className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </span>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
