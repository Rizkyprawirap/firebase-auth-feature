// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhBK2wb3ZOgHaM75kdYy2_QoaoaoMsHbo",
  authDomain: "project-authentication-1.firebaseapp.com",
  projectId: "project-authentication-1",
  storageBucket: "project-authentication-1.appspot.com",
  messagingSenderId: "460869576882",
  appId: "1:460869576882:web:2fda1368dce7d75e4641ab",
  measurementId: "G-79KSNB9VC7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
