import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../../utils/firebase/firebase';
import { useContext } from 'react';
import { UserProfileContext } from '../../contexts/UserContext';
import axios from 'axios';
import UserContextModel from '../../models/UserContextModel';

export default function Login() {
  const { setUserProfile } = useContext(UserProfileContext);
  const updateCartContext = (user) => {};
  const updateUserContext = (user, accessToken) => {
    const {
      displayName,
      email,
      photoURL,
      uid: id,
      accessToken: authToken,
    } = user;
    const userContextModel = new UserContextModel(
      accessToken,
      authToken,
      displayName,
      email,
      photoURL,
      id,
      true
    );
    setUserProfile(userContextModel);
  };
  const loginProviderFactory = (provider) => {
    if (provider === 'google') {
      return new GoogleAuthProvider();
    } else if (provider === 'facebook') {
      return new FacebookAuthProvider();
    } else if (provider === 'twitter') {
      return new TwitterAuthProvider();
    }
  };

  const login = async (provider) => {
    const authProvider = loginProviderFactory(provider.currentTarget.value);
    try {
      const userAuth = await signInWithPopup(auth, authProvider);
      axios
        .post(
          `https://localhost:8080/user/generateAccessToken`,
          {},
          {
            headers: {
              'Auth-Token': userAuth.user.accessToken,
            },
          }
        )
        .then((token) => {
          updateUserContext(userAuth.user, token.data);
          updateCartContext(userAuth.user);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledDiv>
      <StyledDivButtons>
        <StyledButton value="google" onClick={login}>
          <FcGoogle style={iconStyle} />
          Sign in with Google
        </StyledButton>
        <StyledButton value="facebook" onClick={login}>
          <AiFillFacebook style={{ ...iconStyle, color: 'blue' }} />
          Sign in with Facebook
        </StyledButton>
        <StyledButton value="twitter" onClick={login}>
          <AiOutlineTwitter style={{ ...iconStyle, color: '#00acee' }} />
          Sign in with Twitter
        </StyledButton>
      </StyledDivButtons>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  color: #4a5568;
  border-radius: 0.5rem;
  margin-top: 32px;
  padding: 10px;
`;

const StyledDivButtons = styled.div`
  display: flex;
  flex-direction: column;
  flex-gap: 4;
`;

const iconStyle = {
  fontSize: '2rem',
};

const StyledButton = styled.button`
  display: flex;
  gap: 1rem;
  vertical-align: middle;
  color: black;
  background-color: rgb(249 250 251);
  padding: 4px;
  width: 100%;
  font-weight: 500;
  border-radius: 0.5rem;
  line-height: 2rem;
  margin-top: 5px;
`;