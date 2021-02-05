import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA} from '../constants/index'
import firebase from 'firebase'
require('firebase/firestore')


export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}
export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('fetchUser does not exist')
                }
            })
    })
}
export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
            })
    })
}
export function fetchUsersPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        for (let i = 0; i < posts.length; i++) {
          dispatch(fetchUsersLikes(posts[i].id));
        }
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts});
      });
  };
}
export function fetchUsersLikes(postId) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {

                let currentUserLike = false;
                if(snapshot.exists){
                    currentUserLike = true;
                }

                dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
            })
    })
}