import React, {useEffect, useContext} from 'react'
import axios from 'axios';
import { UserProfileContext } from "../../Contexts/LoginContext"

function TwitterOauthRedirect() {
    const {setUserProfile} = useContext(UserProfileContext);
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
                });
        }
    },[setUserProfile]);
    return (
        <div>
            <h3>Welcome to the redirection</h3>
        </div>
    )
}

export default TwitterOauthRedirect
