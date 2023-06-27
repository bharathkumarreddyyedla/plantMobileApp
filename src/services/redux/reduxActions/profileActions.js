import { httpService } from "../../ApiService";
import { ReduxProfileConstants } from "../reduxConstants/constants";

export const getUserProfile = (id, token) => {
  const saveProfile = (data) => ({
    type: ReduxProfileConstants.SET_PROFILE,
    payload: data,
  });
  return (dispatch) => {
    httpService
      .get(`user/profile/${id}`, token)
      .then((res) => {
        if (res?.data) {
          dispatch(saveProfile(res?.data));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};
export const profileUpdate = (id, payload, token) => {
  console.log("id", id);
  const saveProfile = (data) => ({
    type: ReduxProfileConstants.SET_PROFILE,
    payload: data,
  });
  return (dispatch) => {
    httpService
      .put(`user/profileUpdate/${id}`, payload, token)
      .then((res) => {
        console.log("res",res?.data);
        if (res?.data) {
          dispatch(saveProfile(res?.data));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};
