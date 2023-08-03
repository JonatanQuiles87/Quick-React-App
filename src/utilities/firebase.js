// Import the functions you need from the SDKs you need
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRcYaqY_-ZFuCzTkzPd5uQomSBr7hwD1c",
  authDomain: "scheduler-7a7e1.firebaseapp.com",
  databaseURL: "https://scheduler-7a7e1-default-rtdb.firebaseio.com",
  projectId: "scheduler-7a7e1",
  storageBucket: "scheduler-7a7e1.appspot.com",
  messagingSenderId: "521050762122",
  appId: "1:521050762122:web:b1ce9e2a161b6ede5d7673",
  measurementId: "G-RP79RTK8CF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//ref(database, '/')

  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };
  export const setData = (path, value) => (
    set(ref(database, path), value)
  );