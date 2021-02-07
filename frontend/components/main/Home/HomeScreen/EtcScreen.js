import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, RefreshControl,} from "react-native";
import {Container, Header, Button, Left, Body, Right, Text} from 'native-base'
import { Ionicons} from "@expo/vector-icons";

import BookItem from '..//BookItem';

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function EtcScreen(props) {
    const [posts, setPosts] = useState([]);
    const [refreshing,setrefreshing]=useState(false);
    
    const handleRefresh=()=>{
      setrefreshing(refreshing==true),
      /*문법상 setrefresing(true)가 맞는것같은데 저렇게 둘 경우 무한으로 빙글빙글돔..*/
      ()=>{componentDidMount};
    }

    useEffect(() => {
      if (true) {
        props.feed.sort(function (x, y) {
          return x.creation - y.creation;
        });
        
        const feedObjArray = props.feed.filter(
            feedObj => feedObj.category === "기타"
        )
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
              <Text style={styles.headertext}>기타</Text>
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
                img = {item.downloadURL}
                phone = {item.phoneNumber}
                category = {item.category}
                selling={item.selling}
                currentUserLike={item.currentUserLike}
               />
            )}
            refreshControl={<RefreshControl refreshing={refreshing}
                                            onRefresh={handleRefresh}/>}

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
export default connect(mapStateToProps, null)(EtcScreen);