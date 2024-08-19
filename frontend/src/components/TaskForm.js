import React, { useState } from 'react';
import api from '../axiosConfig';

const TaskForm = ({ addTask }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const newTask = { text };
      const res = await api.post('/tasks', newTask);
      addTask(res.data);
      setText('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
export default TaskForm;
