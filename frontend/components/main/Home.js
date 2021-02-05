import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, RefreshControl,} from "react-native";
import {Container, Header,Left, Button, Item, Input} from 'native-base'
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import BookDetail from "./BookDetail";
import BookItem from './Home/BookItem';
import _ from 'lodash';
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Home(props) {
  const [text, setText] = useState();
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setrefreshing] = useState(false);
  const [nul, setnul] = useState("");

  const EmptyListMessage = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Ionicons name="camera-outline" size={100} />
        <Text style={{ fontSize: 30 }}>게시물 없음</Text>
      </View>
    );
  };

  const fetchUsersPostsUpdate = () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let newposts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setPosts(newposts)
      });
    }

  const handleRefresh = () => {
    setrefreshing(refreshing == true);
    fetchUsersPostsUpdate();
    //setPosts(newposts);
  };
  const componentDidMound = () => {
    //데이터불러오기
    //setrefreshing(false);
  };
  function toUpperText(text) {
    return text.toString().toUpperCase();
  }
  function toLowerText(text) {
    return text.toString().toLowerCase();
  }
  useEffect(() => {
    if (true) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      if (text !== nul) {
        const feedObjArray = props.feed.filter(
          (feedObj) =>
            _.includes(_.toLower(feedObj.title), _.toLower(text)) ||
            _.includes(_.toLower(feedObj.lecture), _.toLower(text))
        );
        setPosts(feedObjArray);
        console.log(text);
      } else {
        setPosts(props.feed);
        console.log("검색중아님");
      }
      //console.log(posts);
    }
  }, [text]);

  useEffect(() => {
    if (true) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(props.feed);
      //console.log(posts);
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
    <Container>
      <Header searchBar style={styles.header}>
        <Left>
          <Button transparent onPress={props.navigation.openDrawer}>
            <Ionicons
              name="reorder-four-outline"
              size={33}
              style={{ color: "#303D74" }}
            />
          </Button>
        </Left>
        <Item style={styles.search}>
          <Ionicons name="search-outline" style={{ marginLeft: 10 }} />
          <Input
            style={{ marginLeft: 3 }}
            placeholder="검색"
            value={text}
            onChangeText={(text) => setText(text)}
            /* onSubmitEditing={} */
          />
        </Item>
      </Header>
      <View style={styles.containerList}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.ItemStyle}>
              <BookDetail
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                bookName={item.title}
                className={item.className}
                price={item.price}
                publisher={item.publisher}
                bookCondition={item.bookCondition}
                img={{ uri: item.downloadURL }}
                phone={item.phoneNumber}
                category={item.category}
              />
              <TouchableOpacity
                style={styles.ItemStyle}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  style={styles.bookImage}
                  source={{ uri: item.downloadURL }}
                />
              </TouchableOpacity>
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
                  <Button light onPress={() => onDislikePress(item.id)}>
                    <Text>Dislike</Text>
                  </Button>
                ) : (
                  <Button light onPress={() => onLikePress(item.id)}>
                    <Text>Like</Text>
                  </Button>
                )}
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerList: {
    marginTop: 20,
    flex: 1,
  },
  ItemStyle: {
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 10,
  },
  header: {
    backgroundColor: "white",
  },
  search: {
    marginRight: 10,
    backgroundColor: "#ededed",
    flex: 2,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    //backgroundColor: '#d6ca1a',
  },
  ItemStyle: {
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
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
    alignItems: "flex-end"
  },
  icontext: {
    flexDirection: "row",
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});
export default connect(mapStateToProps, null)(Home);
