import axios from "axios";
import CONSTANT_LIST from "../../appConfig";

const API_PATH = CONSTANT_LIST.API_ENDPOINT + "/profiles";

export const getProfile = (username) => {
  let url = API_PATH + `/${username}`;
  return axios.get(url);
};

export const followUser = (username) => {
  let url = API_PATH + `/${username}/follow`;
  return axios.post(url);
};

export const unFollowUser = (username) => {
  let url = API_PATH + `/${username}/follow`;
  return axios.delete(url);
};
