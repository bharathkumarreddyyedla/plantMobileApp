import React from "react";
import { Keyboard, Pressable, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext, UserContext } from "../../configs/contexts";
import { Image } from "react-native";
import { appImages } from "../../configs/appImages";
import CustomSearchBar from "../../components/customComponents/customSearchBar";
import MyPlants from "../../components/dashboard/myPlants";
import SeasonPlants from "../../components/dashboard/seasonPlants";
import Footer from "../../components/customComponents/footer";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  homeActions,
  profileActions,
} from "../../services/redux/reduxActions/exportAllActions";
import * as Location from "expo-location";
import axios from "axios";
import PopupCard from "../../components/customComponents/PopupCard";

const HomeScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { userLocation } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const { getUserProfile } = bindActionCreators(profileActions, dispatch);
  const { saveUserLocation, saveAddress } = bindActionCreators(
    homeActions,
    dispatch
  );
  const [popupData, setPopupData] = React.useState({
    message: "Are you sure you want to share?",
    title: "Journey will be shared!",
    onSubmit: () => {
      return;
    },
    onCancel: () => {
      return;
    },
  });

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getUserProfile(user?._id, token);
      saveUserLocation();
    });
  }, []);
  const onSearchClick = () => {
    navigation.navigate("searchScreen");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View
        style={{
          height: 60,
          position: "absolute",
          left: 20,
          top: 60,
          zIndex: 1000,
        }}
      >
        <Text style={{ color: "white", fontSize: 10 }}>Hello</Text>
        <Image
          source={appImages.leafLogoWhite}
          style={{
            height: 13,
            width: 20,
            position: "absolute",
            left: 20,
            top: -8,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "MB",
          }}
        >
          Welcome back!
        </Text>
      </View>

      <Image
        source={appImages.greeBackground}
        style={{ height: 150, width: "100%" }}
        resizeMode="stretch"
      />
      <Pressable
        style={{
          position: "absolute",
          right: 40,
          top: 90,
        }}
        onPress={() => {
          navigation.navigate("notificationScreen");
        }}
      >
        <Image
          source={appImages.bellLogo}
          style={{
            height: 25,
            width: 25,
          }}
          resizeMode="contain"
        />
      </Pressable>

      <View style={{ flex: 1 }}>
        <CustomSearchBar
          onSearchClick={onSearchClick}
          onFilterClick={onSearchClick}
        />
        <ScrollView>
          <MyPlants navigation={navigation} />
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <SeasonPlants navigation={navigation} />
          </View>
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Let's find a perfect plant for you
            </Text>
            <Button
              title={"Find me a plant"}
              onPressIn={() => {
                navigation.navigate("questinaryScreen");
              }}
              buttonStyle={{
                height: 40,
                borderRadius: 15,
                backgroundColor: "#56A434",
                marginVertical: 10,
                paddingHorizontal: 45,
              }}
              titleStyle={{ fontSize: 16, fontFamily: "MB", color: "white" }}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ bottom: 0 }}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
