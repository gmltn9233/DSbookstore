import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUsersPosts, clearData } from '../redux/actions/index'

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
    this.props.fetchUsersPosts();
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        labeled={false}
        activeColor="#303D74"
        inactiveColor="#d1cece"
        barStyle={{
          backgroundColor: "white",
          borderTopWidth: 0.2,
          borderTopColor: "lightgray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" size={26} style={{ color: color }} />
            ),
          }}
        />

        <Tab.Screen
          name="AddContainer"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-outline" size={26} style={{ color: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Like"
          component={LikeScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="heart-outline"
                size={26}
                style={{ color: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={26} style={{ color: color }} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUsersPosts,clearData },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
