import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTask } from '../Redux/Slices/TaskSlice'
import { useSelector } from 'react-redux'

export default function YourTask() {
    const dispatch = useDispatch()
    const {tasks} = useSelector((state)=>state.task)
    console.log(tasks)
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            await dispatch(getTask());
          } catch (err) {
            console.error('Error fetching tasks:', err);
          }
        };
      
        fetchTasks();
      }, [dispatch]);

    
  return (
   <div className='min-h-[80vh]'>
     <div className="overflow-x-auto mt-5 w-3/4 mx-auto bg-amber-100 rounded-2xl ">
    <table className="table table-zebra text-white py-5 ">
      {/* head */}
      <thead className='text-black text-xl border-b-2'>
        <tr>
          
          <th>Project Title</th>
          <th>Project Description</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody className='text-black '>
        {/* row 1 */}
       {tasks && tasks?.AllTask?.map(t=>{
  const date = new Date(t.dueDate);
  const day = String(date.getDate()).padStart(2,"0")
  const month = String(date.getMonth()+1).padStart(2,"0")
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`
         return (<tr>
        <td className='border-b-2 border-b-black-800'>{t.title}</td>
        <td className='border-b-2 border-b-black-800'>{t.description}</td>
        <td className='border-b-2 border-b-black-800'>{formattedDate}</td>
       </tr>)})}
      </tbody>
    </table>
  </div>
   </div>
  )
}
