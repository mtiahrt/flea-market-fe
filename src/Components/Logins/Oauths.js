import axios from 'axios';

export default function Oauths() {
    const loginToGoogle = () => {
        window.location = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=987654321&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Foauth%3Fprovider%3Dgoogle&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
    }
    
    const loginToFacebook = () => {
        window.location=`https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.REACT_APP_FB_CLIENT_ID}&state=987654321&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Foauth%3Fprovider%3Dfacebook`
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