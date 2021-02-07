import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, Modal, TouchableOpacity, ScrollView, Alert,ActivityIndicator} from "react-native";
import { Header, Left, Body } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

import {dbFirebase} from '../../../App';

const BookEdit = ({
    postId,
    visible,
    closeModal,
    bookName,
    className,
    value,
    company,
    bookCondition,
    phone,
    domain
}) => {

    const [title, setTitle] = useState(bookName);
    const [category, setCategory] = useState(domain);
    const [price, setPrice] = useState(value);
    const [publisher, setPublisher] = useState(company);
    const [lecture, setLecture] = useState(className);
    const [damage, setDamage] = useState(bookCondition);
    const [phoneNumber, setPhoneNumber] = useState(phone);
    const [any, setany] = useState(false);

    const onSubmit = async() => {
         await dbFirebase.collection('posts').doc(postId).update({
             title:title,
             category:category,
             price:price,
             publisher:publisher,
             lecture:lecture,
             damage:damage,
             phoneNumber:phoneNumber,
      
         });
        Alert.alert("수정되었습니다", "변경까지 약간의 시간이 소요됩니다.");
        setany(true);
        closeModal();
        setany(false);
    }
    

    return (
        <Modal visible={visible} animationType='fade' onRequestClose={closeModal}>
            <View style={{backgroundColor: 'white'}}>
            <Header style={styles.header}>
                <Left>
                <TouchableOpacity onPress={closeModal}>
                    <Ionicons name = 'md-close' size = {30} />
                </TouchableOpacity>
                </Left>
                <Body></Body>
            </Header>
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.formArea}>
                    <DropDownPicker
                    items={[
                        {label: '전공', value: 'item1'},
                        {label: '비전공', value: 'item2'},
                        {label: '기타', value: 'item3'},
                    ]}
        
                    placeholder={category}
                    placeholderStyle={{color: '#888'}}
        
                    containerStyle={{height: 45}}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={(category) => setCategory(category.label)}
                    />
        
                    <TextInput
                    style={styles.textForm}
                    placeholder={"도서명"}
                    onChangeText={(title) => setTitle(title)}
                    value = {title}
                    />
        
                    <TextInput
                    style={styles.textForm}
                    placeholder={"출판사"}
                    onChangeText={(publisher) => setPublisher(publisher)}
                    value={publisher}
                    />
        
                    <TextInput
                    style={styles.textForm}
                    placeholder={"수업 과목"}
                    onChangeText={(lecture) => setLecture(lecture)}
                    value={lecture}
                    />
        
                    <TextInput
                    style={styles.textForm}
                    placeholder={"판매 가격"}
                    onChangeText={(price) => setPrice(price)}
                    value={price}
                    />
        
                    <TextInput
                    style={styles.textForm}
                    placeholder={"훼손 상태"}
                    onChangeText={(damage) => setDamage(damage)}
                    value={damage}
                    />
        
                    <TextInput
                    style={styles.textForm}
                    placeholder={"연락처"}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    value={phoneNumber}
                    />
                </View>
                <ActivityIndicator style={styles.button} size="large"  color="#d1d6e9" animating={any}/>
                <View style={styles.buttonclick}>
                    <Button
                        title="  등록  "
                        color="#303D74"
                        size="100"
                        onPress={onSubmit}
                    />
                </View>
                </View>
            </ScrollView>
            </View>
        </Modal>
      );
}
    
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 10,
    marginBottom: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  formArea: {
    width: "70%",
    marginBottom: 12,
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#c4c4c4",
    width: "100%",
    height: 45,
    paddingLeft: 5,
    marginTop: 12,
    borderRadius: 3,

  },
  buttonclick: {
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "white",
  },
  headertext: {
    marginLeft: 5,
    color: "#303D74",
    fontSize: 20,
    alignItems: "flex-start",
  },
  Image: {
    width: "70%",
    marginBottom: 30,
  },
});

export default BookEdit;