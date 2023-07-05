import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import Header from "../../components/customComponents/header";
import { appImages } from "../../configs/appImages";
import { NativeIcon } from "../../icons/NativeIcons";
import { Button } from "react-native-elements";
import { useSelector } from "react-redux";

const PlantDetailsScreen = ({ navigation }) => {
  const { plantDetails } = useSelector((state) => state.plants);
  const [imageUrl, setImageUrl] = React.useState("");
  React.useEffect(() => {
    if (Object.keys(plantDetails)?.length > 0) {
      fetchImage();
    }
  }, [plantDetails]);
  const fetchImage = async () => {
    try {
      const response = await fetch(plantDetails?.default_image?.medium_url);
      const blob = await response.blob();
      const uri = URL.createObjectURL(blob);


      setImageUrl(uri);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View
        style={{
          height: Dimensions.get("screen").height / 3,
          width: "100%",
          backgroundColor: "red",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            height: 40,
            width: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            bottom: 0,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {plantDetails?.common_name}
          </Text>
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {plantDetails?.scientific_name?.length > 0
              ? plantDetails?.scientific_name[0]
              : "NA"}
          </Text>
        </View>
      </View>
      <View
        style={{ position: "absolute", marginTop: 50, paddingHorizontal: 20 }}
      >
        <Header title={""} navigation={navigation} arrowColor={"white"} />
      </View>
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "black",
                lineHeight: 30,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "black",
                textAlign: "left",
                lineHeight: 20,
              }}
            >
              {plantDetails?.description || "NA"}
            </Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Care Details</Text>
            <View
              style={{
                backgroundColor: "white",
                marginTop: 10,
                minHeight: 100,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={appImages.heightLogo}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ alignItems: "center" }}> Height</Text>
                </View>
                <Text>
                  {plantDetails?.dimension?.includes("Height:")
                    ? plantDetails?.dimension?.split(":")[1]?.trim()
                    : "NA"}
                </Text>
              </View>
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={appImages.sunLogo}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ alignItems: "center" }}> Light</Text>
                </View>

                <Text>
                  {plantDetails?.sunlight?.length > 0
                    ? plantDetails?.sunlight[0]
                    : "NA"}
                </Text>
              </View>
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={appImages.heightLogo}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ alignItems: "center" }}> Edible</Text>
                </View>

                <Text>{plantDetails?.edible_leaf ? "Yes" : "No"}</Text>
              </View>
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={appImages.typeLogo}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ alignItems: "center" }}> Type</Text>
                </View>

                <Text>{plantDetails?.indoor ? "Indoor" : "Outdoor"}</Text>
              </View>
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={appImages.waterLogo}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ alignItems: "center" }}> Water</Text>
                </View>

                <Text>{plantDetails?.watering || "NA"}</Text>
              </View>
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={appImages.heightLogo}
                    style={{ height: 20, width: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ alignItems: "center" }}> Maintanece</Text>
                </View>

                <Text>{plantDetails?.maintenance || "NA"}</Text>
              </View>
            </View>
            <View
              style={{
                minHeight: 40,
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Button
                title={"Whishlist"}
                iconPosition="left"
                icon={() => {
                  return (
                    <Image
                      source={appImages.whishlistLogo}
                      style={{ height: 20, width: 20, right: 5 }}
                      resizeMode="contain"
                    />
                  );
                }}
                buttonStyle={{
                  height: 40,
                  width: 130,
                  backgroundColor: "transparent",
                  paddingHorizontal: 10,
                }}
                titleStyle={{ color: "black" }}
              />
              <Button
                title={"My Plants"}
                iconPosition="left"
                onPress={() => {
                  navigation.navigate("addPlantScreen");
                }}
                icon={() => {
                  return (
                    <Image
                      source={appImages.addCircleLogo}
                      style={{ height: 20, width: 20, right: 5 }}
                      resizeMode="contain"
                    />
                  );
                }}
                buttonStyle={{
                  height: 40,
                  width: 130,
                  backgroundColor: "green",
                  borderRadius: 10,
                }}
                titleStyle={{ color: "white" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlantDetailsScreen;
