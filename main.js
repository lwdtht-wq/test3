/* ==========================================================
   OPENING SCREEN HANDLER
========================================================== */
function enterWorld() {
    document.querySelector(".opening-screen").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".opening-screen").style.display = "none";
        document.getElementById("sideNav").classList.remove("hidden");
        document.getElementById("homeContent")?.classList.remove("hidden");
    }, 800);
}

/* ==========================================================
   PAGE1 — FUTURE FAITH LINE CHART
========================================================== */
if (document.getElementById("futureFaithChart")) {

    const ctx = document.getElementById("futureFaithChart").getContext("2d");

    new Chart(ctx, {
        type: 'line',
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
                },
                {
                    label: "Traditional Faiths",
                    data: [85, 75, 60, 49, 40, 32],
                    borderColor: "#ffaa55",
                    tension: 0.35,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: { color: "#d6eaff" }
                }
            },
            scales: {
                x: { ticks: { color: "#a9ddff" }},
                y: { ticks: { color: "#a9ddff" }}
            }
        }
    });
}

/* ==========================================================
   PAGE2 — NEW RELIGION BAR CHART
========================================================== */
if (document.getElementById("newReligionChart")) {

    const ctx2 = document.getElementById("newReligionChart").getContext("2d");

    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["Cyber Oracle", "Quantum Throne", "Psionic Union", "Echo Memory Cult"],
            datasets: [{
                label: "Global Followers (Millions)",
                backgroundColor: ["#4af1ff", "#7d4bff", "#48ffa8", "#ffc1fa"],
                data: [320, 280, 240, 110]
            }]
        },
        options: {
            plugins: {
                legend: { labels: { color: "#d6eaff" }}
            },
            scales: {
                x: { ticks: { color: "#a9ddff" }},
                y: { ticks: { color: "#a9ddff" }}
            }
        }
    });
}

/* ==========================================================
   PAGE3 — LIQUID METAL MAP INTERACTION
========================================================== */
const regionColors = {
    north:  "#5ab4ff",
    east:   "#0077ff",
    south:  "#3bc6d4",
    west:   "#7d4bff",
    core:   "#75bfff"
};

function clearActiveRegions() {
    document.querySelectorAll(".region").forEach(r => r.classList.remove("active"));
}

function showRegionInfo(regionName) {
    const info = document.getElementById("mapInfo");
    const title = document.getElementById("infoTitle");
    const content = document.getElementById("infoContent");

    clearActiveRegions();
    document.getElementById(regionName).classList.add("active");

    info.classList.remove("dynamic-core", "dynamic-north", "dynamic-east", "dynamic-south", "dynamic-west");
    info.classList.add("dynamic-" + regionName);

    const data = {
        north: {
            name: "North Crown",
            values: {
                "Cyber Oracle": "42%",
                "Psionic Union": "27%",
                "Quantum Throne": "18%",
                "Echo Memory Cult": "13%"
            }
        },
        east: {
            name: "East Shard",
            values: {
                "Quantum Throne": "49%",
                "Cyber Oracle": "31%",
                "Psionic Union": "14%",
                "Echo Memory Cult": "6%"
            }
        },
        south: {
            name: "South Rift",
            values: {
                "Psionic Union": "53%",
                "Echo Memory Cult": "22%",
                "Cyber Oracle": "15%",
                "Quantum Throne": "10%"
            }
        },
        west: {
            name: "West Fragment",
            values: {
                "Echo Memory Cult": "47%",
                "Cyber Oracle": "26%",
                "Quantum Throne": "19%",
                "Psionic Union": "8%"
            }
        },
        core: {
            name: "Central Core",
            values: {
                "Cyber Oracle": "35%",
                "Quantum Throne": "35%",
                "Psionic Union": "20%",
                "Echo Memory Cult": "10%"
            }
        }
    };

    title.textContent = data[regionName].name;

    let html = "";
    for (let key in data[regionName].values) {
        html += `<p><strong>${key}</strong>: ${data[regionName].values[key]}</p>`;
    }

    content.innerHTML = html;
    info.style.display = "block";
}
