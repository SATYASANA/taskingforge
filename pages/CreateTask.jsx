import React from 'react'
import createTask from "../assets/image/create-task.jpg"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function CreateTask() {
    const {isLoggedIn}  = useSelector((state)=>state.auth)
    console.log(isLoggedIn)
    if(!isLoggedIn){
        return <Navigate to="/signin" replace/>} 
  return (
    <section>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Dail Activity</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={createTask} // you can replace with your own image
            alt="form visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    </section>
  )
}
