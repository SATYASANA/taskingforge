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
    <div className="overflow-x-auto mt-5 w-3/4 mx-auto table-task-bg">
    <table className="table table-zebra bg-[#f5f5dc6e]">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
          <th>1</th>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr>
        {/* row 2 */}
        <tr>
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
        {/* row 3 */}
        <tr>
          <th>3</th>
          <td>Brice Swyre</td>
          <td>Tax Accountant</td>
          <td>Red</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
