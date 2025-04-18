import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../Redux/Slices/AuthSlice';
import  logo from "../assets/image/blackLogo.png"
export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  async function handleLogout() {
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      navigate("/signin");
    }
  }
const { profile, error, data, role } = useSelector(state => state.auth);
  console.log("profile data is",profile?.userInfo)

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/task">Task</Link></li>
      <li><Link to="/about">About</Link></li>
      {isLoggedIn && (
        <>
         
          <li><Link to="/create-task">Create Task</Link></li>
         
          {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
          <li><Link to="/get-profile"><img className='w-[30px] object-cover rounded-full' src={profile?.userInfo?.profilePic?.secure_url} alt="" /></Link></li>
        </>
      )}
      {!isLoggedIn && (
        <li><Link to="/signin">Login</Link></li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className=""><img className='w-[150px]' src={logo} alt="" /></Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}
