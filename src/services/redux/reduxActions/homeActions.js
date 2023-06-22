import { httpService } from "../../ApiService";

export const getAllPlants = (page = 1, token) =>
  new Promise((resolve, reject) => {
    httpService
      .get(`plant/getAllPlantFromPerenual/${page}`, token)
      .then((res) => {
        if (res?.data) {
          console.log("res?.status",res?.status);
          resolve(res?.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
