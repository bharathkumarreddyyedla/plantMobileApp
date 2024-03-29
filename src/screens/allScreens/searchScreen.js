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
import {
  filterPlants,
  getAllPlants,
  getSeasonPlants,
  searchPlants,
} from "../../services/redux/reduxActions/homeActions";
import { UserContext } from "../../configs/contexts";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/customComponents/header";

const SearchScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
  const [plantsList, setPlantsList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [showFilter, setShowFilter] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [bounceValue, setBounceValue] = React.useState(
    new Animated.Value(Dimensions.get("window").height)
  );
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getAllPlantsList();
    });
  }, []);
  const getAllPlantsList = async () => {
    try {
      await getSeasonPlants(1, 1, token)
        .then((res) => {
          setPlantsList(res?.data?.slice(0, 10));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const onSearchPlants = async (val) => {
    try {
      setSearchValue(val);
      if (val?.length > 2) {
        setPlantsList([]);
        setShowSearch(true);
        let arr = [];
        await searchPlants(1, val, token).then((res) => {
          arr = res?.data?.slice(0, 10);
        });
        setPlantsList(arr);
      } else {
        setShowSearch(false);
        getAllPlantsList();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onPressToggle = (toggle) => {
    console.log("toogle", toggle);
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
  const onApplyFilter = async (filterValues) => {
    try {
      console.log("file", filterValues);
      onPressToggle(false);
      setPlantsList([]);
      let arr = [];
      await filterPlants(
        1,
        filterValues?.cycle,
        filterValues?.watering,
        filterValues?.sunlight,
        filterValues?.poisonous,
        filterValues?.indoor,
        filterValues?.edible,
        token
      )
        .then((res) => {
          arr = res?.data?.slice(0, 10);
          setShowSearch(true);
          onPressToggle(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setPlantsList(arr);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View style={{ marginTop: Platform.OS === "ios" ? 50 : 0 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Header title={"Search"} navigation={navigation} />
        </View>

        <ScrollView>
          <CustomSearchBar
            searchValue={searchValue}
            onChangeSearch={onSearchPlants}
            onFilterClick={() => {
              onPressToggle(true);
            }}
          />
          <View
            style={{
              flex: 1,
              paddingBottom: 100,
              marginTop: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "MB", marginBottom: 10 }}>
              {showSearch ? "Search Results" : "Recommended Plants"}
            </Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {plantsList.map((item, index) => {
                return (
                  <PlantCard
                    item={item}
                    index={index}
                    marginValue={16}
                    navigation={navigation}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
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
          // paddingHorizontal: 20,
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
              height: "88%",
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
            <Filter
              onPressToggle={onPressToggle}
              onApplyFilter={onApplyFilter}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchScreen;
