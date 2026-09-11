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

//logout

if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            localStorage.removeItem("currentUser");
            alert("Đăng xuất thành công!");
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("Đăng xuất thất bại!");
        }
    });
}