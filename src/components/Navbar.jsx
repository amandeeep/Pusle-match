import React from 'react'

import { BASE_URL, FRONT_URL } from '../utils/constants';
import ProfilePhoto from './ProfilePhoto';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 
import {Link, useNavigate} from 'react-router-dom'
import { removeUser } from '../utils/userSlice';
import defaultMale from '../images/male_user.jpg';
import defaultFemale from '../images/female1.jpg';
import other from '../images/other.webp'
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
      await axios.get(BASE_URL + "/logout",{ withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch(err){
      console.log("Error logging out:", err);
    }
  }
  const getProfileImage = () => {
    if (user?.photoUrl) return user.photoUrl;
    if (user?.gender === "male") return defaultMale;
    if (user?.gender === "female") return defaultFemale;
    return other// fallback for other/undefined
  };
  return (
    <div className="navbar bg-success-content shadow-sm ">
  <div className="flex-1 text-2xl font-bold">
    {/* <a className="btn btn-ghost text-xl">PulseMatch 💓</a> */}
    <Link to="/">PulseMatch 💓</Link>
  </div>
  {user ? (<div className="flex gap-2">
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-6">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src = {getProfileImage()}/>
            // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          {/* <a className="justify-between"> */}
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          {/* </a> */}
          </Link>
        </li>
        <li><Link to='/connections'>Connections</Link></li>
        <li>
                <Link to="/requests">Requests</Link>
              </li>
        <li>
            <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>): (
          // Show when NOT logged in
          <a href={FRONT_URL + '/login'} className="btn">Login</a>
        )}
</div>
  )
}

export default Navbar