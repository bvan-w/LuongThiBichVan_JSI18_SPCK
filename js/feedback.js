import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { auth, db, cloudinaryConfig } from "./firebase-config.js";


const logoutBtn = document.getElementById("logout-btn");
const feedbackForm = document.getElementById("feedback-form");
const imageInput = document.getElementById("feedback-image");
const imagePreview = document.getElementById("image-preview");
const feedbackList = document.getElementById("feedback-list");
const submitBtn = feedbackForm ? feedbackForm.querySelector('button[type="submit"]') : null;

let selectedFile = null;

// ktra dangnhap
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "./login.html";
        return;
    }
    if (logoutBtn) logoutBtn.style.display = "flex";
});

//dangxuat
if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            localStorage.removeItem("currentUser");
            alert("Đăng xuất thành công!");
            window.location.href = "./login.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("Đăng xuất thất bại!");
        }
    });
}

//anh
if (imageInput) {
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.innerHTML = `
                    <div style="position: relative;">
                        <img src="${event.target.result}" alt="Preview" />
                        <button type="button" id="remove-img-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">✕</button>
                    </div>
                `;
                imagePreview.style.display = "block";

                document.getElementById("remove-img-btn").addEventListener("click", () => {
                    selectedFile = null;
                    imageInput.value = "";
                    imagePreview.innerHTML = "";
                    imagePreview.style.display = "none";
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

//uploadanh
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) {
        throw new Error("Tải ảnh lên Cloudinary thất bại!");
    }

    const data = await res.json();
    return data.secure_url;
}

//submit
if (feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user) {
            alert("Vui lòng đăng nhập lại!");
            return;
        }

        const name = document.getElementById("feedback-name").value.trim();
        const message = document.getElementById("feedback-message").value.trim();
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const rating = ratingInput ? parseInt(ratingInput.value) : 5;

        if (!name || !message) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
//hieuungnutbam
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Đang gửi... <i class='bx bx-loader-alt bx-spin'></i>`;

            let imageUrl = "";
            if (selectedFile) {
                imageUrl = await uploadToCloudinary(selectedFile);
            }

            //luu vao firebasae
            await addDoc(collection(db, "feedbacks"), {
                uid: user.uid,
                userName: name,
                rating: rating,
                message: message,
                imageUrl: imageUrl,
                createdAt: serverTimestamp()
            });

            alert("Cảm ơn bạn đã gửi phản hồi! ♡");

            //reset
            feedbackForm.reset();
            selectedFile = null;
            imagePreview.innerHTML = "";
            imagePreview.style.display = "none";

        } catch (error) {
            console.error("Error adding feedback: ", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `SEND FEEDBACK <i class='bx bx-send'></i>`;
        }
    });
}

//hienthifb
function loadFeedbacks() {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        feedbackList.innerHTML = "";

        if (snapshot.empty) {
            feedbackList.innerHTML = `<p style="text-align: center; grid-column: 1/-1; color: #9c7b87;">Chưa có đánh giá nào. Hãy là người đầu tiên gửi phản hồi!</p>`;
            return;
        }

        snapshot.forEach((doc) => {
            const data = doc.data();
            const stars = "★".repeat(data.rating || 5) + "☆".repeat(5 - (data.rating || 5));
            const initial = data.userName ? data.userName.charAt(0).toUpperCase() : "U";

            const card = document.createElement("div");
            card.className = "review-card";

            card.innerHTML = `
                <div class="review-user">
                    <div class="user-avatar">${initial}</div>
                    <div>
                        <h3>${escapeHTML(data.userName)}</h3>
                        <div class="review-stars">${stars}</div>
                    </div>
                </div>
                <p class="review-text">${escapeHTML(data.message)}</p>
                ${data.imageUrl ? `<div style="margin-top: 12px;"><img src="${data.imageUrl}" alt="Feedback image" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 15px;" /></div>` : ""}
            `;

            feedbackList.appendChild(card);
        });
    }, (error) => {
        console.error("Lỗi khi tải danh sách feedback:", error);
    });
}

loadFeedbacks();