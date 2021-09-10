import React, {useContext} from 'react';
import axios from 'axios';
import { UserProfileContext } from "../../Contexts/LoginContext"

export default function Oauths() {
    const {setUserProfile} = useContext(UserProfileContext);
    const popUpWindow = (url, title) => {
        const windowWidth = 500;
        const windowHeight = 500;
        const yPosition = window.top.outerHeight / 2 + window.top.screenY - (windowHeight / 2);
        const xPosition = window.top.outerWidth / 2 + window.top.screenX - (windowWidth / 2);
        const params = `scrollbars=no,resizable=no,status=no,location=yes,toolbar=no,menubar=no,width=${windowWidth}, height=${windowHeight}, top=${yPosition}, left=${xPosition}`
        return window.open(url,title, params);
    }

    const extractUrlValue = (key, url) => {
        const match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    }

    const addPopUpWindowListener = (urlParameterName, url, providerName) => {
        return new Promise((resolve, reject) => {
            const authWindowPopUp = popUpWindow(url, `${providerName} Authorization`)
            authWindowPopUp.addEventListener("load", () => {
            	try{
                    const urlParamValue = extractUrlValue(urlParameterName, authWindowPopUp.location.href)
                    if(urlParamValue){
                        resolve(urlParamValue);
                        authWindowPopUp.close();
                    }else{
                        throw new Error(`The Url parameter ${urlParameterName} was not found`);
                    }
            	}catch(ex){
            		reject(`Failed to get a ${providerName} access token. Reason: ${ex.message}`);
            	}
            });
        })
    }

    const loginToGoogle = () => {
        addPopUpWindowListener('access_token', 
            `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=987654321&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`, 'Google')
            .then(accessToken => {
                axios.get(`https://localhost:8080/userProfile?code=${accessToken}&provider=google`)
                    .then(({data}) => {
                        setUserProfile(data);
                    });
            })
    }
    
    const loginToFacebook = () => {
        addPopUpWindowListener('code', `https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.REACT_APP_FB_CLIENT_ID}&state=987654321&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F`, 'Facebook')
        .then(code => {
            axios.get(`https://localhost:8080/userProfile?code=${code}&provider=facebook`)
                .then(({data}) => {
                    setUserProfile(data);
                });
        })
    }

    const loginToTwitter = () => {
        //go to BE node endpoint to get the twitter code.  A different redirect is  
        //setup for twitter because the popup window didnt work for this provider 
        axios.post(`https://localhost:8080/twitter/requestToken`).then(({data}) => {
            window.location=`https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}`
        })
    }

    return (
        <div>
            <button onClick={loginToFacebook}>Login in using Facebook</button><br />
            <img alt='Login with Twitter' onClick={loginToTwitter} src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/auth-docs/sign-in-with-twitter-gray.png.twimg.1920.png" className="b04__img b04__img-cover b04__img--fixed is-aligned-left"/><br></br>
            <button onClick={loginToGoogle}>Login in using Google</button><br />
        </div>
    )
}