import React from "react";
import { Image, Pressable, Text } from "react-native";
import { View } from "react-native";
import { appImages } from "../../configs/appImages";
import { commonStyles } from "../../styles/commonStyles";
import FastImage from "expo-fast-image";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import { UserContext } from "../../configs/contexts";

const PlantCard = ({
  item,
  index,
  marginValue = 0,
  navigation,
  screen = "",
  showFavourite = false,
  setPopupData = () => {
    return;
  },
  setSelectedItem = () => {
    return;
  },
}) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();
  const { savePlantDetailedData, saveMyPlantData } = bindActionCreators(
    plantActions,
    dispatch
  );
  React.useEffect(() => {
    fetchImage();
  }, []);
  const fetchImage = async () => {
    try {
      const response = await fetch(
        screen ? item?.plantPicture : item?.default_image?.medium_url
      );
      console.log("responnn", response);
      const blob = await response.blob();
      console.log("blob", blob);
      // const uri = URL.createObjectURL(blob);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        setImageUrl(dataUrl);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const onClick = () =>
    new Promise((resolve, reject) => {
      try {
        savePlantDetailedData(item?.id, user?._id, token);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  const onSaveMyPlantData = () => {
    saveMyPlantData(item);
    navigation.navigate("plantProgressScreen");
  };
  if (imageUrl) {
    return (
      <Pressable
        onPress={async () => {
          if (screen === "favouriteScreen") {
            setSelectedItem(item);
            setPopupData({
              message: "Are you sure you want to remove plant from favourites?",
              title: "Favourites",
            });
            return;
          } else if (screen === "homeScreen") {
            onSaveMyPlantData();
          } else {
            await onClick().then((res) => {
              if (res) {
                navigation.navigate("plantDetailsScreen");
              }
            });
          }
        }}
        key={index}
        style={{
          height: 190,
          width: 140,
          marginLeft: marginValue,
          marginBottom: 12,
        }}
      >
        {showFavourite && (
          <Image
            source={appImages.filledFavouritesLogo}
            style={{
              height: 20,
              width: 20,
              position: "absolute",
              zIndex: 100,
              top: 10,
              right: 10,
            }}
            resizeMode="contain"
          />
        )}
        <View
          style={[
            commonStyles.miniCardShadowEffect,
            {
              height: "70%",
              width: "100%",
              backgroundColor: "#D9D9D9",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          ]}
        >
          <FastImage
            source={imageUrl ? { uri: imageUrl } : appImages.leafLogo}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            height: "30%",
            width: "100%",
            backgroundColor: "white",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {console.log(
          "item?.favouritePlants[0].plantName",
          screen === "favouriteScreen" ? item : ""
        )} */}
          <Text
            numberOfLines={2}
            style={{
              color: "black",
              fontSize: 14,
              fontFamily: "MB",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {screen ? item?.plantName : item?.common_name}
          </Text>
          <Text style={{ color: "black", fontSize: 12, fontFamily: "ML" }}>
            {item?.cycle}
          </Text>
        </View>
      </Pressable>
    );
  } else {
    return <></>;
  }
};

export default PlantCard;
