import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBzqLeWAEh9MSDi2gYDCzjMPxhkuBQkjo0",
    authDomain: "platinumgym-1c439.firebaseapp.com",
    projectId: "platinumgym-1c439",
    storageBucket: "platinumgym-1c439.appspot.com",
    messagingSenderId: "1097489061167",
    appId: "1:1097489061167:web:4d0aa1fbd4cae614613dda",
    measurementId: "G-LTN1RPPEYL"
  //  databaseURL: "https://instragram-clone-17364-default-rtdb.firebaseio.com/",
};


let app;
if (getApp.length === 0) {
    app = initializeApp(firebaseConfig);
}
else{
     app = getApps;
}

export const auth = getAuth(app);
export const database = getDatabase(app);
export const fireStore = getFirestore(app);
export const storage = getStorage(app);





