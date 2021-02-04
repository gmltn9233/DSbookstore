import React, { useState, useEffect } from "react";
import {StyleSheet,View,Text, FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Header, Left, Body} from 'native-base'

import LikeBookItem from "./Like/LikeBookItem";

import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";

function Like(props) {
  const [posts, setPosts] = useState([]);

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
          renderItem={({ item }) => (
            <LikeBookItem
              title={item.title}
              lecture={item.lecture}
              price={item.price}
              img={{ uri: item.downloadURL }}
              phoneNumber={item.phoneNumber}
              publisher={item.publisher}
              damage={item.damage}
            />
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
  containerList: {
    flex: 1,
    marginTop:20,
  },
  header:{
    backgroundColor:'white',
  },
  headertext:{
    marginLeft:10 ,
    color:'#303D74',
    fontSize:19,
}
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});
export default connect(mapStateToProps, null)(Like);
