import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';

export default function Facebook() {
    const [userInfo, setUserInfo] = useState({
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    });
    const responseFacebook = response => {
        setUserInfo({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
        console.log('user info object is ');
        console.table(userInfo)
    }
    return (
    <FacebookLogin
        appId="1134164680382570"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} />
    )
}
