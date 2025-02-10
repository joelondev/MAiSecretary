import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', frequency: '' });

  // Fetch tasks from backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  // Add a new task
  const handleAddTask = () => {
    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => {
        alert(response.data.message);
        setTasks([...tasks, newTask]);
        setNewTask({ title: '', description: '', frequency: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>AI Secretary Agent</h1>
      <div>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Frequency"
          value={newTask.frequency}
          onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>: {task.description} (Frequency: {task.frequency})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;