import axios from "axios";
// import Config from "react-native-config";
import { API_URL } from "@env";

export const apiClientService = axios.create({
  timeout: 50000,
});

export const httpService = {
  get: (url, token) => {
    console.log("API_URL", API_URL);
    return apiClientService.get(`${"http://192.168.0.135:3001/"}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  post: (url, payload, token) => {
    console.log("API_URL", API_URL);
    return apiClientService.post(
      `${"http://192.168.0.135:3001/"}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  put: (url, payload, token) => {
    return apiClientService.put(
      `${"http://192.168.0.135:3001/"}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  delete: (url, token) => {
    return apiClientService.delete(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
