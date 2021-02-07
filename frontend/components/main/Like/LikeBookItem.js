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
      <View style={{ borderBottomColor: "lightgrey", borderBottomWidth: 1 }}>
        <View style={styles.ItemStyle}>
          <BookDetail
            visible={this.state.modalVisible}
            closeModal={this.closeModal.bind(this)}
            title={this.props.title}
            className={this.props.lecture}
            price={this.props.price}
            img={this.props.img}
            phoneNumber={this.props.phoneNumber}
            publisher={this.props.publisher}
            bookCondition={this.props.damage}
            category={this.props.category}
            currentUserLike={this.props.currentUserLike}
          />
          <TouchableOpacity
            onPress={this.openModal.bind(this)}
            disabled={this.state.ds}
          >
            <Image style={styles.bookImage} source={this.props.img} />
          </TouchableOpacity>
          <View style={styles.bookDescribe}>
            <Text style={styles.bookDescribe2}>{this.props.title}</Text>
            <View style={styles.icontext}>
              <FontAwesome name="book" paddingRight="10" />
              <Text style={styles.bookDescribe3}>{this.props.lecture}</Text>
            </View>
            <View style={styles.icontext}>
              <FontAwesome name="won" paddingRight="10" />
              <Text style={styles.bookDescribe3}>{this.props.price}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "gray",
  },
  search: {
    marginRight: 10,
    backgroundColor: "#ededed",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    //backgroundColor: '#d6ca1a',
  },
  ItemStyle: {
    // borderBottomColor:'lightgrey',
    // borderBottomWidth:1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 10,
  },
  bookImage: {
    width: 90,
    marginBottom: 5,
    height: 120,
  },
  bookDescribe: {
    paddingLeft: 20,
    flexDirection: "column",
    fontSize: 20,
  },
  bookDescribe2: {
    fontSize: 20,
    marginBottom: 10,
  },
  bookDescribe3: {
    marginLeft: 10,
    fontSize: 15,
    marginBottom: 3,
  },
  icontext: {
    flexDirection: "row",
  },
});
