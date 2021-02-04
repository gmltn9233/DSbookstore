import React, { Component } from 'react'
import { Text, 
    View, Button, TextInput, Image } from 'react-native'

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
            <View>
                <View>
                    <TextInput
                        placeholder="email"
                        onChangeText={(email) => this.setState({ email })}
                        
                    />
                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    
                    <View style={{flexDirection: 'row'}}>
                        <Button
                            onPress={() => this.onSignUp()}
                            title="Sign In"
                        />

                        <Button
                            onPress={() => this.props.navigation.navigate("Register")}
                            title="Register"
                        />
                    </View>
                    
                </View>
            </View>
        )
    }
}

export default Login
