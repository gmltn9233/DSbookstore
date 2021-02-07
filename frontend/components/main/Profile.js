import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity, Alert, Linking,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyBookItem from "./Profile/MyBookItem";
import * as MailComposer from 'expo-mail-composer';
import {Container, Header,  Left, Item, Input,Body} from 'native-base'
import {WebView} from "react-native-webview";

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'


function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
            console.log(posts)
        }
        else {
          console.log("ProfileError")
        }
    }, [props.route.params.uid])

    const onLogout = () => {
        firebase.auth().signOut();
    }
    const EmptyListMessage=()=>{
      return(

          <View style={{alignItems:'center'}}>
          <Ionicons name="camera-outline"
                size={50}/>
          <Text style={{fontSize:17}}>게시물 없음</Text>
        </View>

      )
    }
    const getemail = async() => {
      try{
        await MailComposer.isAvailableAsync();
        console.log("help-outline");
        MailComposer.composeAsync({
          recipients:['dskminj@naver.com'],
          subject:'데사책방문의',
          body:'문의내용'
        });
      }catch(error){
        Alert.alert("mail 기능 사용 불가", "ㅠ-ㅠ");
      }
    };

    if (user === null) {
        return <View />
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
                name={item.title}
                className={item.lecture}
                price={item.price}
                img={{ uri: item.downloadURL }}
                phone={item.phone}
                publisher={item.publisher}
                category={item.category}
                bookCondition={item.damage}
                selling={item.selling}
                id={item.postId}
                userid={item.userId}
                id2={item.id}
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
              onPress={() => Linking.openURL('https://naver.com')}/>
            <Text style={{fontSize: 13}, {alignItems: 'center'}}
              onPress={() => Linking.openURL('https://naver.com')}>이용안내</Text>
          </View>
          <View style={styles.bottomitem}>
            <Ionicons name = 'help-outline'  size = {23} sytle={{alignItems: 'center'}}
              onPress={()=>getemail()}/>
            <Text style={{fontSize: 13}, {alignItems: 'center'}}
              onPress={()=>getemail()}>Q&A</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  header:{
    backgroundColor:'white',
  },
  headertext:{
    marginLeft:10,
    color:'#303D74',
    fontSize:19,
  },
  bottombar: {
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
    borderColor : '#d6d6d6',
    borderWidth: 0.5, 
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  bottomitem:{
    flex: 1,
    height: 40, 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  list:{
    height: 40,
    alignItems: 'center', 
    backgroundColor: '#303D74',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(Profile);
