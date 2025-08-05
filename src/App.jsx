import { useState, useEffect } from 'react';
import './index.css'

function App() {
   const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">📝 To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 border rounded w-64"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>All</button>
        <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-white border'}`}>Completed</button>
        <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white border'}`}>Pending</button>
      </div>

      <ul className="w-full max-w-md">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white p-3 rounded shadow mb-2"
          >
            <span
              className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </li>
        ))}
        {filteredTasks.length === 0 && <p className="text-gray-500 text-center">No tasks found.</p>}
      </ul>
    </div>
  );
}


export default App
