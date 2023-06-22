import React from "react";
import { Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import CustomDropdown from "./customDropdown";
import { careLevel, plantCycleList, yesOrNO } from "../../configs/constants";
import { CheckBox } from "react-native-elements";
import CustomCheckBox from "./customCheckBox";

const Filter = (props) => {
  const {
    onPressToggle = () => {
      return;
    },
  } = props;
  return (
    <View style={{ height: "100%", paddingHorizontal: 20, marginTop: 20 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Filters</Text>
          <Pressable
            onPress={() => {
              onPressToggle(false);
            }}
          >
            <NativeIcon
              iconName={"times"}
              iconLib={"FontAwesome5"}
              iconColor={"black"}
              iconSize={20}
            />
          </Pressable>
        </View>
        <View>
          <View style={{ marginVertical: 10 }}>
            <CustomDropdown
              data={plantCycleList}
              label={"Plant Cycle"}
              placeholder={"Select"}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <CustomDropdown
              data={plantCycleList}
              label={"Sun Exposure"}
              placeholder={"Select"}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <CustomDropdown
              data={plantCycleList}
              label={"Watering"}
              placeholder={"Select"}
            />
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Care Level</Text>
          <View style={{ flexDirection: "row" }}>
            {careLevel?.map((item, index) => {
              return <CustomCheckBox label={item?.label} />;
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Grow Rate</Text>
          <View style={{ flexDirection: "row" }}>
            {careLevel?.map((item, index) => {
              return <CustomCheckBox label={item?.label} />;
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Maintanence</Text>
          <View style={{ flexDirection: "row" }}>
            {careLevel?.map((item, index) => {
              return <CustomCheckBox label={item?.label} />;
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Indoor </Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return <CustomCheckBox label={item?.label} />;
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Edible</Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return <CustomCheckBox label={item?.label} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Filter;
