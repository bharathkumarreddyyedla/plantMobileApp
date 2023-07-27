import React from "react";
import { FlatList, ScrollView, Text } from "react-native";
import { View } from "react-native";
import {
  getAllPost,
  getLikedPosts,
  getMyPosts,
  updatePosts,
} from "../../services/redux/reduxActions/postActions";
import { UserContext } from "../../configs/contexts";
import Header from "../../components/customComponents/header";
import { Button } from "react-native-elements";
import FeedCard from "../../components/customComponents/feedCard";
import Footer from "../../components/customComponents/footer";
import { appImages } from "../../configs/appImages";

const CommunityScreen = ({ navigation }) => {
  const { userState = {} } = React.useContext(UserContext) || {};
  const { token = "", user = {} } = userState || {};
  const [selectedLabel, setSelectedLabel] = React.useState("All Posts");
  const list = [
    {
      id: 0,
      label: "All Posts",
    },
    {
      id: 2,
      label: "My Posts",
    },
    {
      id: 2,
      label: "Liked",
    },
  ];
  const [feeds, setFeeds] = React.useState([]);
  const [myFeeds, setMyFeeds] = React.useState({});
  React.useEffect(() => {
    if (selectedLabel) {
      getAllUserPosts();
    }
  }, [selectedLabel]);
  const getAllUserPosts = async () => {
    try {
      console.log("token", token);
      if (selectedLabel === "All Posts") {
        await getAllPost(user?._id, token).then((res) => {
          setFeeds(res || []);
        });
      } else if (selectedLabel === "My Posts") {
        getMyPosts(user?._id, token).then((res) => {
          setMyFeeds(res || []);
        });
      } else {
        getLikedPosts(user?._id, token).then((res) => {
          console.log("res?.length", res?.length);
          setMyFeeds(res || []);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onTagClicked = (val) => {
    setSelectedLabel(val);
  };
  const onLike = async (val) => {
    let obj = {};
    console.log("val", val);
    if (selectedLabel === "All Posts") {
      obj = {
        _id: val?.postId,
        userId: val?.userId,
        isLiked: !val?.liked,
        likedUser: user?._id,
      };
    } else if (selectedLabel === "liked") {
      obj = {
        _id: val?.postId,
        userId: val?.userId,
        isLiked: !val?.liked,
        likedUser: user?._id,
      };
    } else {
      obj = {
        _id: val?.postId,
        userId: val?.userId,
        isLiked: !val?.liked,
        likedUser: user?._id,
      };
    }
    console.log("obj", obj);

    await updatePosts(obj, token).then((res) => {
      if (res) {
        getAllUserPosts();
      }
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9F1" }}>
      <View
        style={{
          marginTop: Platform.OS === "ios" ? 50 : 0,
          paddingHorizontal: 20,
        }}
      >
        <Header
          title={"Feed"}
          navigation={navigation}
          logo={appImages.addLogo}
          onLogoClick={() => {
            navigation.navigate("plantsScreen");
          }}
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            height: 40,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {list?.map((item, index) => {
            console.log("item", item);
            return (
              <Button
                key={index}
                title={item?.label}
                onPress={() => {
                  onTagClicked(item?.label);
                }}
                buttonStyle={{
                  height: 30,
                  width: 100,
                  backgroundColor: "transparent",
                  borderRadius: 15,
                  borderWidth: selectedLabel === item?.label ? 1 : 0,
                  borderColor: "green",
                  padding: 0,
                }}
                titleStyle={{
                  fontSize: 13,
                  fontVariant: "500",
                  color: "black",
                }}
              />
            );
          })}
        </View>

        {selectedLabel === "All Posts" ? (
          <ScrollView>
            {feeds?.map((item, index) => {
              return (
                <FeedCard
                  item={item}
                  index={index}
                  selectedLabel={selectedLabel}
                  onLike={onLike}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        ) : selectedLabel === "My Posts" ? (
          <FlatList
            data={myFeeds || []}
            keyExtractor={(item) => item?._id}
            renderItem={({ item, index }) => (
              <FeedCard
                item={item}
                index={index}
                selectedLabel={selectedLabel}
                onLike={onLike}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <FlatList
            data={myFeeds || []}
            keyExtractor={(item) => item?._id}
            renderItem={({ item, index }) => (
              <FeedCard
                item={item}
                index={index}
                selectedLabel={selectedLabel}
                onLike={onLike}
                navigation={navigation}
              />
            )}
          />
        )}
        {/* <FeedCard /> */}
      </View>
      <View style={{ bottom: 0 }}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

export default CommunityScreen;
