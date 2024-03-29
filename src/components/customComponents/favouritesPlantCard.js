import React from "react";
import { UserContext } from "../../configs/contexts";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import { commonStyles } from "../../styles/commonStyles";
import ExpoFastImage from "expo-fast-image";
import { Platform, Text } from "react-native";

const FavouritesPlantCard = ({ item, index }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [imageUrl, setImageUrl] = React.useState("");
  const dispatch = useDispatch();
  const { savePlantDetailedData } = bindActionCreators(plantActions, dispatch);
  React.useEffect(() => {
    fetchImage();
  }, []);
  const fetchImage = async () => {
    try {
      const response = await fetch(item?.plantPicture);
      const blob = await response.blob();
      if (Platform.OS === "ios") {
        const uri = URL.createObjectURL(blob);
        setImageUrl(uri);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          setImageUrl(dataUrl);
        };
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const onClick = () =>
    new Promise((resolve, reject) => {
      try {
        savePlantDetailedData(item?.perenulaPlantId, user?._id, token);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  return (
    <Pressable
      onPress={async () => {
        await onClick().then((res) => {
          if (res) {
            navigation.navigate("plantDetailsScreen");
          }
        });
      }}
      key={index}
      style={{
        height: 150,
        width: 100,
        marginLeft: marginValue,
        marginBottom: 12,
      }}
    >
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
        <ExpoFastImage
          source={{ uri: imageUrl }}
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
        <Text
          numberOfLines={2}
          style={{
            color: "black",
            fontSize: 10,
            fontFamily: "MR",
            textAlign: "center",
          }}
        >
          {item?.plantName}
        </Text>
        <Text style={{ color: "black", fontSize: 8, fontFamily: "MM" }}>
          {item?.cycle || "NA"}
        </Text>
      </View>
    </Pressable>
  );
};

export default FavouritesPlantCard;
