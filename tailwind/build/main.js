document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Theme Toggle Logic ---
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

    // --- 2. Gallery Search Logic ---
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

    // --- 3. Subscribe Form Logic ---
const form = document.getElementById("subscribeForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent; // Save original "Subscribe" text

            // 1. Prevent double-clicking
            submitBtn.disabled = true;

            // 2. Create a GSAP Timeline for the sequence
            const tl = gsap.timeline();

            tl.to(submitBtn, {
                scale: 0.95, // Button presses inward
                duration: 0.1,
                ease: "power1.inOut"
            })
            .to(submitBtn, {
                scale: 1.05, // Button pops out slightly
                backgroundColor: "#166534", // Changes to a deeper success green (Tailwind green-800)
                duration: 0.3,
                ease: "back.out(2)", // Gives it a playful bounce
                onStart: () => {
                    submitBtn.textContent = "Subscribed! 🌿"; // Change the text during the pop
                }
            })
            .to(submitBtn, {
                scale: 1, // Settle back to normal size
                duration: 0.2
            })
            .to(submitBtn, {
                backgroundColor: "", // Clear inline color to return to Tailwind classes
                duration: 0.3,
                delay: 2.5, // Keep the success message visible for 2.5 seconds
                onComplete: () => {
                    // Reset everything back to normal
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset(); 
                }
            });
        });
    }

    // --- 4. GSAP Header Animation ---
    gsap.from("#my-heading", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
    });

    // --- 5. tsParticles Initialization ---
    window.tsParticles.load({
        id: "tsparticles",
        options: {
            background: { color: { value: "transparent" } },
            particles: {
                color: { value: "#ffffff" },
                number: { value: 50 },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: 5 },
                move: { enable: true, speed: 1 }
            }
        }
    });

});
// 1. Register the plugin
    gsap.registerPlugin(ScrollTrigger);

    // 2. Select all gallery images into an array
    const galleryImagesToAnimate = gsap.utils.toArray(".gallery-img");

    // 3. Loop through each image and give it its own specific animation trigger
    galleryImagesToAnimate.forEach((img) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,           
                start: "top 90%",       
                toggleActions: "play none none none",
            },
            y: 60,                      
            opacity: 0.5,                 
            duration: 0.1,              
            ease: "power2.in"    
        });
    });

document.fonts.ready.then(() => {
    gsap.set(".container", { opacity: 1 });
    
    const split = new SplitType(".animate-me", { types: "words" });

// GSAP
    gsap.from(split.words, {
        opacity: 0,
        y: 20, 
        duration: 1, 
        ease: "power2.out", 
        stagger: 0.3,
    });
});

