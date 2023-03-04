import {
    IS_LOGIN,
    INFO_USER
} from "../actions"

const user_reducer = (state, action) => {
    switch (action.type) {
        case "IS_LOGIN":
            console.log("is_login")
            return {...state, isLogin: true}
        
        case "INFO_USER": 
            console.log("info_user")
            return {...state, userInfo: action.payload}

        default:
            break;
    }
}

export default user_reducer