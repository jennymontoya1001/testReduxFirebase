import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from  'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAcRz74LjoICp_absIni-AFoI6g0TgfiHY",
  authDomain: "frontend-4-81b7a.firebaseapp.com",
  projectId: "frontend-4-81b7a",
  storageBucket: "frontend-4-81b7a.appspot.com",
  messagingSenderId: "218091345573",
  appId: "1:218091345573:web:0c8bd070cf68fac1e69f4c"
};

const app = initializeApp(firebaseConfig);
const google =  new GoogleAuthProvider();
const db = getFirestore(app)

export{
    app,
    google,
    db
}