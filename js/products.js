import {onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

onAuthStateChanged(auth, (user) => {

    if (!user) {

        // Chưa đăng nhập
        window.location.href = "./login.html";
        return;
    }
    console.log("Đã đăng nhập:", user.email);
});

//logout
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

// Dữ liệu 30 sản phẩm
const productsData = [
    { id: 1, brand: "Torriden", name: "Set essence dưỡng môi căng bóng CELLMAZING", price: 205920, category: "lip", img: "https://down-vn.img.susercontent.com/file/sg-11134207-8259m-ms25tx6ue22w51.webp" },
    { id: 2, brand: "Torriden", name: "Kem chống nắng nâng tông da Dive-In", price: 331650, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-8259b-mfuvv4mic3rhd2.webp" },
    { id: 3, brand: "Torriden", name: "Serum DIVE IN chứa Hyaluronic Acid", price: 320000, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-8258e-mrs2cmge7v9g4f.webp" },
    { id: 4, brand: "3ce", name: "Son Bóng 3CE Glazy Lip Glow Dưỡng Môi", price: 272000, category: "lip", img: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mr8ke5nhukg23e.webp" },
    { id: 5, brand: "Rom&nd", name: "Son Tint lì THE JUICY LASTING TINT", price: 176443, category: "lip", img: "https://down-vn.img.susercontent.com/file/vn-11134201-7ra0g-m8w4qhulb9tzf5.webp" },
    { id: 6, brand: "CLIO", name: "Bảng Phấn Mắt CLIO Pro Eye Palette", price: 549000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m1gfwdoo10ov74.webp" },
    { id: 7, brand: "Round Lab", name: "Round Lab Birch Juice Moisturizing Cream", price: 395250, category: "body", img: "https://down-vn.img.susercontent.com/file/sg-11134201-81zti-mmow33124hl2b9.webp" },
    { id: 8, brand: "Skin1004", name: "Serum Rau Má Madagascar Centella", price: 329800, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134201-82607-mlf7y1pc42yqad.webp" },
    { id: 9, brand: "Peripera", name: "Son Tint Ink Mood Glowy Tint", price: 195500, category: "lip", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m20qafu7qmladc.webp" },
    { id: 10, brand: "3CE", name: "Bảng mắt phấn bơ 3CE Multi Eye Color Palette The Textile", price: 590000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mrs1tfojyebm67.webp" },
    { id: 11, brand: "Round Lab", name: "Nước hoa hồng Round Lab 1025 Dokdo Toner", price: 199750, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134201-81ztz-mmow87bl8wlg2a.webp" },
    { id: 12, brand: "Torriden", name: "Toner Pad hàng ngày BALANCEFUL CICA", price: 245970, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-7rccv-lshrmmxx7cjf1a.webp" },
    { id: 13, brand: "SKINFOOD", name: "Miếng Bông Khoai Tây Làm Dịu Da, Dưỡng Sáng Potato Madecassoside", price: 359400, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-7rdw6-lybmlum5uegnf1.webp" },
    { id: 14, brand: "Banila Co", name: "Banila Co Clean it Zero Cleansing Balm Orginal", price: 441350, category: "skincare", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lvvbpengz8pl7b.webp" },
    { id: 15, brand: "fwee", name: "fwee Rose Obsession Stay-fit Lip Tint", price: 345000, category: "lip", img: "https://down-vn.img.susercontent.com/file/sg-11134253-825zx-ml2dtldq12bnb8.webp" },
    { id: 16, brand: "fwee", name: "Cushion Foundation fwee", price: 445000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/sg-11134207-8260m-mmh4t30n04xxdb.webp" },
    { id: 17, brand: "cocoon", name: "COMBO Gel tắm bí đao", price: 445000, category: "body", img: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mr75d87vmwaudf.webp" },
    { id: 18, brand: "d'Alba", name: "First Spray Serum", price: 441408, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-7rdya-mcf6b869pms96e.webp" },
    { id: 19, brand: "peripera", name: "Peripera Pure Blushed Sunshine Cheek", price: 273000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m1z7pih3b1jv95.webp" },
    { id: 20, brand: "peripera", name: "PERIPERA QUEENFLUENCER COLLAB", price: 590000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/sg-11134207-7ra2u-mbf24jj0os4l88.webp" },
    { id: 21, brand: "Amuse", name: "Son Tint Bóng Thuần Chay Amuse Bebe Tint ", price: 399000, category: "lip", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m2m2nv74ehmi19.webp" },
    { id: 22, brand: "Medicube", name: "Toner Pad Medicube Zero Pore Pad", price: 273000, category: "skincare", img: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mipbx32yurcx54.webp" },
    { id: 23, brand: "3ce", name: "Son Tint Hiệu Ứng Pha Lê 3CE Misty Lip Bare", price: 365000, category: "lip", img: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mpd3phkryyvg0e.webp" },
    { id: 24, brand: "Too Cool For School", name: "Too Cool For School ArtClass Highlighter", price: 130000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4jtzomgexeo72.webp" },
    { id: 25, brand: "Wakemake", name: "Soft Blurring Eye Palette", price: 768203, category: "makeup", img: "https://down-vn.img.susercontent.com/file/sg-11134207-825as-mshm9yktzytd32.webp" },
    { id: 26, brand: "beplain", name: "Mặt nạ đất sét beplain X LeoJ", price: 260000, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-7ra2s-m4o3jt09qdmr55.webp" },
    { id: 27, brand: "d'Alba", name: " d'Alba Double Quick Liposome", price: 712000, category: "skincare", img: "https://down-vn.img.susercontent.com/file/sg-11134207-823p1-moorb927s3kbf0.webp" },
    { id: 28, brand: "joocyee", name: "Bảng Phấn Trang Điểm Mắt JOOCYEE", price: 613000, category: "makeup", img: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mt3avyvekb9m02.webp" },
    { id: 29, brand: "abib", name: "Abib Heartleaf Calming Sheet Mask Daily Pick", price: 539000, category: "skincare", img: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mt379bom41s00f.webp" },
    { id: 30, brand: "fwee", name: "Fwee Smoothie Lip Balm", price: 220000, category: "lip", img: "https://down-vn.img.susercontent.com/file/sg-11134207-82604-mmflbkneiy9sf2.webp" }
];

// Hàm Render Sản Phẩm
function renderProducts(category = "all") {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    const filtered = category === "all" ? productsData : productsData.filter(p => p.category === category);

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div>
                <span class="product-brand">${product.brand}</span>
                <h4 class="product-title">${product.name}</h4>
            </div>
            <div class="product-bottom">
                <span class="product-price">${product.price.toLocaleString('vi-VN')}₫</span>
                <button class="add-cart-btn" data-id="${product.id}">
                    <i class='bx bx-cart-add'></i>
                </button>
            </div>
        </div>
    `).join('');

    // Sự kiện Thêm vào giỏ hàng
    document.querySelectorAll(".add-cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            addToCart(id);
        });
    });
}

// Thêm vào LocalStorage
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = productsData.find(p => p.id === productId);
    const exist = cart.find(p => p.id === productId);

    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm "${item.name}" vào giỏ hàng! ♡`);
}

// Lắng nghe sự kiện lọc danh mục
document.addEventListener("DOMContentLoaded", () => {
    renderProducts("all");

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderProducts(e.target.dataset.category);
        });
    });
});
//lọc url home
document.addEventListener("DOMContentLoaded", () => {
    // 1. Đọc tham số category từ URL (mặc định là "all" nếu không có)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category") || "all";

    const filterBtns = document.querySelectorAll(".filter-btn");

    filterBtns.forEach(btn => {
        const btnCategory = (btn.dataset.category || "").toLowerCase();
        
        if (btnCategory === categoryParam.toLowerCase()) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }

        btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            renderProducts(e.currentTarget.dataset.category);
        });
    });

    renderProducts(categoryParam);
});

// Thêm data-category="${product.category}" vào thẻ product-card
grid.innerHTML = filtered.map(product => `
    <div class="product-card" data-category="${product.category}">
        <img src="${product.img}" alt="${product.name}" class="product-img">
        <div>
            <span class="product-brand">${product.brand}</span>
            <h4 class="product-title">${product.name}</h4>
        </div>
        <div class="product-bottom">
            <span class="product-price">${product.price.toLocaleString('vi-VN')}₫</span>
            <button class="add-cart-btn" data-id="${product.id}">
                <i class='bx bx-cart-add'></i>
            </button>
        </div>
    </div>
`).join('');