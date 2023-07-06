import React from "react";
import { FlatList, ScrollView, Text } from "react-native";
import { View } from "react-native";
import { getMyPlants } from "../../services/redux/reduxActions/plantActions";
import { UserContext } from "../../configs/contexts";
import Header from "../../components/customComponents/header";
import PlantCard from "../../components/customComponents/plantCard";
import { useSelector } from "react-redux";

const MyPlantsScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { faqPlantData } = useSelector((state) => state.plants);
  const [plants, setPlants] = React.useState([]);
  // React.useEffect(() => {
  //   getMyPlants(user?._id, token).then((res) => {
  //     if (res) {
  //       setPlants(res);
  //     }
  //   });
  // }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: "#FEF9F1", paddingHorizontal: 20 }}
    >
      <View style={{ marginTop: 50 }}>
        <Header title={"Plants"} navigation={navigation} />
      </View>
      {console.log("faqPlantData", faqPlantData)}
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {faqPlantData?.length > 0 &&
            faqPlantData?.map((item, index) => {
              return (
                <PlantCard
                  item={item}
                  index={index}
                  marginValue={index !== 0 ? 12 : 0}
                  navigation={navigation}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPlantsScreen;
