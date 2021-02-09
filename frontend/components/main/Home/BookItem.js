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
                    <View style={{ width:170,  flexDirection:'column'}}>
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
                    <View alignItems='flex-end' flex={1} marginRight={3}>
                        <View style={styles.button}>            
                            {currentUserLike ? (
                                <Ionicons name ={selling===true?'':'heart'} color = {"#F15F5F"} size = {30}/>
                                ) : (
                                <TouchableOpacity>
                                        <Ionicons name ={selling===true?'':'heart'} color = {'lightgray'} size = {30} onPress={() => onLikePress(postId)} />
                                </TouchableOpacity>)
                            }
                            {
                                selling===true?<View style={styles.panmae}><Text>판매완료</Text></View>:<Text></Text>
                            }
                        </View>
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
        marginRight:15,
        width: 110,
        marginTop:3,
        marginBottom:3,
        height:110,
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
        justifyContent:'center',
        flex:1,
    },
    icontext:{
        flexDirection:'row',
    },
    panmae:{
        backgroundColor: '#888',
        borderRadius : 3,
        width: 50,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default BookItem;