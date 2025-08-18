import React from 'react'
import defaultMale from '../images/male_user.jpg';
import defaultFemale from '../images/female1.jpg'
function ProfilePhoto({user}) {
    const{photoUrl, gender} = user || {};
    const profilePhoto = photoUrl? photoUrl:gender?.toLowerCase() === 'male'?defaultMale:gender?.toLowerCase() === 'female'?defaultFemale:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
  return (
   <img 
      src={profilePhoto} 
      alt="profile" 
    
    />
  )
}

export default ProfilePhoto