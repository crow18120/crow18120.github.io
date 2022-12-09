// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhL_J3Rw3VhuhsZ3Q2luAUKC98gVzmvZU",
  authDomain: "cw2022-6839b.firebaseapp.com",
  projectId: "cw2022-6839b",
  storageBucket: "cw2022-6839b.appspot.com",
  messagingSenderId: "785310441821",
  appId: "1:785310441821:web:c2f64075517d933d9f48b4",
  measurementId: "G-XL38ZTW2NE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getCollection = (model) => {
  return collection(db, model);
};

const getData = async (model) => {
  const collection = getCollection(model);
  return await getDocs(collection);
};
export { app, db, getData };
