import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, LinearProgress } from "react-native-elements";
import { loadingActions } from "../../services/redux/reduxActions/exportAllActions";

import { AuthContext } from "../../configs/contexts";
import { NativeIcon } from "../../icons/nativeIcons";

export const Loader = () => {
  const { colors } = useTheme();
  const { logout } = React.useContext(AuthContext);
  const { loading, error } = useSelector((state) => state?.loader);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { setError } = bindActionCreators(loadingActions, dispatch);

  React.useEffect(() => {
    setVisible(loading?.status);
  }, [loading?.status, error]);
  const emptyError = () => {
    if (error === "Unauthorized") {
      setError("");
      logout();
    } else {
      setError("");
    }
  };

  if (visible && error === "") {
    return (
      <>
        {visible && loading.text === "" ? (
          <LinearProgress
            color="secondary"
            variant="indeterminate"
            style={{
              zIndex: 1000,
              top: Platform.OS === "ios" ? 100 : 65,
              height: 4,
              position: "absolute",
            }}
          />
        ) : (
          <View style={styles.overlay}>
            <ActivityIndicator
              color={colors.linearGradientFirst}
              size={40}
              animating={true}
            />
            {loading?.text ? (
              <View
                style={{
                  minHeight: 40,
                  width: "auto",
                  paddingHorizontal: 10,
                  backgroundColor: "grey",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 1,
                  marginVertical: 10,
                }}
              >
                <Text style={{ fontSize: 14 }}>{loading?.text}</Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        )}
      </>
    );
  } else if (error !== "" && visible === false) {
    return (
      <Pressable
        onPress={() => {
          emptyError();
        }}
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: colors.backdrop,
          zIndex: 1,
        }}
      >
        <Pressable
          onPress={() => {
            return;
          }}
          style={{
            minHeight: 150,
            position: "relative",
            opacity: 1,
            width: "100%",
            backgroundColor: colors.background,
            alignItems: "center",
            borderWidth: 0.3,
            borderRadius: 5,
            zIndex: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              minHeight: 50,
              opacity: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NativeIcon
              iconName="error"
              iconLib="MaterialIcons"
              iconSize={80}
              iconColor={colors.vitalHigh}
              solid={true}
            />
          </View>
          <Text style={{ fontSize: 15, color: colors.vitalHigh }}>
            {"Error"}{" "}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: colors.vitalHigh,
              textAlign: "center",
              paddingHorizontal: 10,
              marginVertical: 20,
            }}
          >
            {typeof error !== "string" ? "Something went wrong" : error}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              title={"ok"}
              onPress={() => {
                emptyError();
              }}
              titleStyle={{ textTransform: "uppercase" }}
              buttonStyle={{
                height: 40,
                width: "auto",
                backgroundColor: colors.iconColor,
                paddingHorizontal: 20,
              }}
            />
          </View>
        </Pressable>
      </Pressable>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    borderRadius: 8,
    zIndex: 4,
    opacity: 1,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "500",
  },
});
