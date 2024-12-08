document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("cart-item");

        itemRow.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        cartItems.appendChild(itemRow);
    });

    document.getElementById("checkout").addEventListener("click", () => {
        alert("Proceeding to checkout...");
        // Add payment integration here
    });
});
