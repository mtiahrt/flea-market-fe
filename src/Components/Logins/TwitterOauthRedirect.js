import React, {useEffect, useContext} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../Contexts/LoginContext";

function TwitterOauthRedirect() {
    const {setUserProfile} = useContext(UserProfileContext);
    const history = useHistory();
    useEffect(()=> {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('oauth_token') && urlParams.has('oauth_verifier')){
            const tokenValues = {
                oauth_token: urlParams.get('oauth_token'), 
                oauth_verifier: urlParams.get('oauth_verifier')
            }
            axios.get(`https://localhost:8080/userProfile?requestToken=${tokenValues.oauth_token}&tokenVerifier=${tokenValues.oauth_verifier}&provider=twitter`)
                .then(({data}) => {
                    setUserProfile(data);
                    history.push("/")
                });
        }
    },[setUserProfile, history]);
    return (
        <div>
            <h3>Redirecting you to the home page</h3>
        </div>
    )
}

export default TwitterOauthRedirect
