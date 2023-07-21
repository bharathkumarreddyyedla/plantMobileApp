import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
import { UserContext } from "../../configs/contexts";
import Header from "../../components/customComponents/header";
import PlantCard from "../../components/customComponents/plantCard";
import PopupCard from "../../components/customComponents/PopupCard";

const WhishlistScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const { favouritePlants } = useSelector((state) => state.plants);
  const dispatch = useDispatch();
  const { getFavourites, deleteFavouritePlants } = bindActionCreators(
    plantActions,
    dispatch
  );
  const [selectedItem, setSelectedItem] = React.useState({});
  const [popupData, setPopupData] = React.useState({
    message: "",
    title: "",
    onSubmit: () => {
      return;
    },
    onCancel: () => {
      return;
    },
  });
  const onClosePopup = () => {
    setPopupData({
      ...popupData,
      message: "",
    });
  };
  const onActionPopUp = () => {
    try {
      let favArray = [...(favouritePlants || [])];
      console.log("favArray", favArray);
      const index = favArray?.findIndex(
        (i) => i?.perenulaPlantId === selectedItem?.perenulaPlantId
      );
      console.log("index", index, selectedItem?._id);
      if (index >= 0) {
        favArray.splice(index, 1);
      }
      deleteFavouritePlants(selectedItem?._id, favArray, token);
      setPopupData({
        ...popupData,
        message: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getFavourites(user?._id, token);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      {popupData?.message ? (
        <PopupCard
          title={popupData?.title}
          message={popupData?.message}
          buttons={[
            {
              action: onClosePopup,
              title: "Cancel",
              backgroundColor: "transparent",
              color: "black",
            },
            {
              action: onActionPopUp,
              title: "Remove",
              backgroundColor: "red",
              color: "white",
            },
          ]}
        />
      ) : (
        <View />
      )}
      <View
        style={{
          flex: 1,
          marginTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        {console.log("favouritePlants", favouritePlants)}
        <Header title={"Wishlist"} navigation={navigation} />
        {favouritePlants?.length > 0 ? (
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                // width: "100%",
              }}
            >
              {favouritePlants?.map((item, index) => {
                console.log("item", item);
                return (
                  <PlantCard
                    item={item}
                    index={index}
                    marginValue={index % 2 ? 12 : 0}
                    navigation={navigation}
                    screen={"favouriteScreen"}
                    showFavourite={true}
                    setPopupData={setPopupData}
                    setSelectedItem={setSelectedItem}
                  />
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
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
