import React, { useState, useEffect } from 'react'

const Demo = () => {
     const [tasks, setTasks] = useState([]);
      const [input, setInput] = useState('');
      const [filter, setFilter] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(stored);
    }, []);

    useEffect(() =>
    {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])

    const addTask = (() => {
        if(input.trim){
            setTasks([...tasks,{id: Date.now(), text: input, completed: false}]);
            setInput();
            
        }
    });

    const deleteTask = ((id) => {
        setTasks(tasks.filter(t => t.id != id));
    })

    const toggleComplete = ((id) => {
        setTasks(tasks.map(t => t.id === id ? {...t, completed : !t.completed} : t));
    });

    const filteredTasks = tasks.filter( task => {
        if(filter === 'completed') return task.completed;
        if(filter === 'pending') return !task.completed;
        return true;
    });

  return (
    <div className='flex flex-col  bg-gray-100 items-center p-6 gap-2'>
        <h1 className='text-3xl font-bold mb-4'>To do List</h1>
        <div>
            <input placeholder='Enter Task Here' className='border p-2 rounded-sm mr-2' value={input} onChange={(e) => setInput(e.target.value)}></input>   
            <button className='bg-blue-500 hover:bg-blue-700 p-2 rounded-sm text-white' onClick={addTask}>Add</button> 
        </div>
        <div className='flex gap-2'>
            <button onClick={() => setFilter('all')} className='bg-blue-500 p-2 px-4 rounded-sm text-white hover:bg-blue-700'>All</button>
            <button onClick={() => setFilter('completed')} className='bg-blue-500 p-2 px-4 rounded-sm text-white hover:bg-blue-700'>Completed</button>
            <button onClick={() => setFilter('pending')} className='bg-blue-500 p-2 px-4 rounded-sm text-white hover:bg-blue-700'>Pending</button>
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
  )
}

export default Demo