import React, { useState } from 'react'
import {View, Text, StyleSheet, Alert,TouchableOpacity,Image} from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons';

import BookDetail from '../BookDetail';

const BookItem = ({
  uid,
  postId,
  bookName,
  className,
  price,
  publisher,
  bookCondition,
  img,
  phone,
  category,
  selling,
}) => {
    
    const [heartColor, setHeartColor] = useState('lightgray'); 
    const [modalVisible, setModalVisible] = useState(false);

    const updateHeartColor = () => {
        if(heartColor === "#F15F5F"){
            setHeartColor('lightgray')
            alertDelete()
        }else{
            setHeartColor('#F15F5F')
            alertAdd()
        }
    }

    const alertAdd = () => {
        Alert.alert("관심목록", "추가되었습니다")
    }

    const alertDelete = () => {
        Alert.alert("관심목록", "삭제되었습니다")
    }


    if(selling===false){
        return (
            <View style={{ borderBottomColor:'lightgrey', borderBottomWidth:0.5}}>                
                <TouchableOpacity style={styles.ItemStyle} onPress={() => setModalVisible(true)}>
                    <BookDetail
                        uid = {uid}
                        postId = {postId}
                        visible={modalVisible}
                        closeModal={() => setModalVisible(false)}
                        bookName={bookName}
                        className={className}
                        price={price}
                        publisher={publisher}
                        bookCondition={bookCondition}
                        img={{ uri: img }}
                        phone={phone}
                        category={category}
                      />
                    <Image style={styles.bookImage} source={{ uri: img }} />
                    <View style={{ width:180,  flexDirection:'column'}}>
                        <Text style={styles.bookDescribeTitle}>{bookName}</Text>
                        <View style={styles.icontext}>
                            <FontAwesome name = 'book'  paddingRight='10'/>
                            <Text style={ styles.bookDescribe}>  {className}</Text>
                        </View>
                        <View style={styles.icontext}>
                            <FontAwesome name = 'won'  paddingRight='10'/> 
                            <Text style={ styles.bookDescribe}>  {price}</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity>
                            <Ionicons name = 'heart' color = {heartColor} size = {30} onPress={updateHeartColor}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
           </View>
        );
    }
    else{
        return (
            <View style={{ borderBottomColor:'lightgrey', borderBottomWidth:0.5}}>                
                <TouchableOpacity style={styles.ItemStyle1} onPress={() => setModalVisible(true)}disabled={true}>
                    <BookDetail
                        uid = {uid}
                        postId = {postId}
                        visible={modalVisible}
                        closeModal={() => setModalVisible(false)}
                        bookName={bookName}
                        className={className}
                        price={price}
                        publisher={publisher}
                        bookCondition={bookCondition}
                        img={{ uri: img }}
                        phone={phone}
                        category={category}
                      />
                    <Image style={styles.bookImage} source={{ uri: img }} />
                    <View style={{ width:180,  flexDirection:'column'}}>
                        <Text style={styles.bookDescribeTitle}>{bookName}</Text>
                        <View style={styles.icontext}>
                            <FontAwesome name = 'book'  paddingRight='10'/>
                            <Text style={ styles.bookDescribe}>  {className}</Text>
                        </View>
                        <View style={styles.icontext}>
                            <FontAwesome name = 'won'  paddingRight='10'/> 
                            <Text style={ styles.bookDescribe}>  {price}</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity>
                            <Ionicons name = 'heart' color = {heartColor} size = {30} onPress={updateHeartColor}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
           </View>
        );
    }
    
}

const styles = StyleSheet.create({
    ItemStyle:{
        borderBottomColor:'lightgrey',
        borderBottomWidth:0.5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    ItemStyle1:{
        borderBottomColor:'lightgrey',
        borderBottomWidth:0.5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        backgroundColor:"#cfcfcf"
    },       
    bookImage:{
        marginRight:20,
        width: 90,
        marginBottom:5,
        height:120,
    },
    bookDescribeTitle:{
        fontSize: 20,
        marginBottom:10
    },
    bookDescribe3:{
        marginLeft:10,
        fontSize: 15,
        marginBottom:3
    },
    button:{
        paddingRight:5,
        alignItems:'flex-end',
        flex:0.9,
    },
    icontext:{
        flexDirection:'row',
    }
});

export default BookItem;