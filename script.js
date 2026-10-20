

const whatsappNumber = "218944969802";

// المنتج المختار وسعره الأساسي
let selectedProduct = "";
let currentProductPrice = 0;

// إظهار نموذج الطلب واستخراج السعر الأساسي للقطعة
function showOrder(productName) {
    selectedProduct = productName;
    document.getElementById("selectedProduct").innerText = productName;

    let cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        let h3Text = card.querySelector('h3') ? card.querySelector('h3').innerText : '';
        if (h3Text.includes(productName.replace(' 💜','').replace(' 💡','').replace(' 🤳','').replace(' 🎧','').replace(' 📱','').trim())) {
            let priceText = card.querySelector('h4').innerText;
            currentProductPrice = parseInt(priceText.replace(/\D/g, '')) || 0;
        }
    });

    const orderBox = document.getElementById("orderBox");
    orderBox.style.display = "block";
    orderBox.scrollIntoView({ behavior: "smooth" });
    
    updateTotalPrice();
}

// بحث سريع وفوري عن المنتجات في الصفحة الرئيسية
function searchProducts() {
    let input = document.getElementById('searchInput').value.trim().toLowerCase();
    let cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        let title = card.querySelector('h3') ? card.querySelector('h3').innerText.toLowerCase() : '';
        let content = card.innerText.toLowerCase();

        if (title.includes(input) || content.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// بحث سريع داخل قائمة المدن (حسب الحرف أو الاسم)
function filterCities() {
    let input = document.getElementById('citySearchInput').value.toLowerCase();
    let select = document.getElementById('location');
    let options = select.options;

    for (let i = 1; i < options.length; i++) {
        let txt = options[i].text.toLowerCase();
        if (txt.includes(input)) {
            options[i].style.display = "";
        } else {
            options[i].style.display = "none";
        }
    }
}

// حساب السعر النهائي (سعر المنتج + رسوم توصيل المدينة)
function updateTotalPrice() {
    let select = document.getElementById('location');
    let val = select.value;
    let deliveryFee = 0;

    if (val && val.includes('|')) {
        deliveryFee = parseInt(val.split('|')[1]) || 0;
    }

    let total = currentProductPrice + deliveryFee;
    let displayElement = document.getElementById('finalPriceDisplay');
    if (displayElement) {
        displayElement.innerText = total + " د.ل";
    }
}

// إرسال الطلب للواتساب متضمناً السعر النهائي بالتوصيل
function sendWhatsApp() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let citySelect = document.getElementById("location");
    let payment = document.getElementById("payment").value;

    if(name === "" || phone === "" || citySelect.value === ""){
        alert("يرجى تعبئة جميع البيانات واختيار المدينة");
        return;
    }

    let cityName = citySelect.options[citySelect.selectedIndex].text;
    let finalPrice = document.getElementById('finalPriceDisplay') ? document.getElementById('finalPriceDisplay').innerText : "";

    let message = 
`طلب جديد من متجر PIXEL 💜

📦 المنتج: ${selectedProduct}
👤 الاسم: ${name}
📞 رقم الهاتف: ${phone}
📍 المدينة: ${cityName}
💰 السعر النهائي (شامل التوصيل): ${finalPrice}
💳 طريقة الدفع: ${payment}`;

    let whatsappLink = 
    "https://wa.me/" + whatsappNumber + 
    "?text=" + encodeURIComponent(message);

    window.open(whatsappLink, "_blank");
}

// القائمة في الهاتف
function openMenu(){
    let menu = document.querySelector(".menu");
    if(menu.style.display === "flex"){
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

window.addEventListener("load", function () {
    const title = document.querySelector(".products h2");
    if (title) {
        setTimeout(function () {
            title.classList.add("title-intro");
        }, 2800);
    }
});
