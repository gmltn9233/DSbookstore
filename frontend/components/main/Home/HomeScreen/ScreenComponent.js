import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, RefreshControl,} from "react-native";
import {Container, Header, Button, Left, Body, Right} from 'native-base'
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const ScreenComponent = (
    openDrawer,
    setModalVisible,
    posts,
    onLikePress,
    onDislikePress,
    handleRefresh,
    refreshing

) => {
    const componentDidMound=()=>{
        console.log(posts);
      }

    return(
        <Container>
        <Header searchBar style={styles.header}>
            <Left>
                <Button transparent onPress={openDrawer}>
                    <Ionicons name = "reorder-four-outline" 
                        size = {30}
                        style = {{color:"#303D74"}}/>
                </Button>
            </Left>
            <Body/>
            {/* 카테고리Bar를 왼쪽에 두기 위한 trick */}
            <Right/>
        </Header>
        <View style={styles.containerList}>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => (
              <View
                style={{
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 1,
                }}
              >
                <TouchableOpacity
                  style={styles.ItemStyle}
                  onPress={() => setModalVisible(true)}
                >
                  <BookDetail
                    visible={modalVisible}
                    closeModal={() => setModalVisible(false)}
                    bookName={item.title}
                    className={"item.className"}
                    price={item.price}
                    publisher={"this.props.publisher"}
                    bookCondition={"this.props.bookCondition"}
                    img={{ uri: item.downloadURL }}
                    phone={"item.user.phone"}
                    category={item.category}
                  />
                  <Image
                    style={styles.bookImage}
                    source={{ uri: item.downloadURL }}
                  />
                  <View style={styles.bookDescribe}>
                    <Text style={styles.bookDescribe2}>{item.title}</Text>
                    <View style={styles.icontext}>
                      <FontAwesome name="book" paddingRight="10" />
                      <Text style={styles.bookDescribe3}>{item.category}</Text>
                    </View>
                    <View style={styles.icontext}>
                      <FontAwesome name="won" paddingRight="10" />
                      <Text style={styles.bookDescribe3}>{item.price}</Text>
                    </View>
                  </View>
                  <View style={styles.button}>
                    {item.currentUserLike ? (
                      <Button
                        title="Dislike"
                        onPress={() => onDislikePress(item.user.uid, item.id)}
                      />
                    ) : (
                      <Button
                        title="Like"
                        onPress={() => onLikePress(item.user.uid, item.id)}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
            refreshControl={<RefreshControl refreshing={refreshing}
                                            onRefresh={handleRefresh}/>}

          />
        </View>
      </Container>
    )
}

const styles = StyleSheet.create({
    containerList: {
      marginTop:20,
      flex: 1,
    },
    header: {
      backgroundColor: "gray",
    },
    ItemStyle: {
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
    button: {
      flex: 0.9,
      alignItems: "flex-end",
    },
    icontext: {
      flexDirection: "row",
    },
  });

export default ScreenComponent;