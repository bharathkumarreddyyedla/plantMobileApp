import React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import CustomSearchBar from "../../components/customComponents/customSearchBar";
import PlantCard from "../../components/customComponents/plantCard";
import { appImages } from "../../configs/appImages";
import { commonStyles } from "../../styles/commonStyles";
import { Platform } from "react-native";
import Filter from "../../components/customComponents/filter";
import { getAllPlants } from "../../services/redux/reduxActions/homeActions";
import { UserContext } from "../../configs/contexts";

const SearchScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
  const [plantsList, setPlantsList] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(false);
  const [bounceValue, setBounceValue] = React.useState(
    new Animated.Value(-Dimensions.get("window").height)
  );
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
          setPlantsList(res?.data?.slice(0,10));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const onPressToggle = (toggle) => {
    var toValue = Dimensions.get("window").height;
    if (toggle) {
      toValue = 0;
    }
    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={{ flex: 1, marginTop: 50, backgroundColor: "#FEF9F1" }}>
      <CustomSearchBar
        onFilterClick={() => {
          onPressToggle(true);
        }}
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
            Search Results
          </Text>
          <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
            {plantsList.map((item, index) => {
              return (
                <PlantCard
                  item={item}
                  index={index}
                  marginValue={index % 3 !== 0 ? 16 : 0}
                />
              );
            })}
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 10 }}></View>
      </ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          width: "100%",
          transform: [{ translateY: bounceValue }],
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "transparent",
            position: "absolute",
          }}
          onPress={() => {
            onPressToggle(false);
          }}
        />
        <View
          style={[
            Platform.OS === "ios"
              ? commonStyles.boldShadowEffect
              : commonStyles.normalShadowEffect,
            {
              height: "98%",
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "white",
            },
          ]}
        >
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "white",
              elevation: 10,
            }}
          >
            <Filter onPressToggle={onPressToggle} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchScreen;
