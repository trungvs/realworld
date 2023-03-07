import React, { useContext, useReducer, useEffect } from "react";
import user_reducer from "../reducers/user_reducer";
import { IS_LOGIN, INFO_USER } from "../actions";

const initialState = {
  userInfo: {},
  isLogin: false,
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);

  const handleSetLogin = (value) => {
    if (value?.token) {
      dispatch({
        type: IS_LOGIN,
        payload: true,
      });
      dispatch({
        type: INFO_USER,
        payload: value,
      });
    } else {
      dispatch({
        type: IS_LOGIN,
        payload: false,
      });
      dispatch({
        type: INFO_USER,
        payload: value,
      });
    }
  };

  useEffect(() => {
    if (state.isLogin) {
      localStorage.setItem("jwtToken", JSON.stringify(state.userInfo.token));
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [state.isLogin]);

  return (
    <UserContext.Provider value={{ ...state, handleSetLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
