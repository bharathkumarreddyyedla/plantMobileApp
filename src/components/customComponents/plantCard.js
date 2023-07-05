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
}) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
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

        const response = await fetch(screen? item?.plantPicture:item?.default_image?.medium_url);
        const blob = await response.blob();
        const uri = URL.createObjectURL(blob);
        setImageUrl(uri);
      
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const onClick = () =>
    new Promise((resolve, reject) => {
      try {
        savePlantDetailedData(item?.id, token);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  const onSaveMyPlantData = () => {
    saveMyPlantData(item);
    navigation.navigate("plantProgressScreen");
  };
  return (
    <Pressable
      onPress={async () => {
        if (screen) {
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
        <FastImage
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
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {screen ? item?.plantName : item?.common_name}
        </Text>
        <Text style={{ color: "black", fontSize: 8, fontWeight: "300" }}>
          {item?.cycle || "NA"}
        </Text>
      </View>
    </Pressable>
  );
};

export default PlantCard;
