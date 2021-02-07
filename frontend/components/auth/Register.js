import React, { Component } from 'react'
import {Text, View, Button, TextInput,StyleSheet,Image,ActivityIndicator,Alert,Linking} from 'react-native'
import {CheckBox}from"native-base";
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
            isSelected:false,
        }
        
        this.onSignUp = this.onSignUp.bind(this)
    }
    setSelection=()=>{
        if(this.state.isSelected===false){
            this.setState({
                isSelected:true
            })
        }
        else{
            this.setState({
                isSelected:false
            })
        }
    }
    checkalert=()=>{
        if(this.state.isSelected===true){
            this.onSignUp
        }
        else{
            Alert.alert(
                "오류",
                "약관에 동의해주세요."
            )
        }
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
                <View style={{flexDirection:'row', marginBottom:15}}>
                    <Text style={{fontWeight:'bold',textDecorationLine: 'underline',}}
                          onPress={() => Linking.openURL('https://a-hyun.github.io/per_inform/per_infor')}>이용약관</Text>
                    <Text>에 동의하십니까?</Text>
                    <CheckBox checked={this.state.isSelected} onPress={this.setSelection}/>
                </View>
                    
                {
                    this.state.loading
                    ? <ActivityIndicator style={styles.button} size="large"  color="#d1d6e9"/>
                    :<Button style={styles.button}
                    onPress={this.checkalert}
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
