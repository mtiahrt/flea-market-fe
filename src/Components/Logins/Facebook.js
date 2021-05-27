import React, {useState, useContext} from 'react';
import FacebookLogin from 'react-facebook-login';
import { LoginContext } from "../../Contexts/LoginContext"

export default function Facebook() {
    const setIsLoggedIn = useContext(LoginContext);
    const [userProfile, setUserProfile] = useState({
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    });
    const responseFacebook = response => {
        setUserProfile({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
        setIsLoggedIn(true);
        console.table(userProfile)
    }
    return (
    <FacebookLogin
        appId="1134164680382570"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} />
    )
}
