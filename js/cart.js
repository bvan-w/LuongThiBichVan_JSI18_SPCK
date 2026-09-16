import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {auth} from "./firebase-config.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "./login.html";
        return;
    }
    console.log("Đã đăng nhập:", user.email);
});

//logout

import {signOut} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


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

//cart

const cartList = document.getElementById("cart-list");
const emptyCartView = document.getElementById("empty-cart");
const cartCountEl = document.getElementById("cart-count");
const subtotalEl = document.getElementById("cart-subtotal");
const shippingEl = document.getElementById("cart-shipping");
const totalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");


const SHIPPING_FEE = 10000; 

//Render danh sách sản phẩm trong giỏ hàng
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Tính tổng số lượng vật phẩm
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
        cartCountEl.innerText = `${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'items'}`;
    }

    // Trường hợp giỏ hàng trống
    if (cart.length === 0) {
        if (cartList) cartList.style.display = "none";
        if (emptyCartView) emptyCartView.style.display = "block";
        
        if (subtotalEl) subtotalEl.innerText = "0₫";
        if (shippingEl) shippingEl.innerText = "0₫";
        if (totalEl) totalEl.innerText = "0₫";
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    // Trường hợp có sản phẩm trong giỏ hàng
    if (cartList) cartList.style.display = "flex";
    if (emptyCartView) emptyCartView.style.display = "none";
    if (checkoutBtn) checkoutBtn.disabled = false;

    let subtotal = 0;

    cartList.innerHTML = cart.map((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        return `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                
                <div class="cart-item-info">
                    <div class="cart-item-brand">${item.brand || 'HYACINE'}</div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${Number(item.price).toLocaleString('vi-VN')}₫</div>
                </div>

                <div class="cart-item-right">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn btn-decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn btn-increase" data-index="${index}">+</button>
                    </div>
                    
                    <div class="cart-item-total">${itemSubtotal.toLocaleString('vi-VN')}₫</div>
                    
                    <button class="remove-cart-item" data-index="${index}">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    //Order Summary
    const grandTotal = subtotal + (subtotal > 0 ? SHIPPING_FEE : 0);
    
    if (subtotalEl) subtotalEl.innerText = `${subtotal.toLocaleString('vi-VN')}₫`;
    if (shippingEl) shippingEl.innerText = subtotal > 0 ? `${SHIPPING_FEE.toLocaleString('vi-VN')}₫` : "0₫";
    if (totalEl) totalEl.innerText = `${grandTotal.toLocaleString('vi-VN')}₫`;

    attachEventListeners();
}

//Tăng / Giảm số lượng / Xóa sản phẩm
function attachEventListeners() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Nút tăng số lượng (+)
    document.querySelectorAll(".btn-increase").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            cart[index].quantity += 1;
            saveAndReload(cart);
        });
    });

    // Nút giảm số lượng (-)
    document.querySelectorAll(".btn-decrease").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Xóa nếu giảm về 0
            }
            saveAndReload(cart);
        });
    });

    // Nút xóa sản phẩm
    document.querySelectorAll(".remove-cart-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            cart.splice(index, 1);
            saveAndReload(cart);
        });
    });
}

function saveAndReload(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

//Checkout
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) return;

        alert("Cảm ơn bạn đã đặt hàng! Hyacine sẽ xác nhận đơn hàng sớm nhất ♡");
        localStorage.removeItem("cart");
        renderCart();
    })
}
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});