
// ======================================
// 1. LIVE CLOCK AND DATE
// ======================================

const clock = document.getElementById("live-clock");
const date = document.getElementById("live-date");

function updateClock() {

    const now = new Date();

    clock.textContent = now.toLocaleTimeString("fr-DZ");

    date.textContent = now.toLocaleDateString("fr-DZ", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

updateClock();
setInterval(updateClock, 1000);


// ======================================
// 2. DARK / LIGHT MODE
// ======================================

const themeButton = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("newspaper-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");

    themeButton.textContent = isDark
        ? "☀️ Mode clair"
        : "🌙 Mode nuit";

    themeButton.setAttribute("aria-pressed", isDark);
}

updateThemeButton();

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "newspaper-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});


// ======================================
// 3. DYNAMIC HEADLINE TICKER
// ======================================

const headlines = [

    "Découvrez les trésors de Bab El Oued !",

    "Un quartier au cœur de l'histoire d'Alger.",

    "Sur les traces de la Régence ottomane.",

    "La Méditerranée : un spectacle à ciel ouvert.",

    "Marchés, traditions et vie quotidienne.",

    "Bab El Oued : une identité algéroise unique !"

];

const ticker = document.getElementById("headline-ticker");

let headlineIndex = 0;

setInterval(() => {

    ticker.classList.add("fade-out");

    setTimeout(() => {

        headlineIndex =
            (headlineIndex + 1) % headlines.length;

        ticker.textContent = headlines[headlineIndex];

        ticker.classList.remove("fade-out");

    }, 300);

}, 4000);


// ======================================
// 4. READING PROGRESS BAR
// ======================================

const progressFill = document.getElementById("progress-fill");

function updateProgress() {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    progressFill.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgress);

updateProgress();


// ======================================
// 5. ACTIVE NAVIGATION
// ======================================

const sections = document.querySelectorAll("main section");

const navLinks = document.querySelectorAll("header nav a");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    threshold: 0.3
});

sections.forEach(section => {

    if (section.id) {
        observer.observe(section);
    }

});


// ======================================
// 6. BACK TO TOP
// ======================================

const topButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.classList.add("visible");

    } else {

        topButton.classList.remove("visible");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================================
// 7. WELCOME MESSAGE
// ======================================

console.log(
    "Bienvenue au Courrier d'Alger ! 🇩🇿"
);
