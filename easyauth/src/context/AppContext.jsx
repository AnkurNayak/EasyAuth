/* eslint-disable no-unused-vars */
import { createContext, useReducer } from "react";

const AuthContext = createContext();
const initalState = {
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      throw new Error("Unknown Action at AppContext");
  }
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const loginStatus = localStorage.getItem("LOGINSTATUS");
  if (loginStatus !== null) {
    initalState.user = loginStatus;
    initalState.isAuthenticated = true;
  }

  const [{ user, isAuthenticated }, initialdispatch] = useReducer(
    reducer,
    initalState
  );
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, initialdispatch }}>
      {children}
      {/* {console.log(user)} */}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
