import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookSquare, faGithub, faGoogle, faGoogleDrive, faSquareFacebook, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

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
        <div className="login-group">
            <button className="login login-facebook" onClick={loginToFacebook}><FontAwesomeIcon size="2x" icon={faFacebookSquare} /><span>Login using Facebook</span></button><br />
            <button className="login login-twitter" onClick={loginToTwitter}><FontAwesomeIcon size="2x" icon={faTwitterSquare} /><span>Login using Twitter</span></button><br />
            <button className="login login-google" onClick={loginToGoogle}><FontAwesomeIcon size="2x" className='fa-google-color-new' icon={faGoogle} /><span>Login using Google</span></button><br />
        </div>
    )
}