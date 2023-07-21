import axios from "axios";
// import Config from "react-native-config";
import { API_URL } from "@env";

export const apiClientService = axios.create({
  timeout: 50000,
});
export const api_Url = "http://192.168.0.135:3001/"; // wifi 192.168.0.135, mobile 192.168.220.17
export const httpService = {
  get: (url, token) => {
    return apiClientService.get(`${api_Url}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  post: (url, payload, token) => {
    return apiClientService.post(`${api_Url}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  put: (url, payload, token) => {
    return apiClientService.put(`${api_Url}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: (url, token) => {
    return apiClientService.delete(`${api_Url}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
