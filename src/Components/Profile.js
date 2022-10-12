import React from 'react';

const Profile = ({userProfile}) => {
    return (
        <div>
            <h3>User id: {userProfile.uid}</h3>
            <h3>Name: {userProfile.displayName}</h3>
            <h3>Email: {userProfile.email}</h3>
        </div>
    )
}

export default Profile
