import React from "react";
import { Keyboard, Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../../configs/contexts";
import { Image } from "react-native";
import { appImages } from "../../configs/appImages";
import CustomSearchBar from "../../components/customComponents/customSearchBar";
import MyPlants from "../../components/dashboard/myPlants";
import SeasonPlants from "../../components/dashboard/seasonPlants";
import Footer from "../../components/customComponents/footer";

const HomeScreen = ({ navigation }) => {
  
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
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Welcome back!
        </Text>
      </View>
      <Image
        source={appImages.greeBackground}
        style={{ height: 150, width: "100%" }}
        resizeMode="stretch"
      />
      <View style={{ flex: 1 }}>
        <CustomSearchBar
          onSearchClick={onSearchClick}
          onFilterClick={onSearchClick}
        />
        <MyPlants />
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <SeasonPlants />
        </View>
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Let's find a perfect plant for you
          </Text>
          <Button
            title={"Find me a plant"}
            onPressIn={() => {
              navigation.navigate("questinaryScreen");
            }}
            buttonStyle={{
              height: 40,
              borderRadius: 10,
              backgroundColor: "#56A434",
              marginVertical: 10,
            }}
            titleStyle={{ fontSize: 14 }}
            onPress={() => {}}
          />
        </View>
        
      </View>
    </View>
  );
};

export default HomeScreen;
