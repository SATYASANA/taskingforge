import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import axiosInstance from '../helpers/axiosInstance';
import { createTask } from '../Redux/Slices/TaskSlice';
// title,description,dueDate,priority,taskStatus,subTask
export default function CreateTask() {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [allData,setAllData] = useState({
title:"",
description:"",
dueDate:"",
priority:"",
taskStatus:"",
subTask:[]
  })
function handleInput(e){
  e.preventDefault;
  const {name,value} = e.target;
  setAllData({
    ...allData,
    [name]:value
  })
}
const addSubtask = (e) => {
    e.preventDefault()
    if (newSubtask.trim() !== '') {
      const newTask = {
        title: newSubtask,
        isDone: 0,
      };
      setSubtasks([...subtasks, newTask]);
      setAllData({
        ...allData,
        subTask:subtasks
      })
      setNewSubtask('');  // Reset the input field
    }
  };

  // Function to toggle the completion status of a subtask
  const toggleSubtask = (index) => {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? { ...subtask, isDone: subtask.isDone === 0 ? 1 : 0 } : subtask
    );
    setSubtasks(updatedSubtasks);
  };
  const deleteSubtask = (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  async function createNewTask(e){
    e.preventDefault()
   const res = await dispatch(createTask(allData))
   if(res?.payload?.success){
    setAllData({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      taskStatus: "",
      subTask: []
    });
    setSubtasks([]);
    setNewSubtask('');

   }
  }
    const {isLoggedIn}  = useSelector((state)=>state.auth)

    if(!isLoggedIn){
        return <Navigate to="/signin" replace/>} 
        // title,description,dueDate,priority,taskStatus,subTask
  return (
    <section>

    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-full p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Daily Activity</h2>
          <form className="space-y-4" onSubmit={createNewTask}>
            <div>
              <label htmlFor='title' className="block text-gray-600 mb-1">Project Title</label>
              <input
                type="text" name='title' id="title" value={allData.title} onChange={handleInput}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor='description' className="block text-gray-600 mb-1">Project Description</label>
              <textarea
                rows="4" name="description" id="description" value={allData.description} onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
           <div className='flex gap-4'>
           <div className='w-1/3'>
              <label htmlFor='dueDate' className="block text-gray-600 mb-1">Due Date</label>
              <input
                type="date" name='dueDate' id="dueDate" value={allData.dueDate} onChange={handleInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className='w-1/3'>
              <label htmlFor='priority'  className="block text-gray-600 mb-1">Priority</label>
              <select name="priority" id="priority" value={allData.priority} onChange={handleInput}  className="select border-gray-300 w-full">
  <option value="" disabled={true}>Select Priority</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
            </div>

            <div className='w-1/3'>
              <label htmlFor='taskStatus'  className="block text-gray-600 mb-1">Task Status</label>
              <select value={allData.taskStatus} onChange={handleInput} name='taskStatus' id="taskStatus"  className="select border-gray-300 w-full">
               <option value="" disabled={true}>Select Status</option>
              <option value="Backlog">Back Log</option>
             <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              </select>
            </div>
           </div>

            <div>
              <label htmlFor="subTask" className='block text-gray-600 mb-1'>Sub Task</label>
              <div className='mb-4'>
              <input
                type="text"
                id="subTask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
                <button className='btn mt-3 btn-primary w-1/4' onClick={addSubtask}>Add</button>
              </div>
              <ul className="space-y-2">
        {subtasks.map((subtask, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={subtask.isDone === 1}
              onChange={() => toggleSubtask(index)}
              className="h-5 w-5"
            />
            <span
              className={`flex-1 ${subtask.isDone === 1 ? 'line-through text-gray-500' : ''}`}
            >
              {subtask.title}
            </span>
            <button
            type='button'
              onClick={() => deleteSubtask(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
            </div>
            <button
              type="submit"
              className="w-1/4 block m-auto  bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Image */}
        {/* <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={createTask} // you can replace with your own image
            alt="form visual"
            className="w-full h-full object-cover"
          />
        </div> */}
      </div>
    </div>
    </section>
  )
}
