import React, { useContext, createContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // STATES
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState();
  const [updatingToken, setUpdatingToken] = useState(false);
  const [onRouteValet, setonRouteValet] = useState(null);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        appReady,
        setAppReady,
        storedCredentials,
        setStoredCredentials,
        updatingToken,
        setUpdatingToken,
        onRouteValet,
        setonRouteValet,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
