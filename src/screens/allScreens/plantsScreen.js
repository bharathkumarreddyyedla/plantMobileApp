import React from "react";
import { Platform, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { UserContext } from "../../configs/contexts";
import { getMyPlants } from "../../services/redux/reduxActions/plantActions";
import PlantCard from "../../components/customComponents/plantCard";
import Header from "../../components/customComponents/header";

const PlantsScreen = ({ navigation, route }) => {
  const { screen = "" } = route?.params || {};
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
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View
        style={{
          marginTop: Platform.OS === "ios" ? 50 : 0,
          paddingHorizontal: 20,
        }}
      >
        <Header
          title={"My Plants"}
          navigation={navigation}
          onGoback={() => {
            if (screen === "addPlant") {
              navigation.navigate("homeScreen");
            } else {
              navigation.goBack();
            }
          }}
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20, marginVertical: 10 }}>
        <Text
          style={{
            color: "black",
            fontSize: 12,
            fontFamily: "MR",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Select the plant for which you want to add progress.
        </Text>
        {plants?.length > 0 && (
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                //   height: "100%",
              }}
            >
              {plants?.map((item, index) => {
                return (
                  <PlantCard
                    item={item}
                    index={index}
                    marginValue={12}
                    navigation={navigation}
                    screen={"homeScreen"}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default PlantsScreen;
