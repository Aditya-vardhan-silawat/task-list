import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter task title..." 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <button type="submit" disabled={!title.trim()}>Add</button>
    </form>
  );
};

export default TaskForm;
