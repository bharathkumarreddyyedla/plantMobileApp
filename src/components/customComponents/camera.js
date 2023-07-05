import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-elements";
import { NativeIcon } from "../../icons/NativeIcons";

const CustomCamera = (props) => {
  const { setShowCamera, setCameraBase64 } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const MAX_SIZE_MB = 2;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert MB to bytes

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      console.log("status", status);
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleFlip = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef) {
      const { base64 } = await cameraRef.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      const byteSize = Math.ceil(base64.length * 0.75 - 1); // Convert base64 string length to byte size
      const sizeInMB = byteSize / (1024 * 1024);

      if (byteSize > MAX_SIZE_BYTES) {
        console.log(
          `Picture size (${sizeInMB.toFixed(
            2
          )}MB) exceeds the maximum allowed size of ${MAX_SIZE_MB}MB.`
        );
        Alert.alert(
          `Picture size (${sizeInMB.toFixed(
            2
          )}MB) exceeds the maximum allowed size of ${MAX_SIZE_MB}MB.`
        );
        // Handle the validation error accordingly
      } else {
        setCameraBase64(base64);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        height: Dimensions.get("window").height,
        width: "100%",
        position: "absolute",
        zIndex: 100,
      }}
    >
      <Camera
        style={{ flex: 1 }}
        type={cameraType}
        ref={(ref) => setCameraRef(ref)}
      />
      <Pressable
        onPress={() => {
          handleFlip();
        }}
        style={{
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "white",
          top: 50,
          right: 30,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <NativeIcon
          iconName={"flip-camera-android"}
          iconLib={"MaterialIcons"}
          iconSize={40}
        />
      </Pressable>
      <View
        style={{
          position: "absolute",
          zIndex: 1000,
          width: "100%",
          bottom: 80,
          borderRadius: 10,
          flexDirection: "row",
          height: 40,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            padding: 10,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          onPress={() => {
            takePicture();
          }}
        >
          <Text style={{ fontSize: 18, color: "black" }}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            padding: 10,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          onPress={() => {
            setShowCamera(false);
          }}
        >
          <Text style={{ fontSize: 18, color: "black" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomCamera;
