const canvas = document.getElementById("fluidMap");
const ctx = canvas.getContext("2d");

canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.display = "block";
canvas.style.position = "relative";

// match internal resolution for sharpness
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let regions = [
    { name: "North Dominion", color: "rgba(120,180,255,0.55)", x: 0.25, y: 0.35, r: 110 },
    { name: "East Luminance", color: "rgba(0,120,255,0.55)", x: 0.65, y: 0.38, r: 115 },
    { name: "South Alloy Basin", color: "rgba(60,210,215,0.55)", x: 0.45, y: 0.68, r: 130 },
    { name: "West Iron Frontier", color: "rgba(140,90,255,0.55)", x: 0.18, y: 0.58, r: 120 },
    { name: "Core Nexus", color: "rgba(200,160,255,0.55)", x: 0.48, y: 0.50, r: 95 }
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    regions.forEach(r => {
        ctx.beginPath();
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 25;
        ctx.shadowColor = r.color.replace("0.55", "1");
        ctx.arc(r.x * canvas.width, r.y * canvas.height, r.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let hit = null;

    regions.forEach(r => {
        const dx = mx - r.x * canvas.width;
        const dy = my - r.y * canvas.height;
        if (dx * dx + dy * dy <= r.r * r.r) {
            hit = r;
        }
    });

    const info = document.getElementById("mapInfo");

    if (hit) {
        info.style.display = "block";
        info.style.left = (mx + 20) + "px";
        info.style.top = (my + 20) + "px";

        document.getElementById("infoTitle").textContent = hit.name;
        document.getElementById("infoContent").innerHTML =
            `<p>Projected dominant belief clusters in this region by 2150.</p>`;
    } else {
        info.style.display = "none";
    }
});

