import React from "react";
import { FlatList, Pressable, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import { commonStyles } from "../../styles/commonStyles";
import { UserContext } from "../../configs/contexts";
import { getMyPlants } from "../../services/redux/reduxActions/plantActions";
import PlantCard from "../customComponents/plantCard";
import { Button } from "react-native-elements";

const MyPlants = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [plants, setPlants] = React.useState([]);
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getMyPlants(user?._id, token).then((res) => {
        if (res) {
          setPlants(res);
        }
      });
    });
  }, []);
  return (
    <View style={{ minHeight: 100, paddingHorizontal: 20, marginVertical: 10 }}>
      <Text
        style={{
          color: "black",
          fontSize: 14,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        My Plants
      </Text>
      {plants?.length > 0 ? (
        <View style={{ flexDirection: "row" }}>
          <ScrollView horizontal={true}>
            {plants?.map((item, index) => {
              return (
                <PlantCard
                  item={item}
                  index={index}
                  marginValue={index !== 0 ? 12 : 0}
                  navigation={navigation}
                  screen={"homeScreen"}
                />
              );
            })}
            <Pressable
              onPress={() => {
                navigation.navigate("searchScreen");
              }}
              style={[
                commonStyles.miniCardShadowEffect,
                {
                  height: 150,
                  width: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FEF9F1",
                  borderRadius: 10,
                  borderWidth: 0.7,
                  marginLeft: 12,
                },
              ]}
            >
              <NativeIcon
                iconName={"plus-circle"}
                iconLib={"Feather"}
                iconColor={"grey"}
                iconSize={40}
              />
            </Pressable>
          </ScrollView>
        </View>
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "black",
              lineHeight: 20,
            }}
          >
            You have no plant
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "black",
              lineHeight: 20,
            }}
          >
            Start growing plants
          </Text>
          <Button
            title={"Start Planting"}
            onPress={() => {
              navigation.navigate("searchScreen");
            }}
            buttonStyle={{
              height: 40,
              backgroundColor: "#56A434",
              borderRadius: 15,
              paddingHorizontal: 45,
              marginVertical: 10,
            }}
            titleStyle={{
              fontSize: 14,
              fontWeight: "700",
              color: "white",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MyPlants;
