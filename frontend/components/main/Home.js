import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, RefreshControl} from "react-native";
import {Container, Header,Left, Button, Item, Input} from 'native-base'
import { Ionicons } from "@expo/vector-icons";

import BookItem from './Home/BookItem';
import _ from 'lodash';
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Home(props) {
  const [text, setText] = useState();
  const [posts, setPosts] = useState([]);
  const [posts1,setPosts1]=useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [nul, setnul] = useState("");

  const EmptyListMessage = () => {
    return (
      <View style={styles.back}>
        <Ionicons name="book-outline"
          size={50} style={{color:'#888', marginLeft:3}}/>
        <Text style={{fontSize:20, color:'#888'}}>데사책방</Text>
      </View>
    );
  };


  const getUsersLikes = (postId) => {
    console.log("getUser start")
    
    firebase.firestore()
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {
            let currentUserLike = false;
            if(snapshot.exists){
                currentUserLike = true;
            }
        })
}

const testFunc = () => {
  return true
}

  const fetchUsersPostsUpdate = () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("selling", "asc")
      .get()
      .then((snapshot) => {
        let newposts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;

          return { id, ...data };
        });


        // for (let i = 0; i < newposts.length; i++) {
        //   console.log("함수 시작")
        //   let userLike=getUsersLikes(newposts[i].id);

        //   newposts[i] = {...newposts[i], userLike};
        //   console.log(newposts[i])
        // }
        setPosts(newposts)
        setPosts1(newposts)
      });
    }


  const handleRefresh = () => {
    setrefreshing(refreshing == true);
    fetchUsersPostsUpdate();
  };

  useEffect(() => {
    if (true) {
      posts.sort((a, b) => {b.selling-a.selling});
      setPosts1(posts);
      if (text !== nul) {
        const feedObjArray = posts.filter(
          (feedObj) =>
            _.includes(_.toLower(feedObj.title), _.toLower(text)) ||
            _.includes(_.toLower(feedObj.lecture), _.toLower(text))
        ).sort((a, b) => {b.selling-a.selling});
        setPosts1(feedObjArray);
      } else {
        setPosts(posts.sort((a, b) => {b.selling-a.selling}));
      }
    }
  }, [text]);

  useEffect(() => {
    if (true) {
      const propsFeed = props.feed
        .sort((a, b) => {b.selling-a.selling})
      setPosts(propsFeed);
      setPosts1(propsFeed);
    }
  }, [props.feed]);

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
          />
        </Item>
      </Header>
      <View style={styles.containerList}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts,posts1}
          renderItem={({ item }) => (
            <BookItem
              uid = {item.userId}
              postId = {item.id}
              bookName = {item.title}
              className = {item.lecture}
              price = {item.price}
              publisher = {item.publisher}
              bookCondition = {item.damage}
              date = {Date(item.creation.seconds*1000)}
              img = {item.downloadURL}
              phone = {item.phoneNumber}
              category = {item.category}
              selling={item.selling}
              currentUserLike={item.currentUserLike}
           />
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
    backgroundColor: 'white'
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
  back: {
    justifyContent:'center', 
    alignItems:'center', 
    height: 550,
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});
export default connect(mapStateToProps, null)(Home);