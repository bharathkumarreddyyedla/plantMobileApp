import { httpService } from "../../ApiService";
import * as Location from "expo-location";
import { ReduxHomeConstants } from "../reduxConstants/constants";
import axios from "axios";

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
export const getSeasonPlants = (page = 1, indoor = 1, token) =>
  new Promise((resolve, reject) => {
    httpService
      .get(`plant/getSeasonPlantFromPerenual/${page}/${indoor}`, token)
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
  cycle = "NA",
  watering = "NA",
  sunlight = "NA",
  poisonous = null,
  indoor = null,
  edible = null,
  token
) =>
  new Promise((resolve, reject) => {
    console.log("cycle", cycle, watering, sunlight);
    httpService
      .get(
        `plant/filterPlants/${page}/${cycle || "NA"}/${watering || "NA"}/${
          sunlight || "NA"
        }/${poisonous}/${indoor}/${edible}`,
        token
      )
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
  const saveAddLocation = (data) => ({
    type: ReduxHomeConstants.SET_ADDRESS,
    payload: data,
  });
  return (dispatch) => {
    Location.requestForegroundPermissionsAsync().then((res) => {
      console.log("status", res);
      if (res?.status === "granted") {
        Location.getCurrentPositionAsync({}).then((res) => {
          console.log("res", res);
          const API_KEY = "";
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${res?.coords?.latitude},${res?.coords?.longitude}&key=${API_KEY}`;
          axios.get(url).then((response) => {
            console.log("response add", response);
            const resAdd = response?.data?.results[0]?.formatted_address;
            console.log("Address:", resAdd);
            dispatch(saveLocation(res));
            dispatch(saveAddLocation(resAdd));
          });
        });
      }
    });
  };
};
