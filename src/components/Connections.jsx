// import React from 'react'
// import {BASE_URL} from "../utils/constants";
// import axios from "axios";
// import {useEffect, useState} from "react";
// import {connect, useDispatch, useSelector} from "react-redux";
// import {addConnections} from "../utils/connectionSlice"
// import ProfilePhoto from './ProfilePhoto';

// const Connections = () => {
//   const [loading, setLoading] = useState(true);
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();
//   const fetchConnections = async () => {
//     try {
//       setLoading(true);   
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnections(res.data.data));
//     } catch (err) {
//       console.error("Error fetching connections:", err);
//       dispatch(addConnections([]));
//     }finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   // if (!connections) return;

//   // if (connections.length === 0) return <h1> No Connections Found</h1>;
//   if (loading) {
//     return <h1 className="text-center text-white mt-10">Loading connections...</h1>;
//   }

  
//   if (!connections || connections.length === 0) {
//     return <h1 className="text-center text-white mt-10">No Connections Found</h1>;
//   }

//   return (
//     <div className="text-center my-10">
//       <h1 className="text-bold text-white text-3xl m-2">Connections</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center ">
//       {connections.map((connection) => {
//         const {_id, firstName, lastName, photoUrl, age, gender, about } =
//           connection;

//         return (
// //      <div className="card card-side bg-base-100 shadow-sm">
// //   <figure>
// //     <ProfilePhoto user={connection}/>
// //     {/* <img
// //       src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
// //       alt="Movie" /> */}
// //   </figure>
// //   <div className="card-body">
// //     <h2 className="card-title">{firstName + " " + lastName}</h2>
// //     {age && gender && <p>{age + ", " + gender}</p>}
// //     <p>{about}</p>
// //     <div className="card-actions justify-end">
// //       <button className="btn btn-primary">Watch</button>
// //     </div>
// //   </div>
// // </div>
// <div key={_id} className="card bg-base-100 w-80 shadow-sm bg-slate-900 m-5 ">
//   <div className="card-body">
    
//   </div>
//   <figure>
//     <ProfilePhoto user={connection}/>
//     {/* <img
//       src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//       alt="Shoes" /> */}
//   </figure>
//   <h1 className="card-title justify-center m-1 text-2xl">{firstName + " "+ lastName}</h1>
//     {age && gender && <p>{age + ", " + gender}</p>}
//               <p>{about}</p>
// </div>
//         );
//       })}
//       </div>
//     </div>
//   );
// };

// export default Connections;


import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ProfilePhoto from "./ProfilePhoto";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
      dispatch(addConnections([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return <h1 className="text-center text-white mt-10">Loading connections...</h1>;
  }

  if (!connections || connections.length === 0) {
    return <h1 className="text-center text-white mt-10">No Connections Found</h1>;
  }

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl mb-8">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="card w-80 bg-slate-900 shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <figure className="h-48 w-full overflow-hidden">
                {/* Zoomable Profile Photo */}
                <Zoom>
                  <ProfilePhoto
                    user={connection}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </Zoom>
              </figure>
              <div className="card-body text-left p-4 text-white">
                <h2 className="card-title text-xl font-semibold">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-300">{age + " yrs, " + gender}</p>
                )}
                <p className="mt-2 text-gray-400 line-clamp-3">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
