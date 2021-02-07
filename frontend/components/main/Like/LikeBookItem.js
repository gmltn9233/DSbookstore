import React, { useState } from "react";
import {View,Text,Button,StyleSheet,Alert,TouchableOpacity,Image,} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as SMS from "expo-sms";
import BookDetail from "../BookDetail";

import firebase from "firebase";
require("firebase/firestore");

export default class BookItem extends React.Component {
  constructor() {
    super();
    this.state = {
      heartColor: "lightgray",
      modalVisible: false,
    };
  }
  updateHeartColor = () => {
    if (this.state.heartColor === "#F15F5F") {
      this.setState({
        heartColor: "lightgray",
      });
      this.alertDelete();
    } else {
      this.setState({
        heartColor: "#F15F5F",
      });
      this.alertAdd();
    }
  };

  getSMS = async () => {
    try {
      await SMS.isAvailableAsync();
      SMS.sendSMSAsync(
        this.props.phone,
        'App Testing\n안녕하세요! 판매중이신 "' +
          this.props.BookName +
          '" 책을 구입하고 싶어요!!'
      ); //고정된 메세지를 보낼 수 있게 한다
    } catch (error) {
      Alert.alert("SMS 기능 사용 불가", "ㅠ-ㅠ");
    }
  };

  alertAdd = () => {
    Alert.alert("관심목록", "추가되었습니다");
  };

  alertDelete = () => {
    Alert.alert("관심목록", "삭제되었습니다");
  };

  openModal = () => {
    // Alert.alert("판매페이지로 넘어갑니다")
    this.setState({
      modalVisible: true,
    });
  };
  closeModal = () => {
    // Alert.alert("판매페이지로 넘어갑니다")
    this.setState({
      modalVisible: false,
    });
  };
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.ItemStyle}
          onPress={this.openModal.bind(this)}
          disabled={this.state.ds}>
          <BookDetail
            visible={this.state.modalVisible}
            closeModal={this.closeModal.bind(this)}
            bookName={this.props.title}
            className={this.props.lecture}
            price={this.props.price}
            img={this.props.img}
            phoneNumber={this.props.phoneNumber}
            publisher={this.props.publisher}
            bookCondition={this.props.damage}
            date = {this.props.date}
            category={this.props.category}
            currentUserLike={this.props.currentUserLike}
          />
          <Image style={styles.bookImage} source={this.props.img}/>
          <View style={{ width:180,  flexDirection:'column'}}>
            <Text style={styles.bookDescribeTitle}>{this.props.title}</Text>
            <View style={styles.icontext}>
              <View>
                <FontAwesome name="book" style={{marginTop : 3}}/>
                <FontAwesome name="won" style={{marginTop : 7}}/>
              </View>
              <View>
                <Text style={styles.bookDescribe}>{this.props.lecture}</Text>
                <Text style={styles.bookDescribe}>{this.props.price}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ItemStyle: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  bookImage: {
    marginRight:20,
    width: 90,
    marginBottom: 5,
    height: 120,
  },
  bookDescribeTitle:{
    fontSize: 20,
    marginBottom:10
  },
  bookDescribe:{
    marginLeft:8,
    fontSize: 15,
    marginBottom:3
  },
  icontext: {
    flexDirection: "row",
  },
});
