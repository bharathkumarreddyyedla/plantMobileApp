import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Platform, Pressable, View, useColorScheme } from "react-native";
import { Button } from "react-native-elements";
import { useTheme } from "react-native-paper";

const CustomDateTimePicker = (props) => {
  const { colors } = useTheme();
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var max = new Date(year + 100, month, day);
  var min = new Date(year - 100, month, day);
  const {
    showDatimePicker = false,
    mode = "date",
    minuteInterval = 1,
    minimumDate = min,
    maximumDate = max,
    date = d,
    defaultValue = d,
    onChange = () => {
      return;
    },
    onCancel = () => {
      return;
    },
  } = props;
  const dark = useColorScheme();
  if (showDatimePicker && Platform.OS === "ios") {
    return (
      <Pressable
        onPress={() => {
          onCancel();
        }}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 200,
            bottom: 30,
            position: "absolute",
          }}
        >
          <View
            style={{
              height: 40,
              width: "100%",
              backgroundColor: dark === "dark" ? "black" : "white",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Button
              title={"Done"}
              onPress={() => {
                onChange(date, true);
              }}
              buttonStyle={{
                height: 40,
                width: 100,
                backgroundColor: colors.submitBtn,
                alignSelf: "center",
                marginVertical: 10,
              }}
              titleStyle={{
                fontSize: 12,
                fontWeight: "bold",
                color: colors.background,
              }}
            />
          </View>
          {showDatimePicker ? (
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: colors.background,
              }}
            >
              <DateTimePicker
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor:
                    dark === "dark" ? colors.text : colors.background,
                }}
                minimumDate={minimumDate}
                minuteInterval={minuteInterval}
                value={date || defaultValue}
                mode={mode}
                onChange={(event, val) => onChange(val, false)}
                display="spinner"
                maximumDate={maximumDate}
              />
            </View>
          ) : (
            <View />
          )}
          <View
            style={{
              height: 40,
              width: "100%",
              backgroundColor:
                dark === "dark" ? colors.text : colors.background,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          />
        </View>
      </Pressable>
    );
  } else if (showDatimePicker && Platform.OS === "android") {
    return (
      <DateTimePicker
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: dark === "dark" ? colors.text : colors.background,
        }}
        minimumDate={minimumDate}
        minuteInterval={minuteInterval}
        maximumDate={maximumDate}
        value={date || defaultValue}
        mode={mode}
        onChange={(event, val) => onChange(val, false)}
        display="spinner"
      />
    );
  } else {
    return <View />;
  }
};

export default CustomDateTimePicker;
