import React from "react";
import {
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { appImages } from "../../configs/appImages";

const CustomSearchBar = (props) => {
  const {
    searchValue = "",
    onSearchClick = () => {
      return;
    },
    onChangeSearch = () => {
      return;
    },
    onFilterClick = () => {
      return;
    },
  } = props;
  React.useEffect(() => {
    Keyboard.dismiss();
  }, []);
  return (
    <View
      style={{
        height: 40,
        width: "100%",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Search"
          value={searchValue}
          onBlur={() => {
            Keyboard.dismiss();
          }}
          style={[
            commonStyles.miniCardShadowEffect,
            {
              flex: 1,
              borderColor: "grey",
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 10,
            },
          ]}
          onFocus={() => {
            onSearchClick();
          }}
          onChangeText={(val) => {
            onChangeSearch(val);
          }}
        />
        <TouchableOpacity
          style={{
            height: 20,
            width: 20,
            position: "absolute",
            right: 20,
            top: "30%",
          }}
          onPress={() => {
            onFilterClick();
          }}
        >
          <Image
            source={appImages.filterLogo}
            style={{
              height: "100%",
              width: "100%",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSearchBar;
