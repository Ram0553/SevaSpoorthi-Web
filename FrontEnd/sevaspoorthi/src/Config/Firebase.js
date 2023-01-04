import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr1sTAH_AvZ-pDkae0HX-45eUCKq9j6kM",
  authDomain: "sevaspoorthi-web.firebaseapp.com",
  projectId: "sevaspoorthi-web",
  storageBucket: "sevaspoorthi-web.appspot.com",
  messagingSenderId: "862520770117",
  appId: "1:862520770117:web:db60614e62e6e14865ad2c",
  measurementId: "G-GQB8Q45PP8"
};

const app = initializeApp(firebaseConfig);
const fireAuth = getAuth(app);

export default fireAuth ;
