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
    new Animated.Value(-Dimensions.get("window").height)
  );
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getAllPlantsList();
    });
  }, []);
  const getAllPlantsList = async () => {
    try {
      await getAllPlants(1, token)
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
        token
      )
        .then((res) => {
          arr = res?.data?.slice(0, 10);

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
    <View
      style={{ flex: 1, backgroundColor: "#FEF9F1", paddingHorizontal: 20 }}
    >
      <View style={{ marginTop: 50 }}>
        <Header title={"Search"} navigation={navigation} />

        <CustomSearchBar
          searchValue={searchValue}
          onChangeSearch={onSearchPlants}
          onFilterClick={() => {
            onPressToggle(true);
          }}
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              paddingBottom: 100,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}
            >
              {showSearch ? "Search Results" : "All Plants"}
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

          <View
            style={{ flex: 1, paddingHorizontal: 20, marginTop: 10 }}
          ></View>
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
              <Filter
                onPressToggle={onPressToggle}
                onApplyFilter={onApplyFilter}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default SearchScreen;
