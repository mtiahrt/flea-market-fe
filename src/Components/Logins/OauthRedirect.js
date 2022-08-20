import React, {useEffect, useContext} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../Contexts/LoginContext";

function OauthRedirect() {
    const {setUserProfile} = useContext(UserProfileContext);
    const history = useHistory();

    const extractUrlValue = (key, url) => {
        const match = url.match('[?&]' + key + '=([^&#]+)');
        return match ? match[1] : null;
    }

    const obtainUserProfile = provider => {
        if(provider === 'facebook'){
            const code = extractUrlValue('code', window.location.href);
            return axios.get(`https://localhost:8080/userProfile?code=${code}&provider=${provider}`)
        }

        if(provider === 'google'){
            const accessToken = extractUrlValue('access_token', window.location.href)
            return axios.get(`https://localhost:8080/userProfile?code=${accessToken}&provider=${provider}`)
        }
        const twitterToken = extractUrlValue('oauth_token', window.location.href);
        const twitterVerifier = extractUrlValue('oauth_verifier', window.location.href)
        if(twitterToken && twitterVerifier){
            return axios.get(`https://localhost:8080/userProfile?requestToken=${twitterToken}&tokenVerifier=${twitterVerifier}&provider=twitter`)
        }
    }

    useEffect(()=> {
        const provider = extractUrlValue('provider', window.location.href);
        obtainUserProfile(provider).then(({data}) => setUserProfile(data));
        history.push("/");
    },[setUserProfile, history]);
    return (
        <div>
            <h3>Redirecting you to the home page</h3>
        </div>
    )
}

export default OauthRedirect
