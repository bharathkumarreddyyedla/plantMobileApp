import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { UserContext } from "../../configs/contexts";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { plantActions } from "../../services/redux/reduxActions/exportAllActions";
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#56A434",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#56A434",
  stepStrokeUnFinishedColor: "black",
  separatorFinishedColor: "#56A434",
  separatorUnFinishedColor: "#56A434",
  stepIndicatorFinishedColor: "#56A434",
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
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "" } = userState || {};
  const { faqPlantData } = useSelector((state) => state.plants);
  const dispatch = useDispatch();
  const { fetchIndoorPlants } = bindActionCreators(plantActions, dispatch);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showindoorPlantsFAQ, setShowIndoorPlantsFAQ] = React.useState(false);
  const [showOutdoorPlantsFAQ, setShowOutdoorPlantsFAQ] = React.useState(false);
  const [faqValues, setFaqValues] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 0,
    size: 0,
  });
  const [showResultBtn, setShowResultBtn] = React.useState(false);
  const fetchPlants = () => {
    fetchIndoorPlants(faqValues, showindoorPlantsFAQ, token);
    navigation.navigate("myPlantsScreen");
  };
  const renderStepIndicator = ({ position, stepStatus }) => {
    console.log("position", position);
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
      <Pressable
        onPress={() => {
          setCurrentStep(position);
          setPagination({
            ...pagination,
            page: position,
          });
        }}
        style={[styles.step, stepStyle]}
      >
        <View style={styles.stepInner} />
      </Pressable>
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
                        borderColor: "#56A434",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        backgroundColor: "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 14,
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
          {console.log("object", faqValues)}
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
                      let arr = [...(faqValues || [])];
                      arr[pagination?.page] = item?.value;
                      if (cal?.page < cal?.size) {
                        cal.page = cal.page + 1;
                        setCurrentStep(cal.page);
                      } else {
                        setShowResultBtn(true);
                      }
                      setFaqValues(arr);
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
                        borderColor: "#56A434",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        backgroundColor: faqValues?.includes(item?.value)
                          ? "#56A434"
                          : "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: faqValues?.includes(item?.value)
                          ? "white"
                          : "black",
                        lineHeight: 20,
                        textAlign: "center",
                      }}
                    >
                      {item?.label}
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
                      let arr = [...(faqValues || [])];
                      arr[pagination?.page] = item?.value;
                      if (cal?.page < cal?.size) {
                        cal.page = cal.page + 1;
                        setCurrentStep(cal.page);
                      } else {
                        setShowResultBtn(true);
                      }
                      setFaqValues(arr);
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
                        borderColor: "#56A434",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                        backgroundColor: faqValues?.includes(item?.value)
                          ? "#56A434"
                          : "white",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: faqValues?.includes(item?.value)
                          ? "white"
                          : "black",
                        lineHeight: 20,
                        textAlign: "center",
                      }}
                    >
                      {item?.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        </View>
      </View>
      {showResultBtn ? (
        <Button
          title={"Results"}
          onPress={() => {
            fetchPlants();
          }}
          buttonStyle={{
            marginBottom: 20,
            width: "70%",
            alignSelf: "center",
            backgroundColor: "#56A434",
            borderRadius: 15,
          }}
        />
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            title={"Previous"}
            onPress={() => {
              let cal = { ...pagination };
              if (cal?.page <= cal?.size) {
                if (cal?.page > 0) {
                  cal.page = cal.page - 1;
                }
                setCurrentStep(cal.page);
              }
              setPagination(cal);
            }}
            buttonStyle={{
              marginBottom: 20,
              width: "70%",
              alignSelf: "center",
              backgroundColor: "transparent",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "black",
            }}
            titleStyle={{ fontSize: 13, color: "black" }}
          />
          <Button
            title={"Next"}
            onPress={() => {
              let cal = { ...pagination };
              if (cal?.page < cal?.size) {
                cal.page = cal.page + 1;
                setCurrentStep(cal.page);
              }
              setPagination(cal);
            }}
            buttonStyle={{
              marginBottom: 20,
              width: "70%",
              alignSelf: "center",
              backgroundColor: "#56A434",
              borderRadius: 15,
            }}
          />
        </View>
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
    backgroundColor: "#56A434",
  },
  stepFinished: {
    backgroundColor: "#56A434",
  },
  stepUnfinished: {
    backgroundColor: "white",
  },
});

export default QuestionaryScreen;
