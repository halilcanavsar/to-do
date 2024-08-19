import React from 'react';
import api from '../axiosConfig';

const TaskList = ({ tasks, setTasks }) => {
  const toggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updatedTask = { ...task, completed: !task.completed };
      const res = await api.put(`/tasks/${id}`, updatedTask); // Using the Axios instance here
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.text}
          </span>
          <button onClick={() => toggleComplete(task._id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
export default TaskList;
