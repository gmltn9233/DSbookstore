import * as React from 'react';
import {View, Text, StyleSheet,Image,Alert,TouchableOpacity} from 'react-native';
import { Button, Segment} from 'native-base'
import {FontAwesome } from '@expo/vector-icons';

import BookDetail from '../BookDetail';
import {dbFirebase} from '../../../App';



export default class BookScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      seg: 1,
      backgroundColor: "white",
      btbc: "white",
      opacity: 1,
      ds: false,
    };
  }

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  yalert = async() => {
    await dbFirebase.collection('posts').doc(this.props.id).update({
      selling:true
  });
    await dbFirebase.collection('users').doc(this.props.userid).collection("userPosts").doc(this.props.id2).update({
    selling:true
  });
    if (this.props.selling === true) {
      this.setState({
        seg: 2,
        backgroundColor: "#cfcfcf",
        btbc:'transparent',
        opacity: 0.5,
        ds: true,
      });
    }
  };

  alertSave = async() => {
    Alert.alert(
      "판매완료",
      "상태를 수정하시겠습니까?\n \n 주의) 수정할 수 없습니다.",
      [
        { text: "아니오", onPress: () => null },
        { text: "예", onPress: this.yalert },
      ],
      { cancelable: true }
    );
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
      return (
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 0.7,
            borderColor: "lightgray",
            backgroundColor: this.props.selling===true? "#cfcfcf":'white',
            opacity: this.props.selling===true? 0.5:1,
          }}
        >
          <View>
            <BookDetail
              uid = {this.props.uid}
              visible={this.state.modalVisible}
              closeModal={this.closeModal.bind(this)}
              bookName={this.props.name}
              className={this.props.className}
              price={this.props.price}
              publisher={this.props.publisher}
              phone={this.props.phone}
              bookCondition={this.props.bookCondition}
              date = {this.props.date}
              category={this.props.category}
              img={this.props.img}
              selling={this.props.selling}
            />
            <TouchableOpacity
              onPress={this.openModal.bind(this)}
              disabled={this.props.selling===true? true:false}
            >
              <Image style={styles.image} source={this.props.img} />
            </TouchableOpacity>
          </View>
          <View style={styles.bookcontent}>
            <View style={styles.textcontent}>
              <Text style={styles.bookDescribeTitle}>{this.props.name}</Text>
              <View style={styles.icontext}>
                <View>
                  <FontAwesome name = 'book' style={{marginTop : 3}}/>
                  <FontAwesome name = 'won' style={{marginTop : 7}}/> 
                </View>
                <View>
                  <Text style={styles.bookDescribe}>{this.props.className}</Text>
                  <Text style={styles.bookDescribe}>{this.props.price}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttoncontent}>
              <Segment style={{backgroundColor:this.props.selling===true? 'transparent':'white'}} >
                <Button style={{backgroundColor: this.props.selling === false ? "#303D74" : 'white', borderColor: "#303D74"}}
                  disabled={this.props.selling===false? true:false}
                  first
                  active={this.props.selling === true ? true : false}>
                  <Text style={{ color: this.props.selling === false ? "white" : "#303D74" }}>  판매중  </Text>
                </Button>
                <Button last
                  style={{backgroundColor: this.props.selling === true ? "#303D74" : 'white',borderColor: "#303D74"}}
                  disabled={this.props.selling===true? true:false}
                  active={this.props.selling === false ? true : false}
                  onPress={this.alertSave}>
                  <Text style={{ color: this.props.selling === false ? "#303D74" : "white" }}>  판매완료  </Text>
                </Button>
              </Segment> 
            </View>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 15,
    width: 120,
    height: 120,
  },
  icontext: {
    flexDirection: "row",
  },
  bookcontent: {
    margin: 15,
    flexDirection: "column",
  },
  textcontent: {
    flex: 1,
  },
  buttoncontent: {
    flexDirection: "row",
    flex: 1,
  },
  whatbook: {
    margin: 1,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "black",
  },
  bookDescribeTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  bookDescribe: {
    marginLeft: 10,
    fontSize: 15,
    marginBottom: 3,
  },
});