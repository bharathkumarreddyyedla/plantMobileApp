import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Header from "../../components/customComponents/header";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { notificationAction } from "../../services/redux/reduxActions/exportAllActions";
import { getNotification } from "../../services/redux/reduxActions/notificationAction";
import { UserContext } from "../../configs/contexts";

const NotificationScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  // const dispatch = useDispatch()
  // const {getNotification} = bindActionCreators(notificationAction,dispatch)
  const [notifications, setNotifications] = React.useState([]);
  React.useEffect(() => {
    getNotification(user?._id, token).then((res) => {
      if (res) {
        console.log("Notifications", res);
        setNotifications(res);
      }
    });
  }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: "#FEF9F1", paddingHorizontal: 20 }}
    >
      <View style={{ marginTop: 50 }}>
        <Header title={"Notifications"} navigation={navigation} />
        <ScrollView>
          <View style={{ flex: 1, paddingBottom: 50 }}>
            {notifications?.notifications?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                    minHeight: 40,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: 20,
                    width: "100%",
                  }}
                >
                  <Image
                    source={{ uri: notifications?.profilePicture || undefined }}
                    style={{ height: 40, width: 40, borderRadius: 35 }}
                    // resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "MR",
                      color: "black",
                      paddingLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "MB",
                        color: "black",
                      }}
                    >
                      {notifications?.firstName} {"  "}
                    </Text>
                    {item?.notificationPayload?.body}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NotificationScreen;
