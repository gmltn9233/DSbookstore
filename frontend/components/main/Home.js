import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, RefreshControl,} from "react-native";
import {Container, Header, Button, Left, Item, Input} from 'native-base'
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
    const [refreshing,setrefreshing]=useState(false);
    const [nul,setnul]=useState('');
    const handleRefresh=()=>{
      setrefreshing(refreshing==true),
      /*문법상 setrefresing(true)가 맞는것같은데 저렇게 둘 경우 무한으로 빙글빙글돔..*/
      console.log("handleRefresh")
    }
    const componentDidMound=()=>{
      //데이터불러오기
      //setrefreshing(false);
    }
    function toUpperText(text){
      return text.toString().toUpperCase();
    }
    function toLowerText(text){
      return text.toString().toLowerCase();
    }
    useEffect(() => {
      if (
        props.usersAllLoaded == props.userAll.length &&
        props.userAll.length !== 0
      ) {
        props.feed.sort(function (x, y) {
          return x.creation - y.creation;
        });
        if(text!==nul){
        const feedObjArray=props.feed.filter(
          feedObj=>_.includes(_.toLower(feedObj.title),_.toLower(text))
        );
          setPosts(feedObjArray);
          console.log(text);
        }
        else{
          setPosts(props.feed);
          console.log("검색중아님")
        }
        //console.log(posts);
      }
    }, [text]);

    useEffect(() => {
      if (
        props.usersAllLoaded == props.userAll.length &&
        props.userAll.length !== 0
      ) {
        props.feed.sort(function (x, y) {
          return x.creation - y.creation;
        });
        setPosts(props.feed);
        //console.log(posts);
      }
    }, [props.usersAllLoaded, props.feed]);


    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
      <Container>
        <Header searchBar style={styles.header}>
          <Left>
              <Button transparent onPress = {props.navigation.openDrawer}>
                  <Ionicons name="reorder-four-outline" size={30} style={{color:"#303D74"}}/>
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
            refreshControl={<RefreshControl refreshing={refreshing}
                                            onRefresh={handleRefresh}/>}

          />
        </View>
      </Container>
    );
}

const styles = StyleSheet.create({
  containerInfo: {
    margin: 20,
  },
  containerList: {
    marginTop:20,
    flex: 1,
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
    flex:2
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
  userAll: store.userState.userAll,
  feed: store.usersState.feed,
  usersAllLoaded: store.usersState.usersAllLoaded,
});
export default connect(mapStateToProps, null)(Home);
