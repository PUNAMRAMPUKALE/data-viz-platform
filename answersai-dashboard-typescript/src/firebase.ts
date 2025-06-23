import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtAQE24TdbolsJnQBvMy2JyxGQxaWB98Q", // double-check
  authDomain: "dashboard-demo-d6c3f.firebaseapp.com", // ✅ must match Firebase console
  projectId: "dashboard-demo-d6c3f",
  storageBucket: "dashboard-demo-d6c3f.appspot.com", // was incorrect earlier
  messagingSenderId: "151220576868",
  appId: "1:151220576868:web:2b3209b23a33f898607571",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
