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
    careLevel: "",
    growRate: "",
    maintanence: "",
    indoor: 1,
    edible: 1,
  });

  return (
    <View
      style={{
        height: "100%",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 40,
      }}
    >
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
          <View style={{ marginVertical: 10 }}>
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
          <View style={{ marginVertical: 10 }}>
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
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Care Level</Text>
          <View style={{ flexDirection: "row" }}>
            {careLevel?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={
                    filterValues?.careLevel === item?.label ? true : false
                  }
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      careLevel: val,
                    });
                  }}
                />
              );
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Grow Rate</Text>
          <View style={{ flexDirection: "row" }}>
            {careLevel?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={
                    filterValues?.growRate === item?.label ? true : false
                  }
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      growRate: val,
                    });
                  }}
                />
              );
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Maintanence</Text>
          <View style={{ flexDirection: "row" }}>
            {careLevel?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={
                    filterValues?.maintanence === item?.label ? true : false
                  }
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      maintanence: val,
                    });
                  }}
                />
              );
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Indoor </Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={filterValues?.indoor === item?.label ? true : false}
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      indoor: val,
                    });
                  }}
                />
              );
            })}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Edible</Text>
          <View style={{ flexDirection: "row" }}>
            {yesOrNO?.map((item, index) => {
              return (
                <CustomCheckBox
                  checked={filterValues?.edible === item?.label ? true : false}
                  label={item?.label}
                  onSelect={(val) => {
                    setFilterValues({
                      ...filterValues,
                      edible: val,
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
            justifyContent: "space-between",
            marginvertical: 10,
          }}
        >
          <Button
            title={"Reset"}
            onPress={() => {
              setFilterValues({
                cycle: "",
                watering: "",
                sunlight: "",
                careLevel: "",
                growRate: "",
                maintanence: "",
                indoor: 1,
                edible: 1,
              });
            }}
            buttonStyle={{
              height: 40,
              width: 100,
              backgroundColor: "green",
              alignSelf: "flex-start",
              borderRadius: 4,
            }}
          />
          <Button
            title={"Apply"}
            onPress={() => {
              onApplyFilter(filterValues);
            }}
            buttonStyle={{
              height: 40,
              width: 100,
              backgroundColor: "green",
              alignSelf: "flex-end",
              borderRadius: 4,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Filter;
