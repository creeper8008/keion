import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDestimLfcuoHdub92HmVhBJiiDcVsueR8",
  authDomain: "keion-4c463.firebaseapp.com",
  projectId: "keion-4c463",
  storageBucket: "keion-4c463.firebasestorage.app",
  messagingSenderId: "874224143949",
  appId: "1:874224143949:web:29cdba669239c9c0845604",
  measurementId: "G-KGSQ7B2L54"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const userStatus = document.getElementById("user-status");
const loginBtn = document.getElementById("login-Btn");
const logoutBtn = document.getElementById("logout-btn");
const appArea = document.getElementById("app-area");

loginBtn.addEventListener("click", () =>{
    signInWithPopup(auth, provider).catch((error) =>{
        alert("ログインに失敗しました" + error.message);
    });
});

logoutBtn.addEventListener("click", () =>{
    signOut(auth);
});

onAuthStateChanged(auth, (user) => {
    if(user){
        if(!user.email.endWith("@std.nagaokauniv.ac.jp")){
            alert("大学のGoogleアカウントでログインしてください(std.nagaokauniv.ac.jp)");
            signOut(auth);
            return;
        }
        
        userStatus.textContent = "ログイン中" + user.displayName + "(" + user.email + ")";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        appArea.style.display = "block";
    } else {
        userStatus.textContent = "ログインしていません";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        appArea.style.display = "none";
    }
});

