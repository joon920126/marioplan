import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDEKBwzqa8nJds8Adfknrme5_xtJ0wfUGk",
    authDomain: "marioplan-d6b73.firebaseapp.com",
    databaseURL: "https://marioplan-d6b73.firebaseio.com",
    projectId: "marioplan-d6b73",
    storageBucket: "",
    messagingSenderId: "610328080457",
    appId: "1:610328080457:web:d9e1e9387f56a5e5"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots:true})

export default firebase;