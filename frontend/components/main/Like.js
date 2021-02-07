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
      <View style={styles.back}>
        <Ionicons name="book-outline"
          size={50} style={{color:'#888', marginLeft:3}}/>
        <Text style={{fontSize:20, color:'#888'}}>게시물없음</Text>
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
      let likePosts = props.feed.filter((post) => {
        if (post.currentUserLike) return post;
      });
      if (likePosts && likePosts.length > 0) {
        setPosts(likePosts);
      }
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
          extraData={posts}
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
  back: {
    //backgroundColor:'white', 
    justifyContent:'center', 
    alignItems:'center', 
    height: 550,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});
export default connect(mapStateToProps, null)(Like);
