import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

const PopupCard = ({
  title = "",
  message = "",
  buttons = [
    {
      action: () => {
        return;
      },
      title: "",
      backgroundColor: "transparent",
      color: "black",
    },
    {
      action: () => {
        return;
      },
      title: "",
      backgroundColor: "green",
      color: "white",
    },
  ],
}) => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 100,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          minHeight: 100,
          width: "100%",
          borderRadius: 10,
          backgroundColor: "white",
          alignItems: "center",
          paddingHorizontal: 30,
          paddingTop: 30,
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "black",
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginVertical: 5,
          }}
        >
          <Button
            title={buttons[0].title}
            onPress={buttons[0].action}
            buttonStyle={{
              height: 40,
              width: 100,
              backgroundColor: buttons[0].backgroundColor,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "black",
            }}
            titleStyle={{
              fontSize: 16,
              fontWeight: "600",
              color: buttons[0].color,
            }}
          />
          <Button
            title={buttons[1].title}
            onPress={buttons[1].action}
            buttonStyle={{
              height: 40,
              width: 100,
              backgroundColor: buttons[1].backgroundColor,
              borderRadius: 20,
            }}
            titleStyle={{
              fontSize: 16,
              fontWeight: "600",
              color: buttons[1].color,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PopupCard;
