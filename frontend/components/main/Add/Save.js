import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")


export default function Save(props) {
    const [caption, setCaption] = useState("")
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        //console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                //console.log(snapshot)
                console.log("Task Completed")
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                title,
                category,
                price,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: props.route.params.image }} />
        <TextInput
          placeholder="Write a Caption . . ."
          onChangeText={(caption) => setCaption(caption)}
        />
        <TextInput
          placeholder="Write a Title . . ."
          onChangeText={(title) => setTitle(title)}
        />
        <TextInput
          placeholder="Write a Category . . ."
          onChangeText={(category) => setCategory(category)}
        />
        <TextInput
          placeholder="Write a Price . . ."
          onChangeText={(price) => setPrice(price)}
        />

        <Button title="Save" onPress={() => uploadImage()} />
      </View>
    );
}
