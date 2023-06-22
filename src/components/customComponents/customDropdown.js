import React from "react";
import { Text, View } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { HelperText, useTheme } from "react-native-paper";
import RequiredTag from "./requiredTag";

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
    color = "grey",
    dropDownStyle = {},
    placeholderStyle = { fontSize: 11, color: "grey", fontWeight: "bold" },
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
            fontSize: 12,
            fontWeight: "bold",
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
            fontSize: 10,
            fontWeight: "bold",
            color: color,
            textTransform: "capitalize",
          }}
          confirmSelectItem={true}
          itemContainerStyle={{ backgroundColor: "white" }}
          selectedTextStyle={{
            fontSize: 10,
            fontWeight: "bold",
            color: color,
            textTransform: "capitalize",
          }}
          iconColor={color}
          style={[
            // commonStyles.dropdownShadowEffect,
            {
              paddingHorizontal: 10,
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "grey",
              height: dropDownStyle?.height || 40,
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
