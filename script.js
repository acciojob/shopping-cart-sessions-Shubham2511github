// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Check if cart data exists in session storage and retrieve it
let cartData = sessionStorage.getItem("cartData");
if (cartData) {
  cartData = JSON.parse(cartData);
} else {
  cartData = [];
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	 // Clear existing cart list
  cartList.innerHTML = "";

  // Iterate over the cart items and create list items
  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
	const product = products.find((p) => p.id === productId);
  const existingItem = cartData.find((item) => item.id === productId);

  if (product && !existingItem) {
    cartData.push(product);
    // Update session storage with the updated cart data
    sessionStorage.setItem("cartData", JSON.stringify(cartData));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
	 const index = cartData.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cartData.splice(index, 1);
    // Update session storage with the updated cart data
    sessionStorage.setItem("cartData", JSON.stringify(cartData));
    renderCart();
  }
}

// Clear cart
function clearCart() {
	cartData = [];
  // Remove cart data from session storage
  sessionStorage.removeItem("cartData");
  renderCart();
}
// Add event listener to product list for add-to-cart buttons
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

// Add event listener to cart list for remove-from-cart buttons
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    removeFromCart(productId);
  }
});

// Add event listener to the clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
