import React, {useState, createContext} from "react";
import {onAuthStateChanged} from "firebase/auth";

import {
  auth,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then(u => {
        setUser(u);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log("adssddss", e);

        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setIsLoading(false);
      setError("Error: Passwords do not match");
      return;
    }
    registerRequest(email, password)
      .then(u => {
        console.log("rrwrww", u);
        setUser(u);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  onAuthStateChanged(auth, usr => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogout = () => {
    console.log("userss", user);

    logoutRequest().then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
