import { httpService } from "../../ApiService";
import { ReduxPlantConstants } from "../reduxConstants/constants";

export const savePlantDetailedData = (id, token) => {
  const setPlantData = (data) => ({
    type: ReduxPlantConstants.SET_DETAILED_PLANT_DATA,
    payload: data,
  });
  return (dispatch) => {
    httpService
      .get(`plant/getPlantFromPerenualById/${id}`, token)
      .then((res) => {
        if (res?.data) {
          dispatch(setPlantData(res?.data));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const addMyPlant = (payload, token) =>
  new Promise((resolve, reject) => {
    httpService
      .post("plant/addPlant", payload, token)
      .then((res) => {
        if (res?.data) {
          resolve(res?.data?.message);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
export const setPlantMessage = (message) => {
  return (dispatch) => {
    dispatch({ type: ReduxPlantConstants.SET_MESSAGE, payload: message });
  };
};

export const getMyPlants = (id, token) =>
  new Promise((resolve, reject) => {
    httpService
      .get(`plant/getPlantsByUser/${id}`, token)
      .then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

export const saveMyPlantData = (payload) => {
  const setPlantData = (data) => ({
    type: ReduxPlantConstants.SET_PLAT_DATA,
    payload: data,
  });
  return (dispatch) => {
    dispatch(setPlantData(payload));
  };
};
export const savePlantProgress = (id, payload, token) =>
  new Promise((resolve, reject) => {
    httpService
      .put(`plant/updatePlant/${id}`, payload, token)
      .then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
