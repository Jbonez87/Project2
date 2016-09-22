const firebase = require('firebase');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAD_Yn6FeMgHtcA8SBrCDyaEwlm6wDjzYY",
  authDomain: "secret-spots.firebaseapp.com",
  databaseURL: "https://secret-spots.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "139532175779"
};

firebase.initializeApp(config);

module.exports = firebase;
