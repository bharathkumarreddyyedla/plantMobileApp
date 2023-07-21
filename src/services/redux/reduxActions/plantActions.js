import { httpService } from "../../ApiService";
import { ReduxPlantConstants } from "../reduxConstants/constants";

export const savePlantDetailedData = (id, userID, token) => {
  const setPlantData = (data) => ({
    type: ReduxPlantConstants.SET_DETAILED_PLANT_DATA,
    payload: data,
  });
  return (dispatch) => {
    httpService
      .get(`plant/getPlantFromPerenualById/${id}/${userID}`, token)
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
        if (res?.data && res?.data?.error === undefined) {
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

export const fetchIndoorPlants = (faqArray, indoor, token) => {
  const setFaqPlantData = (data) => ({
    type: ReduxPlantConstants.SET_FAQPLAT_DATA,
    payload: data,
  });
  return (dispatch) => {
    let url = "";
    if (indoor) {
      url = `plant/indoorPlantFAQ/1/${faqArray[0] || "NA"}/${
        faqArray[1] || "NA"
      }/${faqArray[2] || "NA"}/${1}`;
    } else {
      url = `plant/indoorPlantFAQ/1/${faqArray[0] || "NA"}/${
        faqArray[1] || "NA"
      }/${faqArray[2] || "NA"}/${0}`;
    }
    httpService
      .get(url, token)
      .then((res) => {
        if (res?.data) {
          dispatch(setFaqPlantData(res?.data?.data || []));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const onAddToUserFavourite = (payload, favArray, token) => {
  const setFavourites = (data) => ({
    type: ReduxPlantConstants.SET_FAVOURITE_PLANT,
    payload: data,
  });
  return (dispatch) => {
    httpService
      .post("favourite/saveToFavourite", payload, token)
      .then((res) => {
        if (res?.data?.message) {
          dispatch(setFavourites(favArray));
        }
      });
  };
};
export const getFavourites = (id, token) => {
  const setFavourites = (data) => ({
    type: ReduxPlantConstants.SET_FAVOURITE_PLANT,
    payload: data,
  });
  return (dispatch) => {
    httpService.get(`favourite/getFavouritePlants/${id}`, token).then((res) => {
      if (res?.data) {
        dispatch(setFavourites(res?.data));
      }
    });
  };
};
export const deleteFavouritePlants = (id, payload, token) => {
  const setFavourites = (data) => ({
    type: ReduxPlantConstants.SET_FAVOURITE_PLANT,
    payload: data,
  });
  return (dispatch) => {
    httpService
      .get(`favourite/deleteFavouritePlants/${id}`, token)
      .then((res) => {
        if (res?.data) {
          dispatch(setFavourites(payload));
        }
      });
  };
};
