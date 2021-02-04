
import firebase from 'firebase';
import firebaselib from "./firebase_firestore";
const gitLogin = async()=>{

    var provider = new firebase.auth.GithubAuthProvider();
    var authVal = await firebase.auth().signInWithPopup(provider);
    var user = authVal.user;
    var token = authVal.credential.accessToken;
    console.log(user);
    firebaselib.createUser(user.email);
 return {user:user,token:token};

};
export default gitLogin;