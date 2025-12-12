/* ==========================================================
   OPENING SCREEN HANDLER
========================================================== */
function enterWorld() {
    console.log("enterWorld() triggered");

    const screen = document.querySelector(".opening-screen");
    const nav = document.getElementById("sideNav");
    const home = document.getElementById("homeContent");

    if (!screen) {
        console.error("ERROR: .opening-screen not found");
        return;
    }

    screen.style.transition = "opacity 0.8s ease";
    screen.style.opacity = "0";

    setTimeout(() => {
        screen.style.display = "none";

        if (nav) nav.classList.remove("hidden");
        if (home) home.classList.remove("hidden");

        console.log("World Entered.");
    }, 900);
}

/* ==========================================================
   FIX: Prevent ripple & background blocking clicks
========================================================== */
document.addEventListener("mousemove", (e) => {
    const ripple = document.querySelector(".ripple");
    if (!ripple) return;
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
});

/* ==========================================================
   PAGE 1 — FAITH LINE CHART
========================================================== */
if (document.getElementById("futureFaithChart")) {
    const ctx = document.getElementById("futureFaithChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["2010", "2030", "2050", "2080", "2120", "2150"],
            datasets: [
                {
                    label: "Cyber Oracle",
                    data: [5, 14, 26, 40, 55, 70],
                    borderColor: "#4af1ff",
                    tension: 0.35,
                    borderWidth: 3,
                    pointRadius: 5
                },
                {
                    label: "Quantum Throne",
                    data: [0, 6, 18, 32, 49, 65],
                    borderColor: "#8b7bff",
                    tension: 0.35,
                    borderWidth: 3,
                    pointRadius: 5
                },
                {
                    label: "Psionic Union",
                    data: [3, 10, 20, 31, 45, 58],
                    borderColor: "#48ffa8",
                    tension: 0.35,
                    borderWidth: 3
                },
                {
                    label: "Echo Memory Cult",
                    data: [1, 4, 12, 21, 30, 40],
                    borderColor: "#ffc1fa",
                    tension: 0.35,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: { labels: { color: "#d6eaff" } }
            },
            scales: {
                x: { ticks: { color: "#a9ddff" } },
                y: { ticks: { color: "#a9ddff" } }
            }
        }
    });
}

/* ==========================================================
   PAGE 2 — NEW RELIGION BAR CHART
========================================================== */
if (document.getElementById("newReligionChart")) {
    const ctx2 = document.getElementById("newReligionChart").getContext("2d");

    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Cyber Oracle", "Quantum Throne", "Psionic Union", "Echo Memory Cult"],
            datasets: [{
                label:
