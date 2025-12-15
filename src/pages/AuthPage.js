import { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm.js';
import { verifySessionToken, verifyLogin, registerAccount } from '../api/mock-login-api.js';

const AuthPage = () => {
  const [session, setSession] = useState(null);

  const LOCAL_STORGE_TOKEN_KEY = "sessionToken";
  const LOCAL_STORGE_USERNAME_KEY = "username";

  const verifyAction = () => {
    if (!session) return Promise.reject('has no saved session');
    return verifySessionToken(session.token);
  }

  const clearStorage = () => {
    localStorage.removeItem(LOCAL_STORGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORGE_USERNAME_KEY);
    setSession(null);
  }

  const checkForSessionExpiration = () => {
    verifyAction().catch(() => {
      clearStorage();
    })
  }

  const loadSessionFromLocalStorage = () => {
    const storedToken = localStorage.getItem(LOCAL_STORGE_TOKEN_KEY);
    const username = localStorage.getItem(LOCAL_STORGE_USERNAME_KEY);
    if (storedToken && username) {
      return { token: storedToken, username: username };
    }
    return null;
  }

  const storeSessionIntoLocalStorage = (token, username) => {
    localStorage.setItem(LOCAL_STORGE_TOKEN_KEY, token);
    localStorage.setItem(LOCAL_STORGE_USERNAME_KEY, username);
  }

  useEffect(() => {
    setSession(loadSessionFromLocalStorage());
  }, []);


  const authorize = (username, password) => {
    return verifyLogin(username, password).then( token => {
        storeSessionIntoLocalStorage(token, username);
        setSession(loadSessionFromLocalStorage());
        return true;
      })
  }

  const register = (username, password) => registerAccount(username, password);

  return (
    <>
      {
        session ?
          <>
            <p>Welcome { session.username }</p>
            <button
              onClick={clearStorage}
              style={{ maxWidth: 400, padding: 12, background: '#007bff', color: 'white', border: 'none' }}
            >
              Log out
            </button>
          </>
        :
          <AuthForm key="auth-form" authorize={authorize} register={register} />
      }
    </>
  );
};

export default AuthPage;

