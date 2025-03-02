// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzlEjDyXABEEq0p2HRw_zUE3r3YZN7-GI",
  authDomain: "projectmemoryapp.firebaseapp.com",
  projectId: "projectmemoryapp",
  storageBucket: "projectmemoryapp.firebasestorage.app",
  messagingSenderId: "823170353266",
  appId: "1:823170353266:web:198b5d8bc87c8982d4daeb",
  measurementId: "G-236DZMETJG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// const analytics = getAnalytics(app);

export default app;
