/* ==========================================================
   LIQUID WORLD MAP — 5 REGIONS · FLUID BLOBS · INTERACTIVE
   For: https://lwdtht-wq.github.io/test3/page3.html
   Author: ChatGPT custom build for Lanli (李澜)
========================================================== */

const canvas = document.getElementById("liquidMap");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 620; // fixed height for consistency
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ==========================================================
   WORLD REGIONS — 5 ORGANIC BLOBS
   Each region has: color · label · description · center position
========================================================== */
const regions = [
    {
        id: "north",
        label: "Northern Emergence Zone",
        desc: "A region shaped by adaptive AI traditions and emergent techno-rituals.",
        color: "#4af1ff",
        cx: 400, cy: 180
    },
    {
        id: "south",
        label: "Southern Alloy Basin",
        desc: "Known for hybrid belief systems combining biology and machine symbiosis.",
        color: "#ff3df2",
        cx: 420, cy: 380
    },
    {
        id: "east",
        label: "Eastern Luminance Belt",
        desc: "A bright cultural sphere guided by predictive quantum doctrines.",
        color: "#a6ff4a",
        cx: 650, cy: 280
    },
    {
        id: "west",
        label: "Western Iron Frontier",
        desc: "A territory built on resilience, memory reconstruction, and metallic faith.",
        color: "#ffb84a",
        cx: 180, cy: 260
    },
    {
        id: "core",
        label: "Central Synapse Realm",
        desc: "The heart of collective consciousness, where all faith streams converge.",
        color: "#8c7bff",
        cx: 400, cy: 280
    }
];

/* ==========================================================
   BLOB POINT GENERATION (Each region = soft organic shape)
========================================================== */
function generateBlobPoints(cx, cy, radius, count = 32) {
    const pts = [];
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        pts.push({
            angle,
            baseRadius: radius,
            offset: Math.random() * 20,
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius
        });
    }
    return pts;
}

/* Add blob points to each region */
regions.forEach(r => {
    r.points = generateBlobPoints(r.cx, r.cy, 80 + Math.random() * 30);
});

/* ==========================================================
   MOUSE INTERACTION
========================================================== */
const mouse = { x: 0, y: 0, active: false };
canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
});
canvas.addEventListener("mouseleave", () => mouse.active = false);

/* ==========================================================
   DRAW BLOB (region shape)
========================================================== */
function drawBlob(region) {
    const pts = region.points;

    // animate organic wobble
    pts.forEach((p, i) => {
        p.offset += 0.04;
        const wobble = Math.sin(p.offset) * 4;

        p.x = region.cx + Math.cos(p.angle) * (p.baseRadius + wobble);
        p.y = region.cy + Math.sin(p.angle) * (p.baseRadius + wobble);

        // mouse interaction: pull blob edge
        if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                const pull = (120 - dist) * 0.15;
                p.x += dx / dist * pull;
                p.y += dy / dist * pull;
            }
        }
    });

    // soft filled shape
    ctx.beginPath();
    ctx.fillStyle = region.color + "44"; // transparent fill
    ctx.strokeStyle = region.color;
    ctx.lineWidth = 2;

    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const cx = (prev.x + curr.x) / 2;
        const cy = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
    }
    // close the loop
    const last = pts[pts.length - 1];
    const first = pts[0];
    const cx = (last.x + first.x) / 2;
    const cy = (last.y + first.y) /2;
    ctx.quadraticCurveTo(last.x, last.y, cx, cy);

    ctx.fill();
    ctx.stroke();
}

/* ==========================================================
   HOVER DETECTION (point-in-path check)
========================================================== */
function detectHover(region) {
    ctx.beginPath();
    region.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    return ctx.isPointInPath(mouse.x, mouse.y);
}

/* ==========================================================
   MAIN ANIMATION LOOP
========================================================== */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGridLines();

    let hovered = null;

    regions.forEach(region => {
        drawBlob(region);
        if (mouse.active && detectHover(region)) {
            hovered = region;
        }
    });

    updateInfoPanel(hovered);

    requestAnimationFrame(animate);
}
animate();

/* ==========================================================
   INFO PANEL (Top Layer)
========================================================== */
const infoPanel = document.getElementById("mapInfo");
const infoTitle = document.getElementById("infoTitle");
const infoDetails = document.getElementById("infoDetails");

function updateInfoPanel(region) {
    if (!region) {
        infoPanel.style.opacity = 0;
        return;
    }

    infoTitle.textContent = region.label;
    infoDetails.textContent = region.desc;

    infoPanel.style.opacity = 1;
    infoPanel.style.left = mouse.x + 20 + "px";
    infoPanel.style.top = mouse.y + 20 + "px";
}

/* ==========================================================
   WORLD GRIDLINES (Lat/Lon reference)
========================================================== */
function drawGridLines() {
    ctx.strokeStyle = "rgba(120,140,170,0.2)";
    ctx.lineWidth = 1;

    // vertical lines
    for (let x = 50; x < canvas.width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // horizontal lines
    for (let y = 50; y < canvas.height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}


