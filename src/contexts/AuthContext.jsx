/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import { setAccessToken, getAccessToken, logout } from '../stores/AccessTokenStore';
import { getCurrentUser } from '../services/UsersService';
import { verifyJWT } from '../utils/jwtHelpers';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticationFetched, setIsAuthenticationFetched] = useState(false);

  const login = (token, navigateCb) => {
    setAccessToken(token)
    getUser(navigateCb)
  }

  const getUser = (cb) => {
    getCurrentUser()
      .then(user => {
        setUser(user);
        setIsAuthenticationFetched(true);

        cb && cb();
      })
      .catch(err => {
        console.log(err);
        setIsAuthenticationFetched(true);
      });
  }

  useEffect(() => {
    // If there is a token, verify it
    // If it's not valid, logout
    // If it's valid, get the user
    if (getAccessToken()) {
      if ( !verifyJWT(getAccessToken()) ) {
        logout();
      } else {
        getUser();
      }
    } else {
      setIsAuthenticationFetched(true)
    }
  }, [])

  const value = {
    user,
    isAuthenticationFetched,
    login,
    getUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;