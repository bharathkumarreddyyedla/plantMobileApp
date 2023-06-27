import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  indoorPlantFAQ,
  outdoorPlantFAQ,
  plantFAQ,
  indoorPlantFAQlabels,
  outdoorPlantFAQlabels,
} from "../../configs/constants";
import { commonStyles } from "../../styles/commonStyles";
import StepIndicator from "react-native-step-indicator";
import { Button } from "react-native-elements";
import Header from "../../components/customComponents/header";
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "green",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "green",
  stepStrokeUnFinishedColor: "black",
  separatorFinishedColor: "green",
  separatorUnFinishedColor: "green",
  stepIndicatorFinishedColor: "green",
  stepIndicatorUnFinishedColor: "white",
  stepIndicatorCurrentColor: "white",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 16,
  stepIndicatorLabelCurrentColor: "black",
  stepIndicatorLabelFinishedColor: "black",
  stepIndicatorLabelUnFinishedColor: "black",
  labelColor: "black",
  labelSize: 12,
  currentStepLabelColor: "black",
};

const QuestionaryScreen = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = React.useState(1);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showindoorPlantsFAQ, setShowIndoorPlantsFAQ] = React.useState(false);
  const [showOutdoorPlantsFAQ, setShowOutdoorPlantsFAQ] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    page: 0,
    size: 0,
  });
  const [showResultBtn, setShowResultBtn] = React.useState(false);
  const renderStepIndicator = ({ position, stepStatus }) => {
    let stepStyle;
    switch (stepStatus) {
      case "current":
        stepStyle = styles.stepCurrent;
        break;
      case "finished":
        stepStyle = styles.stepFinished;
        break;
      case "unfinished":
        stepStyle = styles.stepUnfinished;
        break;
      default:
        stepStyle = styles.stepUnfinished;
    }
    return (
      <View style={[styles.step, stepStyle]}>
        <View style={styles.stepInner} />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View
        style={{
          flex: 1,
          marginTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <Header title={"Get Recommendation"} navigation={navigation} />
        {showindoorPlantsFAQ || showOutdoorPlantsFAQ ? (
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentStep}
            stepCount={
              showindoorPlantsFAQ
                ? indoorPlantFAQ?.length
                : outdoorPlantFAQ?.length
            }
            labels={
              showindoorPlantsFAQ ? indoorPlantFAQlabels : outdoorPlantFAQlabels
            }
            renderStepIndicator={renderStepIndicator}
          />
        ) : (
          <View />
        )}
        <View
          style={{
            minHeight: 100,
            width: "100%",
            alignItems: "center",
          }}
        >
          {!showindoorPlantsFAQ && !showOutdoorPlantsFAQ ? (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  marginVertical: 20,
                }}
              >
                {plantFAQ[0]?.question}
              </Text>
              {plantFAQ[0]?.options?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (item === "Indoor Plant") {
                        setShowIndoorPlantsFAQ(true);
                        setShowOutdoorPlantsFAQ(false);
                        setPagination({
                          page: 0,
                          size: indoorPlantFAQ?.length - 1,
                        });
                      } else {
                        setShowIndoorPlantsFAQ(false);
                        setShowOutdoorPlantsFAQ(true);
                        setPagination({
                          page: 0,
                          size: outdoorPlantFAQ?.length - 1,
                        });
                      }
                    }}
                    key={index}
                    style={[
                      commonStyles.miniCardShadowEffect,
                      {
                        height: 50,
                        width: "80%",
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "green",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        backgroundColor: "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                        lineHeight: 20,
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            <View />
          )}
          {showindoorPlantsFAQ && (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  marginVertical: 20,
                }}
              >
                {indoorPlantFAQ[pagination?.page]?.question}
              </Text>
              {indoorPlantFAQ[pagination?.page].options?.map((item, ind) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let cal = { ...pagination };
                      if (cal?.page < cal?.size) {
                        cal.page = cal.page + 1;
                        setCurrentStep(cal.page);
                      } else {
                        setShowResultBtn(true);
                      }
                      setPagination(cal);
                    }}
                    key={ind}
                    style={[
                      commonStyles.miniCardShadowEffect,
                      {
                        height: 50,
                        width: "80%",
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "green",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        backgroundColor: "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                        lineHeight: 20,
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
          {showOutdoorPlantsFAQ && (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                  marginVertical: 20,
                }}
              >
                {outdoorPlantFAQ[pagination?.page]?.question}
              </Text>
              {outdoorPlantFAQ[pagination?.page].options?.map((item, ind) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let cal = { ...pagination };
                      if (cal?.page < cal?.size) {
                        cal.page = cal.page + 1;
                        setCurrentStep(cal.page);
                      }
                      setPagination(cal);
                    }}
                    key={ind}
                    style={[
                      commonStyles.miniCardShadowEffect,
                      {
                        height: 50,
                        width: "80%",
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "green",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        backgroundColor: "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "black",
                        lineHeight: 20,
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        </View>
      </View>
      {showResultBtn && (
        <Button
          title={"Results"}
          buttonStyle={{
            marginBottom: 20,
            width: "70%",
            alignSelf: "center",
            backgroundColor: "green",
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  step: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  stepInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  stepCurrent: {
    backgroundColor: "green",
  },
  stepFinished: {
    backgroundColor: "green",
  },
  stepUnfinished: {
    backgroundColor: "white",
  },
});

export default QuestionaryScreen;
