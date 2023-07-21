import React from "react";
import { Pressable, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useTheme } from "react-native-paper";
// import { GlobalText } from "../../configs";
import { Text } from "react-native";

const SuccessPopUp = ({
  message,
  title,
  onSubmit,
  onCancel = () => {
    return;
  },
}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onCancel}
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: colors.backdrop,
        zIndex: 10,
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <Pressable
        onPress={() => {
          console.log("OOO");
        }}
        style={{
          position: "relative",
          minHeight: 200,
          width: "100%",
          backgroundColor: colors.background,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            minHeight: 50,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {title === "Info" || title === "warn" || title === "decline" ? (
            <Icon
              name="exclamation-triangle"
              type="font-awesome-5"
              size={40}
              color={colors.alertIcon}
              solid={true}
            />
          ) : title === "error" ? (
            <Icon
              name="error"
              type="MaterialIcons"
              size={40}
              color={colors.vitalHigh}
              solid={true}
            />
          ) : (
            <Icon
              name="check-circle"
              type="font-awesome-5"
              size={40}
              color={colors.vitalNormal}
              solid={true}
            />
          )}
        </View>
        <Text style={{ fontSize: 15, color: "#00A0B4" }}>
          {title === "Info" || title === "decline"
            ? "Info"
            : title === "warn"
            ? "Warning"
            : title === "error"
            ? "error"
            : "Succesfull !"}{" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 10,
            textTransform: "capitalize",
            marginVertical: 20,
          }}
        >
          {message}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: title === "warn" ? "space-around" : "center",
            width: "100%",
          }}
        >
          <Button
            title={
              title === "warn"
                ? "yes"
                : title === "decline"
                ? "Call again"
                : "ok"
            }
            onPress={onSubmit}
            titleStyle={{ textTransform: "uppercase", fontSize: 14 }}
            buttonStyle={{
              height: 40,
              width: "auto",
              backgroundColor: colors.submitBtn,
              paddingHorizontal: 20,
            }}
          />
          {title === "warn" ? (
            <Button
              title={"No"}
              onPress={onCancel}
              titleStyle={{ textTransform: "uppercase", fontSize: 14 }}
              buttonStyle={{
                height: 30,
                width: "auto",
                backgroundColor: colors.lightText,
                paddingHorizontal: 20,
              }}
            />
          ) : (
            <View />
          )}
        </View>
      </Pressable>
    </Pressable>
  );
};

export default SuccessPopUp;
