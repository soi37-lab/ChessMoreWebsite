const products = [
    {
        id: 1,
        name: "ChessMore Bag",
        image: "C:\Users\User\Desktop\ChessMoreWebsite\client\images\ChessMore Inaugural\thayumerchandise.jpeg",
        price: 15.99,
        description: "High-quality ChessMore branded Bag."
    },
    {
        id: 2,
        name: "ChessMore Cap",
        image: "C:\Users\User\Desktop\ChessMoreWebsite\client\images\ChessMore Inaugural\thayumerchandise.jpeg",
        price: 9.99,
        description: "Stylish ChessMore branded cap."
    },
    {
        id: 3,
        name: "Chess Set",
        image: "C:\Users\User\Desktop\ChessMoreWebsite\client\images\ChessMore Inaugural\thayumerchandise.jpeg",
        price: 25.99,
        description: "Premium Chess Set with ChessMore branding."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
});
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");

    if (!productGrid) {
        console.error("Product grid not found.");
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
});

