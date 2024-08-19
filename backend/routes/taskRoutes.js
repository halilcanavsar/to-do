const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//Create new task
router.post('/tasks', async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = new Task({ text });
    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks, 'tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//Update task
router.put('/tasks/:id', async (req, res) => {
  const { text, completed } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    //Update the task's text and completion status if provided
    task.text = text || task.text;
    task.completed = completed !== undefined ? completed : task.completed;
    task = await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//Delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    console.log(Task.findById(req.params.id));
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
