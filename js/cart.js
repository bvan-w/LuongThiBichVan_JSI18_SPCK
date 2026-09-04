import {onAuthStateChanged} 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {auth} from "./firebase-config.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "./login.html";
        return;
    }
    console.log("Đã đăng nhập:", user.email);
});
