import React, { useState } from 'react'
import {View, Text, StyleSheet, Alert,TouchableOpacity,Image} from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons';

import {dbFirebase, authFirebase} from "../../../App";

import BookDetail from '../BookDetail';

const BookItem = ({
  uid,
  postId,
  bookName,
  className,
  price,
  publisher,
  bookCondition,
  date,
  img,
  phone,
  category,
  selling,
  currentUserLike
}) => {
    
    const [heartColor, setHeartColor] = useState('lightgray'); 
    const [modalVisible, setModalVisible] = useState(false);

    const updateHeartColor = () => {
        if(heartColor === "#F15F5F"){
            setHeartColor('lightgray')
            alertDelete()
        }else{
            setHeartColor('#F15F5F')
            onLikePress(postId)
        }
    }

    const onLikePress = (postId) => {
        dbFirebase
          .collection("posts")
          .doc(postId)
          .collection("likes")
          .doc(authFirebase.currentUser.uid)
          .set({});
        Alert.alert("관심목록", "추가되었습니다")
    }

    // const onDislikePress = (postId) => {
    //     dbFirebase
    //         .collection("posts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(authFirebase.currentUser.uid)
    //         .delete();
        
    //     Alert.alert("관심목록", "삭제되었습니다")
    // }


        return (
            <View style={{ borderBottomColor:'lightgrey', borderBottomWidth:0.5}}>                
                <TouchableOpacity style={{backgroundColor:selling===true?"#cfcfcf":'white',
                                          opacity:selling===true?0.5:1,
                                          borderBottomColor:'lightgrey',
                                          borderBottomWidth:0.5,
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          paddingLeft: 10,
                                        }} onPress={() => setModalVisible(true)}disabled={selling===true?true:false}>
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
                        date={date}
                        img={{ uri: img }}
                        phone={phone}
                        category={category}
                        currentUserLike={currentUserLike}
                      />
                    <Image style={styles.bookImage} source={{ uri: img }} />
                    <View style={{ width:180,  flexDirection:'column'}}>
                        <Text style={styles.bookDescribeTitle}>{bookName}</Text>
                        <View style={styles.icontext}>
                            <View>
                                <FontAwesome name = 'book' style={{marginTop : 3}}/>
                                <FontAwesome name = 'won' style={{marginTop : 7}}/> 
                            </View>
                            <View>
                                <Text style={styles.bookDescribe}>{className}</Text>
                                <Text style={styles.bookDescribe}>{price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.button}>
                            {currentUserLike ? (
                                <Ionicons name = 'heart' color = {"#F15F5F"} size = {30} />
                                ) : (
                                <TouchableOpacity>
                                        <Ionicons name = 'heart' color = {'lightgray'} size = {30} onPress={() => onLikePress(postId)} />
                                </TouchableOpacity>
                            )}
                    </View>
                </TouchableOpacity>
           </View>
        );
    
        
    
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
    bookDescribe:{
        marginLeft:8,
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