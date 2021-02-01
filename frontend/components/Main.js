import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserAll, clearData } from '../redux/actions/index'

import HomeScreen from './main/HomeMain'
import ProfileScreen from './main/Profile'
import LikeScreen from './main/Like'

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserAll();
    }
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                labeled={false}
                activeColor='#303D74'
                inactiveColor='#d1cece'
                barStyle={{ backgroundColor: 'white', borderTopWidth:0.2, borderTopColor:'lightgray'}}>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name = 'ios-home' size = {26} style = {{color: color}}/>
                        ),
                    }} />
                
                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name = 'add-outline' size = {26} style = {{color:color}}/>
                        ),
                    }} />
                <Tab.Screen name="Like" component={LikeScreen} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name = 'heart-outline' size = {26} style = {{color:color}}/>
                        ),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                    }})}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name = 'person' size = {26} style = {{color:color}}/>
                        ),
                    }} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserAll, clearData },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
