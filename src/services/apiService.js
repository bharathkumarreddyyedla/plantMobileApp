import axios from "axios";
// import Config from "react-native-config";
import { API_URL } from "@env";

export const apiClientService = axios.create({
  timeout: 50000,
});

export const httpService = {
  get: (url, token) => {
    return apiClientService.get(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  post: (url, payload, token) => {
    console.log("API_URL", API_URL);
    return apiClientService.post(`${API_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  update: (url, payload, token) => {
    return apiClientService.post(`${API_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: (url, token) => {
    return apiClientService.post(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
