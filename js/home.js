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
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("Đăng xuất thất bại!");
        }
    });
}

//category
document.addEventListener("DOMContentLoaded", () => {
    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            // Lấy URL dạng /html/products.html?category=skincare
            const targetUrl = card.getAttribute("href");
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });
});

//muitenbanner
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("adBannerWrapper");
    const prevBtn = document.getElementById("adPrevBtn");
    const nextBtn = document.getElementById("adNextBtn");
    const dotsContainer = document.getElementById("adDots");

    if (!wrapper) return;

    const slides = wrapper.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoSlideInterval;

    // Tạo chấm tròn
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("ad-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function goToSlide(index) {
        currentIndex = index;
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        Array.from(dots).forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
});