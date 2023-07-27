import React from "react";
import { Text, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { HelperText, useTheme } from "react-native-paper";
import RequiredTag from "./requiredTag";
import { commonStyles } from "../../styles/commonStyles";

const CustomDropdown = (props) => {
  const {
    label = "",
    placeholder = "",
    data = [{ label: "1" }],
    onChange = () => {
      return;
    },
    required = false,
    value = "",
    errorMessage = "",
    multiSelect = false,
    labelField = "label",
    valueField = "label",
    color = "black",
    dropDownStyle = {},
    placeholderStyle = { fontSize: 14, color: "#5A5A5F", fontFamily: "MM" },
    disabled = false,
    background = "white",
  } = props;

  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <View style={{ minHeight: 40, width: "100%" }}>
      {label ? (
        <Text fontSize={12} style={{ marginVertical: 5 }}>
          {label} {required && <RequiredTag />}
        </Text>
      ) : (
        <View />
      )}
      {multiSelect ? (
        <MultiSelect
          style={{
            paddingHorizontal: 10,
            backgroundColor: background,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: isFocus ? "blue" : "grey",
            height: 40,
            width: "100%",
            marginVertical: 5,
          }}
          selectedTextStyle={{
            fontSize: 14,
            fontFamily: "MR",
            color: "#000",
          }}
          inputSearchStyle={{ height: 30, fontSize: 16 }}
          placeholderStyle={placeholderStyle}
          iconStyle={{ width: 20, height: 20 }}
          data={data}
          maxHeight={300}
          placeholder={placeholder}
          labelField={labelField}
          valueField={valueField}
          disable={disabled}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(i) => {
            onChange(i);
          }}
        />
      ) : (
        <Dropdown
          data={data}
          onChange={(i) => {
            onChange(i);
          }}
          value={value}
          disable={disabled}
          placeholder={placeholder}
          placeholderStyle={placeholderStyle}
          maxHeight={300}
          itemTextStyle={{
            fontSize: 14,
            fontFamily: "MR",
            color: color,
            textTransform: "capitalize",
          }}
          confirmSelectItem={true}
          itemContainerStyle={{ backgroundColor: "white" }}
          selectedTextStyle={{
            fontSize: 12,
            fontFamily: "MB",
            color: color,
            textTransform: "capitalize",
          }}
          iconStyle={{ height: 10, width: 40, tintColor: "#3A3939" }}
          iconColor={color}
          style={[
            {
              paddingHorizontal: 10,
              backgroundColor: "white",
              borderWidth: 0.3,
              borderRadius: 15,
              borderColor: "grey",
              height: dropDownStyle?.height || 50,
              width: "100%",
              marginVertical: 5,
            },
          ]}
          labelField={labelField}
          valueField={valueField}
        />
      )}

      {errorMessage === "" ? (
        <View />
      ) : (
        <HelperText
          style={{
            height: "auto",
            width: "100%",
            bottom: 10,
            padding: 0,
            margin: 0,
            fontSize: 10,
          }}
          type="error"
          visible={!!errorMessage}
        >
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

export default CustomDropdown;
