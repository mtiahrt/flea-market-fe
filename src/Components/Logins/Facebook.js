import React, {useContext} from 'react';
import FacebookLogin from 'react-facebook-login';
import { LoginContext } from "../../Contexts/LoginContext"

export default function Facebook() {
    const {setUserProfile} = useContext(LoginContext);

    const responseFacebook = response => {
        setUserProfile({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    }
    return (
    <FacebookLogin
        appId="1134164680382570"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} />
    )
}
