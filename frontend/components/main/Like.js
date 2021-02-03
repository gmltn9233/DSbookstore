import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import BookDetail from "./BookDetail";
import LikeBookItem from "./Like/LikeBookItem";

import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";

function Like(props) {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const EmptyListMessage=()=>{
    return(

        <View style={{alignItems:'center'}}>
        <Ionicons name="camera-outline"
              size={100}/>
        <Text style={{fontSize:30}}>게시물 없음</Text>
      </View>

    )
  }

  useEffect(() => {
    if (true) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(props.feed);
    }
  }, [props.feed]);

    const onLikePress = (postId) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .set({});
    };
    const onDislikePress = (postId) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .delete();
    };
  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          ListEmptyComponent={EmptyListMessage}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                style={styles.ItemStyle}
                onPress={() => setModalVisible(true)}
              >
                <BookDetail
                  visible={modalVisible}
                  closeModal={() => setModalVisible(false)}
                  bookName={item.title}
                  className={"item.className"}
                  price={item.price}
                  publisher={"this.props.publisher"}
                  bookCondition={"this.props.bookCondition"}
                  img={{ uri: item.downloadURL }}
                  phone={"item.user.phone"}
                  category={item.category}
                />
                <Image
                  style={styles.bookImage}
                  source={{ uri: item.downloadURL }}
                />
                <View style={styles.bookDescribe}>
                  <Text style={styles.bookDescribe2}>{item.title}</Text>
                  <View style={styles.icontext}>
                    <FontAwesome name="book" paddingRight="10" />
                    <Text style={styles.bookDescribe3}>{item.category}</Text>
                  </View>
                  <View style={styles.icontext}>
                    <FontAwesome name="won" paddingRight="10" />
                    <Text style={styles.bookDescribe3}>{item.price}</Text>
                  </View>
                </View>
                <View style={styles.button}>
                  {item.currentUserLike ? (
                    <Button
                      title="Dislike"
                      onPress={() => onDislikePress(item.user.uid, item.id)}
                    />
                  ) : (
                    <Button
                      title="Like"
                      onPress={() => onLikePress(item.user.uid, item.id)}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerList: {
    flex: 1,
    marginTop:20,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  header: {
    backgroundColor: "gray",
  },
  search: {
    marginRight: 10,
    backgroundColor: "#ededed",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    //backgroundColor: '#d6ca1a',
  },
  ItemStyle: {
    // borderBottomColor:'lightgrey',
    // borderBottomWidth:1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 10,
  },
  bookImage: {
    width: 90,
    marginBottom: 5,
    height: 120,
  },
  bookDescribe: {
    paddingLeft: 20,
    flexDirection: "column",
    fontSize: 20,
  },
  bookDescribe2: {
    fontSize: 20,
    marginBottom: 10,
  },
  bookDescribe3: {
    marginLeft: 10,
    fontSize: 15,
    marginBottom: 3,
  },
  button: {
    flex: 0.9,
    alignItems: "flex-end",
  },
  icontext: {
    flexDirection: "row",
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});
export default connect(mapStateToProps, null)(Like);
