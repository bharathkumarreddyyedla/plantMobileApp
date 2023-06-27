import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpService } from "./ApiService";
export function createAction(type, payload) {
  return {
    type,
    payload,
  };
}
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...state,
            userToken: action.token,
          };
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload },
          };
        case "SET_REFRESH_TOKEN":
          return {
            ...state,
            refreshToken: action.payload,
          };

        case "SET_SID":
          return {
            ...state,
            sid: { ...action.sid },
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined,
            userToken: null,
            refreshToken: "",
          };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
      userToken: null,
    }
  );
  const auth = React.useMemo(
    () => ({
      login: async (email = "", password = "") => {
        let deviceToken = await AsyncStorage.getItem("firebaseToken");
        await httpService
          .post("auth/login", {
            email: email || "",
            password: password || "",
            deviceToken: deviceToken || "",
          })
          .then(async (res) => {
            if (res?.status === 200) {
              console.log("res?.data ", res?.data);
              if (res?.data && res?.data?.user) {
                const user = {
                  token: res?.data?.token || "",
                  user: res?.data?.user || {},
                };
                await AsyncStorage.setItem("user", JSON.stringify(user));
                dispatch(createAction("SET_USER", user));
                return;
              } else if (res?.data && res?.data.errors) {
                return res?.data.errors;
              }
            }
          })
          .catch((err) => {
            throw new Error(err.errors);
          });
      },
      register: async (
        firstName = "",
        surName = "",
        email = "",
        password = ""
      ) => {
        await httpService
          .post("auth/register", {
            firstName: firstName,
            surName: surName,
            email: email,
            password: password,
          })
          .then(async (res) => {
            if (res?.status === 200) {
              console.log("res?.data ", res?.data);
              if (res?.data && res?.data?.result) {
                const user = {
                  token: res?.data?.token || "",
                };
                await AsyncStorage.setItem("user", JSON.stringify(user));
                dispatch(createAction("SET_USER", user));
                return;
              } else if (res?.data && res?.data.errors) {
                return res?.data.errors;
              }
            }
          })
          .catch((err) => {
            throw new Error(err.errors);
          });
      },
      logout: async () => {
        await AsyncStorage.removeItem("user");
        dispatch(createAction("REMOVE_USER"));
      },
    }),
    []
  );
  React.useEffect(() => {
    sleep(1000).then(() => {
      try {
        AsyncStorage.getItem("user").then((user) => {
          if (user) {
            dispatch(createAction("SET_USER", JSON.parse(user)));
          }
          dispatch(createAction("SET_LOADING", false));
        });
      } catch {}
    });
  }, []);
  return { auth, state };
}
