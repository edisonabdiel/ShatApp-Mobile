// Firebase boilerplate
import firebase from 'firebase';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyBJUhdfwOjoFdfBAaGfebCbvb2NCoRZtmY",
  authDomain: "shatapp-1d6c7.firebaseapp.com",
  projectId: "shatapp-1d6c7",
  storageBucket: "shatapp-1d6c7.appspot.com",
  messagingSenderId: "23794753192",
  appId: "1:23794753192:web:b856a0b76ff94328832c9d",
  measurementId: "G-HHSTQ6X7D2"
};
 
// Initiate Firebase
 if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
 }

 export default firebase;