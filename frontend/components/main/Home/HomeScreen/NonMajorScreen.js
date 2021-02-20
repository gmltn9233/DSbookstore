import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList} from "react-native";
import {Container, Header, Button, Left, Body, Right, Text} from 'native-base'
import { Ionicons} from "@expo/vector-icons";

import BookItem from '../BookItem';

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function NonMajorScreen(props) {
    const [posts, setPosts] = useState([]);

    const EmptyListMessage = () => {
      return (
        <View style={styles.back}>
          <Ionicons name="book-outline"
            size={50} style={{color:'#888', marginLeft:3}}/>
          <Text style={{fontSize:20, color:'#888'}}>데사책방</Text>
        </View>
      );}
    
    useEffect(() => {
      if (true) {     
        const feedObjArray = props.feed.filter(
            feedObj => feedObj.category === "비전공"
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
              <Text style={styles.headertext}>비전공</Text>
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
                date = {(new Date(item.creation.seconds*1000)).toString()}
                img = {item.downloadURL}
                phone = {item.phoneNumber}
                category = {item.category}
                selled={item.selling}
                currentUserLike={item.currentUserLike}
               />
            )}
            ListEmptyComponent={EmptyListMessage}
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
    },
    back: {
      justifyContent:'center', 
      alignItems:'center', 
      height: 550,
    },
  });

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  userAll: store.userState.userAll,
  feed: store.usersState.feed,
  usersAllLoaded: store.usersState.usersAllLoaded,
});
export default connect(mapStateToProps, null)(NonMajorScreen);