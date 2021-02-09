import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';

import HomeScreen from './Home';
import MajorScreen from './Home/HomeScreen/MajorScreen'
import NonMajorScreen from './Home/HomeScreen/NonMajorScreen'
import EtcScreen from './Home/HomeScreen/EtcScreen'

const Drawer = createDrawerNavigator();

const SideBar = (props) => {
    return(
        <DrawerContentScrollView {...props}>
            <View style = {styles.container}>
                <Image style={styles.LogoImage} source = {require('../../assets/DS_Logo.png')}/>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

const HomeMain = () => {
    return (
        <Drawer.Navigator initialRouteName="전체" drawerContent={props => <SideBar {...props} />}>
            <Drawer.Screen name = '전체' component={HomeScreen}/>
            <Drawer.Screen name = '전공' component={MajorScreen}/>
            <Drawer.Screen name = '비전공' component={NonMajorScreen}/>
            <Drawer.Screen name = '기타' component={EtcScreen}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    LogoImage:{
      width: 100,
      height:100,
      margin:20,
    }
});

export default HomeMain;