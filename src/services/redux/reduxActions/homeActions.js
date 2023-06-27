import { httpService } from "../../ApiService";


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
