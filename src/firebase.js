import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDEXHWq6c0hZ7Qoaosj1bumc3V9c3KgHtI",
  authDomain: "messenger-8f95e.firebaseapp.com",
  databaseURL: "https://messenger-8f95e-default-rtdb.firebaseio.com",
  projectId: "messenger-8f95e",
  storageBucket: "messenger-8f95e.appspot.com",
  messagingSenderId: "569342207863",
  appId: "1:569342207863:web:f42c3e5492f2578d87a372",
  measurementId: "G-YTJCKSLQ7E"
});

const db = firebaseApp.firestore();

export default db;