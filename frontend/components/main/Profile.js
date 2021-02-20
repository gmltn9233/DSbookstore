import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Linking,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyBookItem from "./Profile/MyBookItem";
import {Header, Left, Body} from 'native-base'
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'


function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const propsFeed = props.feed.filter(
        (x) => x.userId === firebase.auth().currentUser.uid
      );
      setUser(props.currentUser);
      setUserPosts(propsFeed);
    }, [props.feed]);

    const onLogout = () => {
        firebase.auth().signOut();
    }
    const EmptyListMessage=()=>{
      return(
        <View style={styles.back}>
          <Ionicons name="book-outline"
            size={50} style={{color:'#888', marginLeft:3}}/>
          <Text style={{fontSize:20, color:'#888'}}>게시물없음</Text>
       </View>
      )
    }

    if (user === null) {
      return (
        <View style={styles.emptyView}>
          <Text>
            유저 정보가 확인되지 않습니다. 네트워크 상태를 확인해주세요.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
            <Left>
                <Text style={styles.headertext}>마이페이지</Text>
            </Left>
            <Body></Body>
        </Header>
        <View style={styles.containerInfo}>
          <View  style={{ height: 120, flexDirection: "row", alignItems: "center", marginBottom : 10}}>
            <View style={{ width: 110 }}>
              <View style={{ width: 100, height: 100, justifyContent:'center' }}>
                <Image
                  source={require("../../assets/DS_Logo.png")}
                  style={{ width: 70, height: 70 ,marginLeft:20, marginTop:10}}/>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 10, justifyContent:'center'}}>
              <Text style={{ fontSize: 30 }}>{user.name}</Text>
              <Text style={{ color: "gray", fontSize: 15, marginTop:10 }}>
                E-mail | {user.email}
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <Text style={{color: 'white', fontSize: 17}}>판매내역</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={userPosts}
            renderItem={({ item }) => (
              <MyBookItem
                uid={item.userId}
                name={item.title}
                className={item.lecture}
                price={item.price}
                img={{ uri: item.downloadURL }}
                phone={item.phoneNumber}
                publisher={item.publisher}
                category={item.category}
                bookCondition={item.damage}
                date = {(new Date(item.creation.seconds*1000)).toString()}
                selling={item.selling}
                id={item.id}
                userid={item.userId}
              />
            )}
            ListHeaderComponent={<Text></Text>}
            ListFooterComponent={<Text></Text>}
            ListEmptyComponent={EmptyListMessage}
          />
        </View>
        <View style={styles.bottombar}>
          <View style={styles.bottomitem}>
            <Ionicons name = 'log-out-outline' size = {23} sytle={{alignItems: 'center'}}
              onPress={() => onLogout()}/>
            <Text style={{fontSize: 13}, {alignItems: 'center'}}
              onPress={() => onLogout()}>로그아웃</Text>
          </View>
          <View style={styles.bottomitem} >
            <Ionicons name = 'information-circle-outline' size = {23} sytle={{alignItems: 'center'}}
              onPress={() => Linking.openURL('https://www.notion.so/8b445f61dc924b968128e4c11d939c80')}/>
            <Text style={{fontSize: 13}, {alignItems: 'center'}}
              onPress={() => Linking.openURL('https://www.notion.so/8b445f61dc924b968128e4c11d939c80')}>이용안내</Text>
          </View>
          <View style={styles.bottomitem}>
            <Ionicons name = 'help-outline'  size = {23} sytle={{alignItems: 'center'}}
              onPress={()=>Linking.openURL('http://pf.kakao.com/_TTjxcK/chat')}/>
            <Text style={{fontSize: 13}, {alignItems: 'center'}}
              onPress={()=>Linking.openURL('http://pf.kakao.com/_TTjxcK/chat')}>Q&A</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerInfo: {
    margin: 15,
    backgroundColor: "white",
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  header: {
    backgroundColor: "white",
  },
  headertext: {
    marginLeft: 10,
    color: "#303D74",
    fontSize: 19,
  },
  bottombar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#d6d6d6",
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  bottomitem: {
    flex: 1,
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    height: 40,
    alignItems: "center",
    backgroundColor: "#303D74",
    justifyContent: "center",
    flexDirection: "row",
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  emptyView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  feed: store.usersState.feed,
});

export default connect(mapStateToProps, null)(Profile);
