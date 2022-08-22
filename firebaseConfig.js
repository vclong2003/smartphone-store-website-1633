// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGwAwGCiq1JS2PgkDAJX_qBdkfq7FrdPo",
  authDomain: "asm1633vclong.firebaseapp.com",
  databaseURL:
    "https://asm1633vclong-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asm1633vclong",
  storageBucket: "asm1633vclong.appspot.com",
  messagingSenderId: "83970675226",
  appId: "1:83970675226:web:6f1c0f91431672682e77a3",
  measurementId: "G-LXR3TJ49M3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
