import { IS_LOGIN, INFO_USER } from "../actions";

const user_reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOGIN":
      return { ...state, isLogin: action.payload };

    case "INFO_USER":
      return { ...state, userInfo: action.payload };

    default:
      break;
  }
};

export default user_reducer;
