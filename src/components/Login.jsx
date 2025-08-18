// import React, { use } from 'react'
// import {useState} from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import {addUser} from '../utils/userSlice';
// import { useNavigate }  from 'react-router-dom';
// import { useDispatch } from 'react-redux';


// const Login = () => {
//     const [emailId, setEmailId] = useState("");
//     const [password, setPassword] = useState("Singh@123456");
//    const dispatch = useDispatch();
//    const navigate = useNavigate();
//    const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);
//    const [error, setError] = useState("");
//     const handleLogin = async () => {
//         try{const res = await axios.post(BASE_URL+"/login",{
//             emailId,
//             password

//         },{withCredentials: true})
//       dispatch(addUser(res.data));
//       return navigate("/");
//       }catch(err){
//             // console.log("Error from login => "+err);
//             setError(err?.response?.data || "Something went wrong")
//         }
//     }

//     const handleSignUp = async () => {
//       try{
//         const res = await axios.post(
//           BASE_URL+"/signup",
//           {firstName, lastName, emailId, password},
//           {withCredentials: true}
//         )
//         dispatch(addUser(res.data.data));
//         return navigate("/profile");
//       }catch(err){
//         setError(err?.response?.data || "Something went wrong")
//       }
//     }
//   return (
//     <div className="card bg-primary text-primary-content w-96 flex items-center justify-center mx-auto my-40">
//   <div className="card-body">
//     <fieldset className="fieldset">
//   <legend className="fieldset-legend text-3xl">Email Id</legend>
//   <input type="text" value={emailId} className="input input-primary text-xl w-80 h-10 mt-2 p-3" placeholder="username@site.com" onChange={(e) => setEmailId(e.target.value) 
//   } required/>
  
// </fieldset>
// <fieldset className="fieldset">
//   <legend className="fieldset-legend text-3xl">Password </legend>
//   <input type="password" className="input input-primary text-xl w-80 h-10 mt-2 p-3"  placeholder="••••••••" required
//   value={password} onChange={(e) => setPassword(e.target.value)}/>
// </fieldset>
//     <p className="text-red-400 font-stretch-semi-condensed font-bold">{error}</p>
//     <div className="card-actions justify-center mt-3">
//       <button className="btn justify-center w-30 h-15 text-2xl hover:bg-indigo-950" onClick={handleLogin}>Login</button>
//     </div>
//   </div>
// </div>


//   )
// }

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login handler
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Signup handler
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="card bg-primary text-primary-content w-96 flex items-center justify-center mx-auto my-40">
      <div className="card-body">
        <h2 className="text-3xl font-bold text-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>

        {/* First Name + Last Name (only for Signup) */}
        {!isLoginForm && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-2xl">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input input-primary text-xl w-80 h-10 mt-2 p-3"
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-2xl">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input input-primary text-xl w-80 h-10 mt-2 p-3"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </>
        )}

        {/* Email Field */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-2xl">Email Id</legend>
          <input
            type="text"
            value={emailId}
            className="input input-primary text-xl w-80 h-10 mt-2 p-3"
            placeholder="username@site.com"
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </fieldset>

        {/* Password Field */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-2xl">Password</legend>
          <input
            type="password"
            className="input input-primary text-xl w-80 h-10 mt-2 p-3"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </fieldset>

        {/* Error Message */}
        <p className="text-red-400 font-bold">{error}</p>

        {/* Submit Button */}
        <div className="card-actions justify-center mt-3">
          <button
            className="btn justify-center w-30 h-15 text-2xl hover:bg-indigo-950"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        {/* Toggle Login / Signup */}
        <p
          className="text-center mt-4 cursor-pointer underline"
          onClick={() => setIsLoginForm((prev) => !prev)}
        >
          {isLoginForm
            ? "New User? Signup Here"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
