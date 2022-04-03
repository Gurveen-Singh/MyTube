import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI6JXC3buaeuzvcW11CVyM8ylyLdb2fHY",
  authDomain: "mytube-g.firebaseapp.com",
  projectId: "mytube-g",
  storageBucket: "mytube-g.appspot.com",
  messagingSenderId: "440073586220",
  appId: "1:440073586220:web:1d397d38cc15c4f314b389",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
