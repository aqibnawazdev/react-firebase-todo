// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDT0tx44Ykll33nMJRxP7CHVIBb2DqW4tw",
//     authDomain: "react-firebase-df5f2.firebaseapp.com",
//     projectId: "react-firebase-df5f2",
//     storageBucket: "react-firebase-df5f2.appspot.com",
//     messagingSenderId: "512927268251",
//     appId: "1:512927268251:web:5a47364be1f78c6f2a353e"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzVjHqdH8tcwc2Xl3emEJZH_hOIU3LPCg",
    authDomain: "test-data-eda4b.firebaseapp.com",
    databaseURL: "https://test-data-eda4b.firebaseio.com",
    projectId: "test-data-eda4b",
    storageBucket: "test-data-eda4b.appspot.com",
    messagingSenderId: "520338885995",
    appId: "1:520338885995:web:02ee0be8284831feaf502e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);