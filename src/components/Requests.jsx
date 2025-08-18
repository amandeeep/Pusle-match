import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import ProfilePhoto from "./ProfilePhoto";
import {  useState } from "react";
import { addRequests, removeRequest } from "../utils/requestSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

const reviewRequest = async (status, _id, requestId) => {
    try {
      console.log(_id);
      await axios.post(
      BASE_URL + "/request/received/" + status + "/" + _id,
      
      {},
      { withCredentials: true }
    );
    dispatch(removeRequest(requestId)); // now this works if imported
  } catch (err) {
    console.error("Error updating request:", err);
  }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

          console.log("_id is" + _id);
  console.log("request._id is" + request._id);
  console.log("request.fromUserId is" + request.fromUserId._id);
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto w-2/3"
          >
            <div className="w-50 ">
              {/* <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              /> */}
              <Zoom>
                  <ProfilePhoto user={request.fromUserId} className="w-full h-full object-cover cursor-pointer"/>
              </Zoom>
              
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request.fromUserId._id,request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request.fromUserId._id,request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;