/* Importing the firebase app and the firebase auth. */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/* The configuration for the firebase app. */
const firebaseConfig = {
  apiKey: "AIzaSyCB2_HUQQDC-GQItFJrbLLdIMMcpXBdDdg",
  authDomain: "mytube-v1.firebaseapp.com",
  projectId: "mytube-v1",
  storageBucket: "mytube-v1.appspot.com",
  messagingSenderId: "963074073738",
  appId: "1:963074073738:web:a89eb2c526c8fe72253973",
};

/* Initializing the firebase app with the configuration. */
firebase.initializeApp(firebaseConfig);

/* Exporting the firebase auth object. */
export default firebase.auth();
