import {initializeApp} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAotXEX4umKHyjn0s-rueijfPFAyX1UbLw",
    authDomain: "hycine-project-jsi18.firebaseapp.com",
    projectId: "hycine-project-jsi18",
    storageBucket: "hycine-project-jsi18.firebasestorage.app",
    messagingSenderId: "68939991763",
    appId: "1:68939991763:web:c60668b7eec266ffa86226"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const cloudinaryConfig = {
    cloudName: "hlgagezs",
    uploadPreset: "coffee-jsi18"
};