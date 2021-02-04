import React, { Component } from 'react'
import { View, Button, TextInput,StyleSheet,Image } from 'react-native'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log('SignUp Success')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.Container}>
                <Image
                source={require("../../assets/DS_Logo.png")}
                style={{ width: 70, height: 70, marginBottom:20,}}
              />
                <TextInput 
                    placeholder=" Name"
                    onChangeText={(name) => this.setState({ name })}
                    style={{marginBottom:20, borderBottomWidth:0.5, borderBottomColor:'gray', width:180}}
                />
                <TextInput 
                    placeholder=" E-mail"
                    onChangeText={(email) => this.setState({ email })}
                    style={{marginBottom:20, borderBottomWidth:0.5, borderBottomColor:'gray', width:180}}
                />
                <TextInput 
                    placeholder=" Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    style={{marginBottom:20, borderBottomWidth:0.5, borderBottomColor:'gray', width:180, marginBottom:50}}
                />
                <Button style={styles.button}
                    onPress={() => this.onSignUp()}
                    color='gray'
                    title="저장"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        justifyContent:'center',
        flex:1,
        alignItems:'center'
    },
    button:{
        marginTop:20,
        paddingTop:20,
    }
  });

export default Register
