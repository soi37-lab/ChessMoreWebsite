// gallery.js
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".event-button");
    const galleries = document.querySelectorAll(".gallery");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Hide all galleries
            galleries.forEach((gallery) => gallery.classList.remove("active"));

            // Show the clicked gallery
            const eventId = button.getAttribute("data-event");
            const targetGallery = document.getElementById(eventId);
            if (targetGallery) {
                targetGallery.classList.add("active");
            }
        });
    });
});
