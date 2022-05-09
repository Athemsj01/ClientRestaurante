import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCk40fe7-e_1QsxM8JkhZlygZz0dM09CFE",
  authDomain: "restaurante-ecca8.firebaseapp.com",
  projectId: "restaurante-ecca8",
  storageBucket: "restaurante-ecca8.appspot.com",
  messagingSenderId: "511356337176",
  appId: "1:511356337176:web:e7d11051f34177e4f6176d",
  measurementId: "G-R1ZZ0X4SKS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }
