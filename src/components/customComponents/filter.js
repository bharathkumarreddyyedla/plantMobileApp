import React from "react";
import { Pressable, ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { NativeIcon } from "../../icons/NativeIcons";
import CustomDropdown from "./customDropdown";
import {
  careLevel,
  plantCycleList,
  plantSunExposureList,
  plantWateringList,
  yesOrNO,
} from "../../configs/constants";
import { Button, CheckBox } from "react-native-elements";
import CustomCheckBox from "./customCheckBox";

const Filter = (props) => {
  const {
    onApplyFilter = () => {
      return;
    },
    onPressToggle = () => {
      return;
    },
  } = props;
  const [filterValues, setFilterValues] = React.useState({
    cycle: "",
    watering: "",
    sunlight: "",
    poisonous: 0,
    indoor: 0,
    edible: 0,
  });

  return (
    <View
      style={{
        height: "100%",
        marginTop: 20,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "MB" }}>Filters</Text>
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
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ marginVertical: 5, width: "100%" }}>
            <CustomDropdown
              data={plantCycleList}
              value={filterValues?.cycle}
              onChange={(i) => {
                setFilterValues({
                  ...filterValues,
                  cycle: i?.value,
                });
              }}
              label={"Plant Cycle"}
              placeholder={"Select"}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <CustomDropdown
              data={plantSunExposureList}
              // value={filterValues?.sunlight}
              onChange={(i) => {
                setFilterValues({
                  ...filterValues,
                  sunlight: i?.value,
                });
              }}
              label={"Sun Exposure"}
              placeholder={"Select"}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <CustomDropdown
              data={plantWateringList}
              value={filterValues?.watering}
              onChange={(i) => {
                setFilterValues({
                  ...filterValues,
                  watering: i?.value,
                });
              }}
              label={"Watering"}
              placeholder={"Select"}
            />
          </View>
          <Text style={{ fontSize: 16 }}>Poisonous</Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={
                    filterValues?.poisonous === item?.value ? true : false
                  }
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      poisonous: val === "Yes" ? 1 : 0,
                    });
                  }}
                />
              );
            })}
          </View>
          {console.log("filterValues", filterValues)}
          <Text style={{ fontSize: 16 }}>Indoor </Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={filterValues?.indoor === item?.value ? true : false}
                  label={item?.label}
                  onSelect={(val) => {
                    console.log("val", val);
                    setFilterValues({
                      ...filterValues,
                      indoor: val === "Yes" ? 1 : 0,
                    });
                  }}
                />
              );
            })}
          </View>
          <Text style={{ fontSize: 16 }}>Edible</Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={filterValues?.edible === item?.value ? true : false}
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      edible: val === "Yes" ? 1 : 0,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 40,
          }}
        >
          <Button
            title={"Reset"}
            onPress={() => {
              setFilterValues({
                cycle: "",
                watering: "",
                sunlight: "",
                poisonous: 0,
                indoor: 0,
                edible: 0,
              });
            }}
            titleStyle={{ color: "#4B4848" }}
            buttonStyle={{
              height: 40,
              // width: 100,
              backgroundColor: "transparent",
              alignSelf: "flex-start",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#4B4848",
              paddingHorizontal: 40,
            }}
          />
          <Button
            title={"Apply"}
            onPress={() => {
              onApplyFilter(filterValues);
            }}
            buttonStyle={{
              height: 40,
              // width: 100,
              backgroundColor: "#56A434",
              alignSelf: "flex-end",
              borderRadius: 20,
              paddingHorizontal: 40,
            }}
            containerStyle={{
              paddingHorizontal: 10,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Filter;
