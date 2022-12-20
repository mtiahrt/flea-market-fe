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
import { UserProfileContext } from '../../Contexts/LoginContext';
import axios from 'axios';

export default function Login() {
  const { setUserProfile } = useContext(UserProfileContext);
  const keysForStateUpdate = [
    'displayName',
    'photoURL',
    'uid',
    'email',
    'accessToken',
  ];

  const mapMatches = (user) => {
    const result = Object.entries(user)
      .filter((item) => keysForStateUpdate.includes(item[0]))
      .reduce((prev, current) => {
        const curObj = {};
        curObj[current[0]] = current[1];
        return { ...prev, ...curObj, ...{ isLoggedIn: true } };
      }, {});
    setUserProfile(result);
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
      const result = await signInWithPopup(auth, authProvider);
      axios
        .post(
          process.env[
            `REACT_APP_${process.env.NODE_ENV}_BACKEND_SERVER_URI/user/generateAccessToken`
          ],
          {},
          {
            headers: {
              'Auth-Token': result.user.accessToken,
            },
          }
        ) //testing that the validation end point is working...
        .then((response) =>
          axios
            .get(
              process.env[
                `REACT_APP_${process.env.NODE_ENV}_BACKEND_SERVER_URI/user/validateAccessToken`
              ],
              {
                headers: {
                  gfg_token_header_key: response.data,
                },
              }
            )
            .then((data) => console.log(data))
        );
      mapMatches(result.user);
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
