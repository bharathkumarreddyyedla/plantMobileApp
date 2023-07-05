import { httpService } from "../../ApiService";
import * as Location from "expo-location";
import { ReduxHomeConstants } from "../reduxConstants/constants";

export const getAllPlants = (page = 1, token) =>
  new Promise((resolve, reject) => {
    httpService
      .get(`plant/getAllPlantFromPerenual/${page}`, token)
      .then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
export const searchPlants = (page = 1, name = "", token) =>
  new Promise((resolve, reject) => {
    httpService
      .get(`plant/searchPlants/${page}/${name}`, token)
      .then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

export const filterPlants = (
  page = 1,
  cycle = "",
  watering = "",
  sunlight = "",
  token
) =>
  new Promise((resolve, reject) => {
    httpService
      .get(`plant/filterPlants/${page}/${cycle}/${watering}/${sunlight}`, token)
      .then((res) => {
        if (res?.data) {
          resolve(res?.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

export const saveUserLocation = () => {
  const saveLocation = (data) => ({
    type: ReduxHomeConstants.SET_LOCATION,
    payload: data,
  });
  return (dispatch) => {
    Location.requestForegroundPermissionsAsync().then((res) => {
      console.log("status", res);
      if (res?.status === "granted") {
        Location.getCurrentPositionAsync({}).then((res) => {
          console.log("res", res);
          dispatch(saveLocation(res));
        });
      }
    });
  };
};
