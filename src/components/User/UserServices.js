import axios from "axios";
import CONSTANT_LIST from "../../appConfig";

const API_PATH = CONSTANT_LIST.API_ENDPOINT + "/user";

export const getCurrentUser = () => {
  let configs = {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("jwtToken"))}`,
    },
  };
  return axios.get(API_PATH, configs);
};

export const updateCurrentUser = (data) => {
  return axios.put(API_PATH, data);
};
