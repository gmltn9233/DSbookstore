import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList} from "react-native";
import {Container, Header, Button, Left, Body, Right, Text} from 'native-base'
import { Ionicons} from "@expo/vector-icons";

import BookItem from '..//BookItem';

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function MajorScreen(props) {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      if (true) {
        const feedObjArray = props.feed.filter(
            feedObj => feedObj.category === "전공"
        ).sort((a, b) => {b.selling-a.selling})
        setPosts(feedObjArray);
      }
    }, [props.usersAllLoaded, props.feed]);

    return (
      <Container>
        <Header searchBar style={styles.header}>
            <Left>
                <Button transparent onPress={props.navigation.openDrawer}>
                    <Ionicons name = "reorder-four-outline" 
                        size = {30}
                        style = {{color:"#303D74"}}/>
                </Button>
            </Left>
            <Body>
              <Text style={styles.headertext}>전공</Text>
            </Body>
            
            <Right/>
        </Header>
        <View style={styles.containerList}>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={posts}
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
          />
        </View>
      </Container>
    );
}

const styles = StyleSheet.create({
  containerList: {
    marginTop:20,
    flex: 1,
  },
  header: {
    backgroundColor: "white",
  },
  headertext:{
    color:'#303D74',
    fontSize:19,
  }
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  userAll: store.userState.userAll,
  feed: store.usersState.feed,
  usersAllLoaded: store.usersState.usersAllLoaded,
});
export default connect(mapStateToProps, null)(MajorScreen);