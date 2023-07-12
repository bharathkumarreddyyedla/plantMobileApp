import React from "react";
import { FlatList, Text } from "react-native";
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
      label: "liked",
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
    if (selectedLabel === "All Posts") {
      obj = {
        _id: val?.posts[0]?._id,
        userId: val?.posts[0]?.userId,
        isLiked: !val?.posts[0]?.liked,
        likedUser: user?._id,
      };
    } else if (selectedLabel === "liked") {
      obj = {
        _id: val?.posts[0]?._id,
        userId: val?.posts[0]?.userId,
        isLiked: !val?.posts[0]?.liked,
        likedUser: user?._id,
      };
    } else {
      obj = {
        _id: val?.post?._id,
        userId: val?.post?.userId,
        isLiked: !val?.post?.liked,
        likedUser: user?._id,
      };
    }

    await updatePosts(obj, token).then((res) => {
      if (res) {
        getAllUserPosts();
      }
    });
  };
  return (
    <View
      style={{ flex: 1, backgroundColor: "#FEF9F1", paddingHorizontal: 20 }}
    >
      <View style={{ marginTop: 50 }}>
        <Header title={"Feed"} navigation={navigation} />
      </View>
      <View style={{ flex: 1 }}>
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
          <FlatList
            data={feeds}
            keyExtractor={(item) => item?._id}
            renderItem={({ item, index }) => (
              <FeedCard
                item={item}
                index={index}
                selectedLabel={selectedLabel}
                onLike={onLike}
              />
            )}
          />
        ) : selectedLabel === "My Posts" ? (
          <FlatList
            data={myFeeds?.posts || []}
            keyExtractor={(item) => item?.post?._id}
            renderItem={({ item, index }) => (
              <FeedCard
                item={item}
                index={index}
                userDetails={myFeeds}
                selectedLabel={selectedLabel}
                onLike={onLike}
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
              />
            )}
          />
        )}
        {/* <FeedCard /> */}
      </View>
    </View>
  );
};

export default CommunityScreen;
