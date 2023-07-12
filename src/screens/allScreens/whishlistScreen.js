import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import { UserContext } from "../../configs/contexts";
import Header from "../../components/customComponents/header";
import PlantCard from "../../components/customComponents/plantCard";

const WhishlistScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { favouritePlants } = useSelector((state) => state.plants);
  const dispatch = useDispatch();
  const { getFavourites } = bindActionCreators(plantActions, dispatch);
  React.useEffect(() => {
    getFavourites(user?._id, token);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View
        style={{
          flex: 1,
          marginTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        {console.log("favouritePlants", favouritePlants)}
        <Header title={"Whishlist"} navigation={navigation} />
        {favouritePlants?.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap:  "wrap",
              width: "100%",
            }}
          >
            <ScrollView horizontal={true}>
              {favouritePlants?.map((item, index) => {
                console.log("item",item);
                return (
                  <PlantCard
                    item={item}
                    index={index}
                    marginValue={index !== 0 ? 12 : 0}
                    navigation={navigation}
                    screen={"favouriteScreen"}
                    showFavourite={true}
                  />
                );
              })}
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
              You have no favourite plant
            </Text>
          </View>
        )}
        {/* <PlantCard showFavourite={true} /> */}
      </View>
    </View>
  );
};

export default WhishlistScreen;
