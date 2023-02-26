import axios from "axios";
import CONSTANT_LIST from "../../appConfig";

const API_PATH = CONSTANT_LIST.API_ENDPOINT + "/articles"

export const getArticlesGlobal = (params) => {
    let url = API_PATH
    return axios.get(url, { params: params})
}

export const getArticlesFollow = (params) => {
    let url = API_PATH + "/feed"
    return axios.get(url, params)
}

export const getTags = () => {
    let url = CONSTANT_LIST.API_ENDPOINT + "/tags"
    return axios.get(url)
}