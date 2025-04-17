import React from 'react'
import taskImage from "../assets/image/taskImage.jpg"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    

<section>
<div className='hero-task py-10'>
<div className='px-10 flex justify-between'>
  <div className='w-[50%]'>
  <h1 className='uppercase text-start text-4xl text-blue-600 font-bold transform-gpu hover:rotate-y-12 transition duration-500'>
  Manage Your Tasks Effortlessly</h1>
  <p className="text-blue-600 font-medium text-3xl mt-2 transform-gpu hover:rotate-y-12 transition duration-500 uppercase">Stay organized and boost productivity.</p>
  <p className='mt-5 text-xl text-gray-700'>
No more juggling tasks or forgetting deadlines — we’ve got one system to rule them all. Stay sharp, stay synced, and smash your goals. Your day, your way — just more organized. Let’s keep it tight, get it done, and make every task a win. Let’s run this like pros.
</p>
<Link className='w-30 py-5 btn mt-4 bg-white text-blue-800 p-4 transition transform duration-300 ease-in-out hover:scale-105
 hover:bg-blue-600 hover:text-white'  to="/signup">Signup</Link>
  </div>
  
</div>
</div>
</section>
    
 
  )
}
