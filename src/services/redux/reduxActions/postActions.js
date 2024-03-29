import { httpService } from "../../ApiService";
import { ReduxPostConstants } from "../reduxConstants/constants";

export const getAllPost = (id,token) =>
  new Promise((resolve, reject) => {
    try {
      httpService.get(`post/getAllPost/${id}`, token).then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
export const getMyPosts = (id, token) =>
  new Promise((resolve, reject) => {
    try {
      httpService.get(`post/getPostByUser/${id}`, token).then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
export const updatePosts = (payload, token) =>
  new Promise((resolve, reject) => {
    try {
      httpService.put("post/updatePost", payload, token).then((res) => {
        if (res?.data?.message) {
          resolve(res?.data?.message);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
export const getLikedPosts = (id, token) =>
  new Promise((resolve, reject) => {
    try {
      httpService.get(`post/getLikedPostsByUser/${id}`, token).then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

export const setDetailedPost = (payload) => {
  const saveDetailedPost = (data) => ({
    type: ReduxPostConstants.SET_POST_DETAILS,
    payload: data,
  });
  return (dispatch) => {
    dispatch(saveDetailedPost(payload));
  };
};
