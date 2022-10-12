import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../../utils/firebase/firebase';
import { useContext } from 'react';
import { UserProfileContext } from '../../Contexts/LoginContext';

export default function Login() {
  const { setUserProfile } = useContext(UserProfileContext);
  const keysForStateUpdate = ['displayName', 'photoURL', 'uid', 'email', 'accessToken'];
  const mapMatches = user => {
    const result = Object.entries(user)
      .filter(item => keysForStateUpdate.includes(item[0]))
      .reduce((prev, current) => {
          const curObj = {};
          curObj[current[0]] = current[1];
          return { ...prev, ...curObj, ...{ isLoggedIn: true } };
        },
        {});
    setUserProfile(result);
  }
  //sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      mapMatches(result.user)
    } catch (error) {
      console.error(error);
    }
  };
  //sign in with Facebook
  const fbProvider = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try{
      const result = await signInWithPopup(auth, fbProvider);
      mapMatches(result.user)
    }catch (error){
      console.error(error);
    }

  }


  return (
    <StyledDiv>
      <StyledDivButtons>
        <StyledButton onClick={googleLogin}><FcGoogle style={iconStyle} />Sign in with Google</StyledButton>
        <StyledButton onClick={facebookLogin}><AiFillFacebook style={{ ...iconStyle, color: 'blue' }} />Sign in with Facebook</StyledButton>
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
  fontSize: '2rem'
};

const StyledButton = styled.button`
  display: flex;
  gap: 1rem;
  vertical-align: middle;
  color: black;
  background-color: rgb(249 250 251);;
  padding: 4px;
  width: 100%;
  font-weight: 500;
  border-radius: 0.5rem;
  line-height: 2rem;
  margin-top: 5px;
`;
