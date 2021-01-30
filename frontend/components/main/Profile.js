import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity, Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyBookItem from "./Profile/MyBookItem";
import * as MailComposer from 'expo-mail-composer';
import {WebView} from "react-native-webview";

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'



function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    /* const [following, setFollowing] = useState(false) */

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('profile does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

       /*  if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        } */

    }, [props.route.params.uid /* , props.following */])

    /* const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    } */

    /* const onChangeName = () => {
      Alert.alert(
        "이름바꾸기",
        "이름을 수정하시겠습니까?",
        [
          { text: "아니오", onPress: () => null },
          { text: "예", onPress: () => null },
        ],
        { cancelable: true }
      );
    };
     */
    const onLogout = () => {
        firebase.auth().signOut();
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

    /*const Noti=()=>{
      return(
        <webview source={{uri:'https://naver.com'}}/>
      )
    };*/

    if (user === null) {
        return <View />
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <View
            style={{ height: 150, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ width: 100 }}>
              <View style={{ width: 100, height: 100 }}>
                <Image
                  source={require("../../assets/profileImage/sadfrog.png")}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 30 }}>{user.name}</Text>
              <Text style={{ color: "gray", fontSize: 15 }}>
                이름: {user.name}
              </Text>
              <Text style={{ color: "gray", fontSize: 15 }}>
                학번: {user.email}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 50, flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                flex: 1,
                height: 50,
                flexDirection: "row",
                borderWidth: 0.5,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/profileImage/list.png")}
                style={{ width: 30, height: 25 }}
              />
              <Text style={{ marginLeft: 5 }}>내가 쓴 글</Text>
            </View>
          </View>
          {/* {props.route.params.uid !== firebase.auth().currentUser.uid ? (
            <View>
              {following ? (
                <Button title="Following" onPress={() => onUnfollow()} />
              ) : (
                <Button title="Follow" onPress={() => onFollow()} />
              )}
            </View>
          ) : (
            <Button title="이름 바꾸기" onPress={() => onChangeName()} />
          )} */}
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={userPosts}
            renderItem={({ item }) => (
              <MyBookItem
                name={"item.title"}
                className={"item.className"}
                price={"item.price"}
                img={{ uri: item.downloadURL }}
                phone={"item.phone"}
                publisher={"item.publisher"}
                bookCondition={"item.bookCondition"}
              />
            )}
            ListHeaderComponent={<Text></Text>}
            ListFooterComponent={<Text></Text>}
          />
        </View>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            margin: 15,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 50,
              flexDirection: "column",
              borderWidth: 0.5,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="log-out-outline"
                size={26}
                onPress={() => onLogout()}
              />
            </TouchableOpacity>
            <Text>로그아웃</Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 50,
              flexDirection: "column",
              borderWidth: 0.5,
              borderColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="alert-outline"
                size={26}
                onPress={()=>{console.log("alert-outline")}}
              />
            </TouchableOpacity>
            <Text>이용안내</Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 50,
              flexDirection: "column",
              borderWidth: 0.5,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="help-outline"
                size={26}
                onPress={()=>getemail()}
              />
            </TouchableOpacity>
            <Text>Q&A</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    /* following: store.userState.following */
})
export default connect(mapStateToProps, null)(Profile);
