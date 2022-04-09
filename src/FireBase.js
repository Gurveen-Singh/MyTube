import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw8yhzu93uyNaVGhADuaU5b4RfBQaQ7gk",
  authDomain: "my-tube1-1cf81.firebaseapp.com",
  projectId: "my-tube1-1cf81",
  storageBucket: "my-tube1-1cf81.appspot.com",
  messagingSenderId: "215288213680",
  appId: "1:215288213680:web:b52d931a6d833bad310b75",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
