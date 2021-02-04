import React, { Component } from 'react'
import { Text, View, Button, TextInput, Image,StyleSheet, StatusBar } from 'react-native'
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('Login Success')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.Container}>
                <StatusBar backgroundColor='#303D74'/>
                <View alignItems={'center'}>
                    <View>
                        <Image style={styles.Logo}
                            source={require("../../assets/DS_white1.png")}/>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View alignItems={'center'} justifyContent={'center'}>
                            <Ionicons
                                name="person-outline"
                                size={18}
                                style={{alignItems: 'flex-end', marginTop:3, color:'#d1d6e9'}}/>
                            <FontAwesome
                                name="unlock-alt"
                                size={20}
                                style={{alignItems: 'flex-end', marginTop:22, color:'#d1d6e9'}}/>
                        </View>
                        <View marginLeft={5}>
                            <TextInput
                                placeholder="ID (E-mail)"
                                placeholderTextColor='#d1d6e9'
                                onChangeText={(email) => this.setState({ email })}
                                style={styles.input}
                                marginBottom={8}
                            />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor='#d1d6e9'
                                onChangeText={(password) => this.setState({ password })}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
                <View marginTop={30} marginBottom={30}>
                    <View style={styles.button}>
                        <Button 
                            onPress={() => this.onSignUp()}
                            title="로그인"
                            color='#819ccc'
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={() => this.props.navigation.navigate("Register")}
                            title="회원가입"
                            color='#4c66a8'
                        />
                    </View>


                </View>  
            </View>
                   
                   
    )}
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#303D74',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    Logo:{
        width: 120,
        height: 120,
        marginBottom:50,
    },
    login:{
        flexDirection:'row',
    },
    input:{
        width: 180,
        height: 33,
        marginLeft:5,
        borderColor:'#d1d6e9',
        borderBottomWidth: 1.2,
        color:'#d1d6e9',
    },
    button:{
        width: 155,
        marginBottom: 10
    }
  });

export default Login