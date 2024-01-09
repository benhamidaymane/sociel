import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"; // Assuming AuthReducer is in the same directory

const INITIAL_STATE = {
  user: {
    _id: "65874f8cce9c9d9654b515d2",
    username: "benhamid aymanene",
    email: "benhamid@gail.co",
    profilePicture: "",
    CoverPicture: "",
    followers: [],
    followins: [],
    isAdmin:false,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
