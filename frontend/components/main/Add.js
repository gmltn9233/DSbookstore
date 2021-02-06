import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView,ActivityIndicator} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import * as ImagePicker from "expo-image-picker";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Add({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("기타");
  const [price, setPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [lecture, setLecture] = useState("");
  const [damage, setDamage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const alertDone = () => {
     Alert.alert(
       "축하합니다!",
       "게시글이 정상적으로 업로드 되었습니다.",
       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
       { cancelable: false }
     );
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const uploadImage = async () => {
        const uri = image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blob = await response.blob();
        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            //console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
      firebase
        .firestore()
        .collection("posts")
        .add({
          userId: firebase.auth().currentUser.uid,
          downloadURL,title,category,price,publisher,lecture,damage,phoneNumber,likesCount: 0,selling:false,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(saveUsersPostData(downloadURL));
    }
    const saveUsersPostData = (downloadURL) => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
          userId: firebase.auth().currentUser.uid,
          downloadURL,title,category,price,publisher,lecture,damage,phoneNumber,likesCount: 0,selling:false,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          navigation.navigate("Main");
        })
        .then(alertDone());
    };

  if (hasGalleryPermission === false) {
    return <Text>No access to Gallery</Text>;
  }
  

  return (
    <View style={{backgroundColor: 'white', flex:1}}>
      <ScrollView justifyContent='center'>
        <View style={styles.container}>
          <View style={styles.formArea}>
            <DropDownPicker
              items={[
                {label: '전공', value: 'item1'},
                {label: '비전공', value: 'item2'},
                {label: '기타', value: 'item3'},
              ]}

              placeholder="카테고리"
              placeholderStyle={{color: '#888'}}

              containerStyle={{height: 45}}
              itemStyle={{justifyContent: 'flex-start'}}
              onChangeItem={(category) => setCategory(category.label)}
            />

            <TextInput
              style={styles.textForm}
              placeholder={"도서명"}
              onChangeText={(title) => setTitle(title)}
            />

            <TextInput
              style={styles.textForm}
              placeholder={"출판사"}
              onChangeText={(publisher) => setPublisher(publisher)}
            />

            <TextInput
              style={styles.textForm}
              placeholder={"수업 과목"}
              onChangeText={(lecture) => setLecture(lecture)}
            />

            <TextInput
              style={styles.textForm}
              placeholder={"판매 가격"}
              onChangeText={(price) => setPrice(price)}
            />

            <TextInput
              style={styles.textForm}
              placeholder={"훼손 상태"}
              onChangeText={(damage) => setDamage(damage)}
            />

            <TextInput
              style={styles.textForm}
              placeholder={"연락처"}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
          </View>
          <View style={styles.Image}>
            <Button
              title="갤러리에서 이미지 가져오기"
              onPress={() => pickImage()}
              color="#a8a8a8"
            />
          </View>

          <View style={styles.buttonclick}>
            <Button
              title="  등록  "
              onPress={() => uploadImage()}
              color="#303D74"
              size="100"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 10,
    marginBottom: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  formArea: {
    width: "70%",
    marginBottom: 12,
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#c4c4c4",
    width: "100%",
    height: 45,
    paddingLeft: 5,
    marginTop: 12,
    borderRadius: 3,

  },
  buttonclick: {
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "white",
  },
  headertext: {
    marginLeft: 5,
    color: "#303D74",
    fontSize: 20,
    alignItems: "flex-start",
  },
  Image: {
    width: "70%",
    marginBottom: 30,
  },
});