import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, FlatList, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Header, Left, Body} from 'native-base'

import LikeBookItem from "./Like/LikeBookItem";

import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";

function Like(props) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(refreshing==true);
    let likePosts = props.feed.filter((post) => {
      if (post.currentUserLike) return post;
    });
    if(likePosts && likePosts.length>0){
      setPosts(likePosts);
    }
  }
  
  const onDislikePress = (postId) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .delete();
    };
  const EmptyListMessage=()=>{
    return(
        <View style={{alignItems:'center'}}>
        <Ionicons name="camera-outline"
              size={100}/>
        <Text style={{fontSize:30}}>게시물 없음</Text>
      </View>
    )
  }
  const renderLikedItem = (item,index) => {
    return (
      <View flexDirection="row">
        <LikeBookItem
          title={item.title}
          lecture={item.lecture}
          price={item.price}
          img={{ uri: item.downloadURL }}
          phoneNumber={item.phoneNumber}
          publisher={item.publisher}
          damage={item.damage}
          id={item.id}
        />
        <View style={styles.button}>
          <Button
            title="disLike"
            onPress={() => {
              setPosts((prevItemState) =>
                prevItemState.filter((_item, _Index) => _Index !== index)
              );
              onDislikePress(item.id);
            }}
          />
        </View>
      </View>
    );
  };
  useEffect(() => {
    if (true) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      //setPosts(likePosts);
    }
  }, [props.feed]);

  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Text style={styles.headertext}>관심 목록</Text>
        </Left>
        <Body></Body>
      </Header>
      <View style={styles.containerList}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => renderLikedItem(item, index)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerList: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    backgroundColor: "white",
  },
  headertext: {
    marginLeft: 10,
    color: "#303D74",
    fontSize: 19,
  },
  button: {
    flex: 0.9,
    alignItems: "flex-end",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});
export default connect(mapStateToProps, null)(Like);
