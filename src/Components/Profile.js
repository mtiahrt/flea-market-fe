import React, {useContext} from 'react';
import { LoginContext } from "../Contexts/LoginContext";

const Profile = () => {
    const {userProfile} = useContext(LoginContext);
    return (
        <div>
            <h3>User id: {userProfile.userID}</h3>
            <h3>Name: {userProfile.name}</h3>
            <h3>Email: {userProfile.email}</h3>
        </div>
    )
}

export default Profile
