import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Header from "../../components/customComponents/header";
import { appImages } from "../../configs/appImages";
import { Button } from "react-native-elements";
import moment from "moment";
import PlantProgressCard from "../../components/customComponents/plantProgressCard";
import PlantGalleryCard from "../../components/customComponents/plantGalleryCard";

const PlantProgressScreen = ({ navigation }) => {
  const { myPlantDetails } = useSelector((state) => state?.plants);
  const [selectedtag, setSelectedTag] = React.useState("Info");
  const [numColumns, setNumColumns] = React.useState(3);
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
          source={{ uri: myPlantDetails?.plantPicture }}
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
            {myPlantDetails?.plantName}
          </Text>
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            {myPlantDetails?.scientific_name?.length > 0
              ? myPlantDetails?.scientific_name[0]
              : "NA"}
          </Text>
        </View>
      </View>

      <View
        style={{ position: "absolute", marginTop: 50, paddingHorizontal: 20 }}
      >
        <Header title={""} navigation={navigation} arrowColor={"white"} />
      </View>
      <View style={{ flex: 1, top: -5 }}>
        <View
          style={{
            height: 60,
            width: "100%",
            flexDirection: "row",
            backgroundColor: "grey",
          }}
        >
          <Pressable
            onPress={() => {
              setSelectedTag("Info");
            }}
            style={{
              height: "100%",
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: selectedtag === "Info" ? "#7BC75A" : "#56A434",
              borderTopLeftRadius: 20,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              Info
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTag("Journey");
            }}
            style={{
              height: "100%",
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedtag === "Journey" ? "#7BC75A" : "#56A434",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              Journey
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTag("Gallery");
            }}
            style={{
              height: "100%",
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedtag === "Gallery" ? "#7BC75A" : "#56A434",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              Gallery
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTag("Garden");
            }}
            style={{
              height: "100%",
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: selectedtag === "Garden" ? "#7BC75A" : "#56A434",
              borderTopRightRadius: 20,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              Garden
            </Text>
          </Pressable>
        </View>
        <ScrollView>
          {selectedtag === "Info" ? (
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
                  {myPlantDetails?.plantDescription || "NA"}
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Height</Text>
                    </View>

                    <Text>
                      {myPlantDetails?.dimension?.includes("Height:")
                        ? myPlantDetails?.dimension?.split(":")[1]?.trim()
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.sunLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Light</Text>
                    </View>

                    <Text>
                      {myPlantDetails?.sunlight?.length > 0
                        ? myPlantDetails?.sunlight[0]
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Edible</Text>
                    </View>

                    <Text>{myPlantDetails?.edible_leaf ? "Yes" : "No"}</Text>
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.typeLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Type</Text>
                    </View>

                    <Text>{myPlantDetails?.indoor ? "Indoor" : "Outdoor"}</Text>
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.waterLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Water</Text>
                    </View>

                    <Text>{myPlantDetails?.watering || "NA"}</Text>
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
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={appImages.heightLogo}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ alignItems: "center" }}> Maintanece</Text>
                    </View>

                    <Text>{myPlantDetails?.maintenance || "NA"}</Text>
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
                    title={"Edit plant"}
                    // iconPosition="left"
                    // icon={() => {
                    //   return (
                    //     <Image
                    //       source={appImages.whishlistLogo}
                    //       style={{ height: 20, width: 20, right: 5 }}
                    //       resizeMode="contain"
                    //     />
                    //   );
                    // }}
                    buttonStyle={{
                      height: 40,
                      width: 130,
                      backgroundColor: "transparent",
                      paddingHorizontal: 10,
                    }}
                    titleStyle={{ color: "black" }}
                  />
                  <Button
                    title={"Add Progress"}
                    // iconPosition="left"
                    onPress={() => {
                      navigation.navigate("addPlantProgress");
                    }}
                    // icon={() => {
                    //   return (
                    //     <Image
                    //       source={appImages.addCircleLogo}
                    //       style={{ height: 20, width: 20, right: 5 }}
                    //       resizeMode="contain"
                    //     />
                    //   );
                    // }}
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
          ) : selectedtag === "Journey" ? (
            <View
              style={{
                // height: Dimensions.get("window").height,
                width: "100%",
                paddingHorizontal: 20,
              }}
            >
              <FlatList
                data={myPlantDetails?.plantProgress || []}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?.plantDob}
                renderItem={({ item, index }) => (
                  <PlantProgressCard item={item} index={index} />
                )}
              />
            </View>
          ) : selectedtag === "Gallery" ? (
            <View
              style={{
                // height: Dimensions.get("window").height,
                width: "100%",
                paddingHorizontal: 20,
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <FlatList
                key={numColumns.toString()}
                data={myPlantDetails?.plantProgress || []}
                scrollEnabled={false}
                numColumns={numColumns}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?.plantDob}
                renderItem={({ item, index }) => (
                  <PlantGalleryCard item={item} index={index} />
                )}
              />
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PlantProgressScreen;
