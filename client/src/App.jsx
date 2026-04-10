import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

const API_URL = 'http://localhost:5001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Make sure the server is running!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Could not add task. Try again later.');
    }
  };

  // Toggle task status
  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { completed });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (err) {
      console.error('Error toggling task:', err);
      setError('Could not update task.');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Could not delete task.');
    }
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <TaskForm onAdd={addTask} />

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
      )}
    </div>
  );
}

export default App;
