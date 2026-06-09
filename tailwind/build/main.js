// Wait for the HTML document to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {

    const themeBtn = document.getElementById("themeBtn");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        if (themeBtn) themeBtn.textContent = "☀️";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark");
            
            const isDark = document.documentElement.classList.contains("dark");
            themeBtn.textContent = isDark ? "☀️" : "🌙";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    const searchInput = document.getElementById("searchInput");
    const galleryImages = document.querySelectorAll(".gallery-img");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();

            galleryImages.forEach(img => {
                const altText = img.alt.toLowerCase();
                if (altText.includes(searchTerm)) {
                    img.classList.remove("hidden");
                } else {
                    img.classList.add("hidden");
                }
            });
        });
    }

    const form = document.getElementById("subscribeForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;

            alert(`Thank you for subscribing!\n${email}`);

            form.reset();
        });
    }

});