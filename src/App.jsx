import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Home from '../pages/Home'
import { useSelector } from 'react-redux'
import NavBar from '../pages/NavBar'
import CreateTask from '../pages/CreateTask'
import PrivateRoute from '../helpers/PrivateRoute'
import Profile from '../pages/Profile'
import YourTask from '../pages/YourTask'

function App() {

const {isLoggedIn}  = useSelector(state=>state.auth)

  return (
    <>
    {isLoggedIn&&<NavBar/>}
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/create-task" element={<PrivateRoute><CreateTask/></PrivateRoute>}/>
    <Route path="/get-profile" element={<Profile/>}/>
    <Route path="/task" element={<YourTask/>}/>
    
   </Routes>
    </>
  )
}

export default App
