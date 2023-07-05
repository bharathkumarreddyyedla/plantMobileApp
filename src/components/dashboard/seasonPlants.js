import React from "react";
import { FlatList, Text, View } from "react-native";
import PlantCard from "../customComponents/plantCard";
import { appImages } from "../../configs/appImages";
import { getAllPlants } from "../../services/redux/reduxActions/homeActions";
import { UserContext } from "../../configs/contexts";

const SeasonPlants = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
  const [plantsList, setPlantsList] = React.useState([]);
  const list = [
    {
      id: 0,
      name: "Sun Flower",
      species: "sun",
      image: appImages.splashScreenLogo,
    },
    {
      id: 1,
      name: "Lilly",
      species: "lil",
      image: appImages.splashScreenLogo,
    },

    {
      id: 2,
      name: "Lilly1",
      species: "lil1",
      image: appImages.splashScreenLogo,
    },

    {
      id: 3,
      name: "Lilly2",
      species: "lil2",
      image: appImages.splashScreenLogo,
    },
  ];
  React.useEffect(() => {
    getAllPlantsList();
  }, []);
  const getAllPlantsList = async () => {
    try {
      await getAllPlants(1, token)
        .then((res) => {
          console.log("res", res);
          setPlantsList(res?.data?.slice(0, 5));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{}}>
      <Text
        style={{
          color: "black",
          fontSize: 14,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Popular Spring Plants
      </Text>
      <FlatList
        data={plantsList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => (
          <PlantCard
            item={item}
            index={index}
            marginValue={index !== 0 ? 12 : 0}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

export default SeasonPlants;
