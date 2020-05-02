import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCsdEo9hcXLr05eJCfLjyBhgRZZW_wiEls",
    authDomain: "react-login-bb835.firebaseapp.com",
    databaseURL: "https://react-login-bb835.firebaseio.com",
    projectId: "react-login-bb835",
    storageBucket: "react-login-bb835.appspot.com",
    messagingSenderId: "386802298774",
    appId: "1:386802298774:web:427caf2a8d547484dab7b7",
    measurementId: "G-8VKXSX8XVR"
};
// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore()
