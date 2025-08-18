
import ProfilePhoto from './ProfilePhoto';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try{
      console.log(userId);
      const res = await axios.post(
        BASE_URL+"/request/send/"+status+"/"+userId, {},{withCredentials: true}
      )
      dispatch(removeUserFromFeed(userId));
    }catch(err){}
  }


   //const profilePhoto = photoUrl//? photoUrl:gender?.toLowerCase() === 'male'?defalultMale:gender?.toLowerCase() === 'female'?defaultFemale:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <ProfilePhoto user={user}/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;