import React, { Component } from 'react'
import { View, Button, TextInput,StyleSheet,Image,ActivityIndicator } from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            loading:false,
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        this.setState({loading:true})
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.setState({loading:false})
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log('SignUp Success')
            })
            .catch((error) => {
                this.setState({loading:false})
                this.toast.show('이메일 형식을 확인해주세요.\n 비밀번호가 6자 이상인지 확인하세요.',1000);
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
                {
                    this.state.loading
                    ? <ActivityIndicator style={styles.button} size="large"  color="#d1d6e9"/>
                    :<Button style={styles.button}
                    onPress={() => this.onSignUp()}
                    color='gray'
                    title="저장"
                />
                }    
                
                <Toast ref={ref => { this.toast = ref; }} style={{backgroundColor:'gray'}} position='center' />
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
