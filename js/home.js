import {onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {auth} from "./firebase-config.js";

//logoutbtn

const logoutBtn = document.getElementById("logout-btn");

    //kiemtradangnhap

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User:", user.email);
        console.log("UID:", user.uid);
        if (logoutBtn) {
            logoutBtn.style.display = "flex";
        }
    } else {
        console.log("Chưa đăng nhập");
        if (logoutBtn) {
            logoutBtn.style.display = "none";
        }
    }
});


if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            localStorage.removeItem("currentUser");
            alert("Đăng xuất thành công!");
            window.location.href = "./index.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("Đăng xuất thất bại!");
        }
    });
}