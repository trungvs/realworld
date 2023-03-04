import axios from "axios";
import CONSTANT_LIST from "../../appConfig";

const API_PATH = CONSTANT_LIST.API_ENDPOINT + "/users"

export const userLogin = (data) => {
    let url = API_PATH + "/login"
    return axios.post(url, data)
}