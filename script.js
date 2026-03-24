const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        category: "phones",
        brand: "apple",
        price: 99999,
        rating: 4.8,
        reviews: 2453,
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
        image: "./assets/images/iphone.webp"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        category: "phones",
        brand: "samsung",
        price: 107999,
        rating: 4.7,
        reviews: 1876,
        description: "Premium Android phone with S Pen, 200MP camera, and AMOLED display",
        image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Galaxy+S24+Ultra"
    },
    {
        id: 3,
        name: "MacBook Pro 16\"",
        category: "laptops",
        brand: "apple",
        price: 2499,
        rating: 4.9,
        reviews: 1234,
        description: "Powerful laptop with M3 Max chip, stunning retina display, and all-day battery",
        image: "https://via.placeholder.com/280x200/667eea/ffffff?text=MacBook+Pro+16"
    },
    {
        id: 4,
        name: "Dell XPS 15",
        category: "laptops",
        brand: "dell",
        price: 1899,
        rating: 4.6,
        reviews: 987,
        description: "High-performance Windows laptop with 4K display and powerful graphics",
        image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Dell+XPS+15"
    },
    {
        id: 5,
        name: "Samsung 65\" QLED 4K TV",
        category: "tvs",
        brand: "samsung",
        price: 1299,
        rating: 4.7,
        reviews: 1543,
        description: "Premium QLED TV with vibrant colors, smart features, and gaming mode",
        image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Samsung+QLED+TV"
    },
    {
        id: 6,
        name: "LG 55\" OLED 4K TV",
        category: "tvs",
        brand: "lg",
        price: 1499,
        rating: 4.8,
        reviews: 2109,
        description: "Perfect black levels, infinite contrast, and Dolby Vision IQ",
        image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=LG+OLED+TV"
    },
    {
        id: 7,
        name: "Samsung 28 cu.ft. Refrigerator",
        category: "appliances",
        brand: "samsung",
        price: 2199,
        rating: 4.5,
        reviews: 654,
        description: "Smart refrigerator with Family Hub, ice maker, and energy efficient design",
        image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Samsung+Refrigerator"
    },
    {
        id: 8,
        name: "LG 24 cu.ft. Smart Refrigerator",
        category: "appliances",
        brand: "lg",
        price: 1899,
        rating: 4.4,
        reviews: 432,
        description: "Smart cooling technology, InstaView door, and Wi-Fi connectivity",
        image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=LG+Smart+Fridge"
    },
    {
        id: 9,
        name: "HP Spectre x360 14",
        category: "laptops",
        brand: "hp",
        price: 1599,
        rating: 4.5,
        reviews: 765,
        description: "2-in-1 convertible laptop with OLED display and long battery life",
        image: "https://via.placeholder.com/280x200/667eea/ffffff?text=HP+Spectre+x360"
    },
    {
        id: 10,
        name: "iPad Pro 12.9\"",
        category: "phones",
        brand: "apple",
        price: 1099,
        rating: 4.7,
        reviews: 1432,
        description: "Professional tablet with M2 chip, Liquid Retina XDR display",
        image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=iPad+Pro+12.9"
    },
    {
        id: 11,
        name: "Sony 75\" BRAVIA XR 4K TV",
        category: "tvs",
        brand: "sony",
        price: 1999,
        rating: 4.6,
        reviews: 876,
        description: "Cognitive processor XR, perfect for gaming and movies",
        image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Sony+BRAVIA+XR"
    },
    {
        id: 12,
        name: "Dell Inspiron 15",
        category: "laptops",
        brand: "dell",
        price: 799,
        rating: 4.3,
        reviews: 543,
        description: "Affordable laptop with good performance for everyday tasks",
        image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Dell+Inspiron+15"
    }
];

let cart = [];
let currentCategory = "all";

const productsGrid = document.getElementById("productsGrid");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");
const navLinks = document.querySelectorAll(".nav-link");
const brandFilters = document.querySelectorAll('.filter-group input[type="checkbox"]');
const ratingFilters = document.querySelectorAll('.filter-group input[type="radio"]');

document.addEventListener("DOMContentLoaded", () => {
    renderVisibleProducts();
    setupEventListeners();
});

function setupEventListeners() {
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            currentCategory = link.dataset.category;
            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            link.classList.add("active");
            renderVisibleProducts();
        });
    });

    searchBtn.addEventListener("click", renderVisibleProducts);
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            renderVisibleProducts();
        }
    });

    sortSelect.addEventListener("change", renderVisibleProducts);
    brandFilters.forEach((checkbox) => checkbox.addEventListener("change", renderVisibleProducts));
    ratingFilters.forEach((radio) => radio.addEventListener("change", renderVisibleProducts));

    document.querySelector(".cart-icon").addEventListener("click", openCart);
    document.querySelector(".close").addEventListener("click", closeCart);
    window.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    document.querySelector(".newsletter-form").addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Successfully subscribed to newsletter!", "success");
        e.target.reset();
    });

    document.querySelector(".checkout-btn").addEventListener("click", checkout);
    document.querySelector(".cta-button").addEventListener("click", () => {
        document.querySelector(".products-section").scrollIntoView({ behavior: "smooth" });
    });
}

function renderVisibleProducts() {
    renderProducts(getVisibleProducts());
}

function getVisibleProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedBrands = Array.from(brandFilters)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
    const selectedRating = document.querySelector('.filter-group input[type="radio"]:checked');
    const minRating = selectedRating ? Number(selectedRating.value) : 0;

    let filtered = [...products];

    if (currentCategory === "deals") {
        filtered = filtered.filter((product) => product.price < 1500);
    } else if (currentCategory !== "all") {
        filtered = filtered.filter((product) => product.category === currentCategory);
    }

    if (selectedBrands.length > 0) {
        filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    if (minRating > 0) {
        filtered = filtered.filter((product) => product.rating >= minRating);
    }

    if (searchTerm) {
        filtered = filtered.filter((product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    return getSortedProducts(filtered);
}

function getSortedProducts(productsToSort) {
    const sorted = [...productsToSort];

    switch (sortSelect.value) {
        case "price-low":
            sorted.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            sorted.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    return sorted;
}

function renderProducts(productsToRender) {
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products found</div>';
        return;
    }

    productsGrid.innerHTML = productsToRender
        .map((product) => `
            <article class="product-card" data-id="${product.id}">
                <div class="product-image-wrap">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <div class="product-meta">
                        <span class="product-badge">${product.category}</span>
                        <span class="product-rating-inline">${product.rating.toFixed(1)} ${generateStars(product.rating)}</span>
                    </div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div>
                            <div class="product-price">&#8377;${formatPrice(product.price)}</div>
                            <div class="rating-count">${product.reviews} reviews</div>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </article>
        `)
        .join("");
}

function generateStars(rating) {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number(price));
}

function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast(`${product.name} added to cart!`, "success");
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cartItems.innerHTML = cart
            .map((item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">&#8377;${formatPrice(item.price)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `)
            .join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = formatPrice(total);
}

function updateQuantity(productId, change) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
    showToast("Item removed from cart", "success");
}

function openCart() {
    cartModal.style.display = "block";
    updateCart();
}

function closeCart() {
    cartModal.style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    showToast(`Order placed successfully! Total: \u20B9${formatPrice(total)}`, "success");
    cart = [];
    updateCart();
    closeCart();
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
