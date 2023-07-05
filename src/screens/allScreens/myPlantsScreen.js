import React from "react";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { getMyPlants } from "../../services/redux/reduxActions/plantActions";
import { UserContext } from "../../configs/contexts";
import Header from "../../components/customComponents/header";
import PlantCard from "../../components/customComponents/plantCard";

const MyPlantsScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [plants, setPlants] = React.useState([]);
  React.useEffect(() => {
    getMyPlants(user?._id, token).then((res) => {
      if (res) {
        setPlants(res);
      }
    });
  }, []);
  return (
    <View
      style={{ flex: 1, backgroundColor: "#FEF9F1", paddingHorizontal: 20 }}
    >
      <View style={{ marginTop: 50 }}>
        <Header title={"My Plants"} navigation={navigation} />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={plants}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item?.id}
          renderItem={({ item, index }) => {
            return (
              <PlantCard
                item={item}
                index={index}
                marginValue={index !== 0 ? 12 : 0}
                navigation={navigation}
                screen={"myPlantsScreen"}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default MyPlantsScreen;
