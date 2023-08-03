import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import NetInfo from "@react-native-community/netinfo";
// import DeviceInfo from "react-native-device-info";
import { View } from "react-native";
import { loadingActions } from "./redux/reduxActions/exportAllActions";
import { apiClientService } from "./ApiService";
import { AuthContext } from "../configs/contexts";
import { Loader } from "../components/customComponents/loader";
import AuthNavigator from "../navigators/authNavigator";
import SuccessPopUp from "../components/customComponents/successPopUp";
import HomeNavigator from "../navigators/homeNavigator";
import Footer from "../components/customComponents/footer";

const AuthInterceptors = ({ navigation }) => {
  const [count, setCount] = useState(0);
  // const { setRefeshToken, getNewToken, logout } = React.useContext(AuthContext);
  const { apiMessage } = useSelector((state) => state?.loader);
  const dispatch = useDispatch();
  const { setLoading, setError, checkInternetConnection, setApiMessage } =
    bindActionCreators(loadingActions, dispatch);
  const [popupData, setPopupData] = React.useState({
    message: "",
    title: "",
    onSubmit: () => {
      return;
    },
    onCancel: () => {
      return;
    },
  });

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      checkInternetConnection(state);
    });
  }, []);

  React.useEffect(() => {
    apiClientService.interceptors.request.use((req) => {
      console.log("req", req);
      setCount(count + 1);
      setLoading(true);
      return req;
    });

    apiClientService.interceptors.response.use(
      (res) => {
        setCount(count - 1);
        if (count < 1) {
          setLoading(false);
        }
        if (res.status === 200) {
          let msg = res?.data?.error;
          console.log("message", msg);
          setLoading(false);
          if (msg !== "" && msg !== undefined) {
            setApiMessage(msg + " || Info");
          }
          return res;
        } else {
          let msg =
            res?.data?.message || res?.data?.error || "Something went wrong";
          setLoading(false);
          if (msg !== "") {
            setError(
              res?.data?.message || res?.data?.error || "Something went wrong"
            );
            // setError(res.data?.message + ' url:' + res.config.url || res.data?.error + ' url:' + res.config.url || 'Something went wrong' + ' url:' + res.config.url)
          }
          return res;
        }
      },
      async (error) => {
        setLoading(false);
        let msg =
          error.toJSON()?.message + error.toJSON() ||
          error.toJSON()?.error ||
          "Something went wrong";
        console.log("errrrr", error.toJSON()?.status);
        if (error.toJSON()?.status === 500) {
          msg = "Gateway timeout";
        } else if (error.toJSON()?.status === 503) {
          msg = "Unable to process your request";
        } else if (error.toJSON()?.status === 401) {
          // let deviceId = await DeviceInfo.getUniqueId();
          // const newToken = await getNewToken(deviceId);
          // if (newToken?.message === "Invalid Refresh Token") {
          //   logout();
          // } else if (newToken?.refreshToken !== "") {
          //   setRefeshToken(newToken);
          // }

          msg = "";
        } else if (error.toJSON()?.status === 404) {
          msg = "Check request";
        }
        if (msg !== "") {
          // setError(msg)
          setError(msg + " url:" + error.toJSON()?.config?.url?.toString());
        }
      }
    );
  }, []);
  React.useEffect(() => {
    let msg = "";
    if (apiMessage !== "") {
      msg = apiMessage;
    }
    if (msg !== "warn") {
      setPopupData({
        ...popupData,
        message: msg?.includes("||") ? msg?.split("||")[0] : msg,
        title: msg?.includes("||") ? msg?.split("||")[1]?.trim() : "success",
        onSubmit: () => {
          if (msg?.split("||")[1]?.trim() === "warn") {
          } else {
            setApiMessage("");
          }
        },
        onCancel: () => {
          setApiMessage("");
        },
      });
    }
  }, [apiMessage]);

  return (
    <>
      <Loader />
      {popupData?.message !== "" ? (
        <SuccessPopUp
          message={popupData.message}
          title={popupData.title}
          onSubmit={popupData?.onSubmit}
          onCancel={popupData?.onCancel}
        />
      ) : (
        <View />
      )}
      <AuthNavigator />
      {/* <HomeNavigator /> */}
    </>
  );
};

export default AuthInterceptors;
