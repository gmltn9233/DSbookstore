import React, { Component } from 'react'
import { Text, View, Button, TextInput, Image,StyleSheet } from 'react-native'
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import firebase from 'firebase'

import Register from './Register'

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
                <View>
                    <Image style={styles.Logo}
                           source={require("../../assets/DS_white1.png")}/>
                    <View style={styles.login}>
                        <Ionicons name="person-outline" size={21} />
                        <Text></Text>
                        <TextInput
                            placeholder="  ID (E-mail)"
                            underlineColorAndroid='black'
                            onChangeText={(email) => this.setState({ email })}
                            width={130}
                            height={33}
                        />
                    </View>
                    <View style={styles.login}>
                        <FontAwesome name="unlock-alt" size={25} />
                        <Text>  </Text>
                        <TextInput
                            placeholder="  Password"
                            secureTextEntry={true}
                            underlineColorAndroid='black'
                            onChangeText={(password) => this.setState({ password })}
                            marginBottom={30}
                            width={130}
                            height={33}/>
                    </View>
                    <View >
                        <Button 
                            onPress={() => this.onSignUp()}
                            title="로그인"
                            color='#819ccc'
                            />
                        <Text style={{fontSize:4}}>  </Text>
                        <Button
                            onPress={() => this.props.navigation.navigate("Register")}
                            title="회원가입"
                            color='#4c66a8'
                            style={styles.button}
                        />
                    </View>  
                </View>
            </View>
        )
    }
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
        marginLeft:20,
        width: 120,
        height: 120,
        marginBottom:50
    },
    login:{
        flexDirection:'row',
    },
 
  });


export default Login
