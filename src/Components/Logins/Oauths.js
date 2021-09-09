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
    const loginToGoogle = () => {
        //get the access token
        new Promise((resolve, reject) => {
            const googleWindowAuth = popUpWindow(`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=987654321&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`, "Google Authorization")
            googleWindowAuth.addEventListener("load", () => {
            	try{
                    debugger;
            		const urlParams = new URLSearchParams(googleWindowAuth.location.href);
                    if(urlParams.has('access_token')){
                        resolve(urlParams.get('access_token'));
                        googleWindowAuth.close();
                    }
            	}catch(ex){
            		reject(`Failed to get a Google access token. Reason: ${ex.message}`);
            	}
            });
        }).then(accessToken => {
            axios.get(`https://localhost:8080/userProfile?code=${accessToken}&provider=google`)
                .then(({data}) => {
                    setUserProfile(data);
                });
        })
    }
    
    const loginToFacebook = () => {
        //get the FB code
        new Promise((resolve, reject) => {
            const facebookWindowAuth = popUpWindow(`https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.REACT_APP_FB_CLIENT_ID}&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F&state=987654321`, "Facebook Authorization")
            facebookWindowAuth.addEventListener("load", () => {
            	try{
            		const urlParams = new URLSearchParams(facebookWindowAuth.location.search);
                    if(urlParams.has('code')){
                        resolve(urlParams.get('code'));
                        facebookWindowAuth.close();
                    }
            	}catch(ex){
            		reject(`Failed to get a Facebook token. Reason: ${ex.message}`);
            	}
            });
        }).then(code => {
            axios.get(`https://localhost:8080/userProfile?code=${code}&provider=facebook`)
                .then(({data}) => {
                    setUserProfile(data);
                });
        })
    }

    const loginToTwitter = () => {
        //go to node endpoint
        axios.post(`https://localhost:8080/twitter/requestToken`).then(({data}) => {
            window.location=`https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}`
    })
    }

    return (
        <div>
            {/* {setUserProfile.isLoggedIn && <button onClick={loginToFacebook}>Login User Facebook</button>} */}
            <button onClick={loginToFacebook}>Login in using Facebook</button><br />
            <img alt='Login with Twitter' onClick={loginToTwitter} src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/auth-docs/sign-in-with-twitter-gray.png.twimg.1920.png" className="b04__img b04__img-cover b04__img--fixed is-aligned-left"/><br></br>
            <button onClick={loginToGoogle}>Login in using Google</button><br />
        </div>
    )
}
