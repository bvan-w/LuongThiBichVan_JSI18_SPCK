const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});


import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { auth } from "./firebase-config.js";



const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");

// dangky

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = registerForm.querySelectorAll("input");
    const username = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;
    if (username.length < 6) {
        alert("Tài khoản phải ít nhất 6 ký tự.");
        return;
    }

    if (password.length < 8) {
        alert("Mật khẩu phải ít nhất 8 ký tự.");
        return;
    }

    if (!/[a-z]/.test(password)) {
        alert("Mật khẩu phải có kí tự viết thường.");
        return;
    }

    if (!/[A-Z]/.test(password)) {
        alert("Mật khẩu phải có kí tự viết hoa.");
        return;
    }

    if (!/[0-9]/.test(password)) {
        alert("Mật khẩu phải có kí tự số.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: username
        });


        alert("Đăng ký thành công!");

        // Reset form

        registerForm.reset();


        // Chuyển sang form đăng nhập

        document
            .querySelector(".container")
            .classList.remove("active");


    } catch (error) {

        console.error(error);


        switch (error.code) {

            case "auth/email-already-in-use":

                alert("Email này đã được đăng ký.");

                break;


            case "auth/invalid-email":

                alert("Email không hợp lệ.");

                break;


            case "auth/weak-password":

                alert("Mật khẩu quá yếu.");

                break;


            default:

                alert(
                    "Đăng ký thất bại: " +
                    error.message
                );

        }

    }

});


// ==========================================
// ĐĂNG NHẬP
// ==========================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const email =
        loginForm
            .querySelector('input[type="email"]')
            .value
            .trim();


    const password =
        loginForm
            .querySelector('input[type="password"]')
            .value;


    if (!email || !password) {

        alert(
            "Vui lòng nhập email và mật khẩu."
        );

        return;
    }


    try {

        // ==================================
        // FIREBASE LOGIN
        // ==================================

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


       

        const username =
            user.displayName || "User";


       

        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                uid: user.uid,
                email: user.email,
                username: username
            })
        );


        

        alert(
            `Xin chào ${username}!`
        );


        // Reset form

        loginForm.reset();


        

        window.location.href ="../index.html"


    } catch (error) {

        console.error(error);


        switch (error.code) {

            case "auth/invalid-credential":

            case "auth/wrong-password":

            case "auth/user-not-found":

                alert(
                    "Email hoặc mật khẩu không chính xác."
                );

                break;


            case "auth/invalid-email":

                alert(
                    "Email không hợp lệ."
                );

                break;


            case "auth/too-many-requests":

                alert(
                    "Bạn thử đăng nhập quá nhiều lần. Vui lòng thử lại sau."
                );

                break;


            default:

                alert(
                    "Đăng nhập thất bại: " +
                    error.message
                );

        }

    }

});