import axios from "axios";
import CONSTANT_LIST from "../../appConfig";

const API_PATH = CONSTANT_LIST.API_ENDPOINT + "/articles";

export const getArticlesGlobal = (params) => {
  let url = API_PATH;
  return axios.get(url, { params: params });
};

export const getArticlesFollow = (params) => {
  let url = API_PATH + "/feed";
  return axios.get(url, params);
};

export const getTags = () => {
  let url = CONSTANT_LIST.API_ENDPOINT + "/tags";
  return axios.get(url);
};

export const favoriteArticle = (slug) => {
  let url = API_PATH + `/${slug}` + "/favorite";
  return axios.post(url);
};

export const unFavoriteArticle = (slug) => {
  let url = API_PATH + `/${slug}` + "/favorite";
  return axios.delete(url);
};

export const createArticle = (value) => {
  return axios.post(API_PATH, value);
};

export const getArticle = (slug) => {
  let url = API_PATH + `/${slug}`;
  return axios.get(url);
};

export const updateArticle = (slug, value) => {
  let url = API_PATH + `/${slug}`;
  return axios.put(url, value);
};

export const deleteArticle = (slug) => {
  let url = API_PATH + `/${slug}`;
  return axios.delete(url);
};

export const getAllComments = (slug) => {
  let url = API_PATH + `/${slug}/comments`;
  return axios.get(url);
};

export const createComment = (slug, value) => {
  let url = API_PATH + `/${slug}/comments`;
  return axios.post(url, value);
};

export const deleteComment = (slug, id) => {
  let url = API_PATH + `/${slug}/comments/${id}`;
  return axios.delete(url);
};
