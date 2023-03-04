import React, { useContext, useReducer, useEffect } from "react";
import user_reducer from "../reducers/user_reducer";
import {
    IS_LOGIN,
    INFO_USER
} from "../actions"
import axios from "axios";

const getLocalStorage = () => {
    let cart = localStorage.getItem('jwtToken')
    if (cart) {
      return JSON.parse(localStorage.getItem('jwtToken'))
    } else {
      return null
    }
}

const initialState = {
    userInfo: {},
    isLogin: false
}

const UserContext = React.createContext()

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(user_reducer, initialState)

    const handleSetLogin = (value) => {
        dispatch({
                type: IS_LOGIN,
                payload: true
            })
        dispatch({
            type: INFO_USER,
            payload: value
        })
    }

    useEffect(() => {
        if (state.isLogin) {
            localStorage.setItem('jwtToken', JSON.stringify(state.userInfo.token))
            axios.defaults.headers.common['Authorization'] = state.userInfo.token
        }
    }, [state.isLogin])

    return <UserContext.Provider value={{...state, handleSetLogin}}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext)
}