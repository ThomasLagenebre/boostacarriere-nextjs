// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMTiwEs14EpjuQTo9AgnlKSvhV3opdaMY",
  authDomain: "boostacarriere-2679a.firebaseapp.com",
  projectId: "boostacarriere-2679a",
  storageBucket: "boostacarriere-2679a.appspot.com",
  messagingSenderId: "857124582856",
  appId: "1:857124582856:web:f6e63c1e71f5c856777cfd",
  measurementId: "G-B51TNV8WMQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
