const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../tasks.json');

// Helper to read tasks from JSON file
const readTasks = async () => {
  try {
    if (!await fs.exists(TASKS_FILE)) {
      await fs.writeJson(TASKS_FILE, []);
      return [];
    }
    return await fs.readJson(TASKS_FILE);
  } catch (err) {
    console.error('Error reading tasks:', err);
    return [];
  }
};

// Helper to write tasks to JSON file
const writeTasks = async (tasks) => {
  try {
    await fs.writeJson(TASKS_FILE, tasks, { spaces: 2 });
  } catch (err) {
    console.error('Error writing tasks:', err);
  }
};

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// POST a new task
router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = await readTasks();
  const newTask = {
    id: Date.now().toString(), // Simple ID generation
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
});

// PATCH (update) task completion status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  let tasks = await readTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update only completed field if it's provided
  if (typeof completed === 'boolean') {
    tasks[taskIndex].completed = completed;
  }

  await writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  let tasks = await readTasks();
  const filteredTasks = tasks.filter(t => t.id !== id);

  if (tasks.length === filteredTasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  await writeTasks(filteredTasks);
  res.status(204).send(); // No content
});

module.exports = router;
