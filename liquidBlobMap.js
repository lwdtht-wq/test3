/* ==========================================================
   Liquid Blob World Map (5 Fluid Regions)
========================================================== */

const canvas = document.getElementById("fluidMap");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let time = 0;

/* ==========================================================
   REGION DEFINITIONS (5 BLOBS)
========================================================== */

const regions = [
    { 
        name: "North Dominion",
        color: "rgba(74, 241, 255, 0.55)",
        x: 300, y: 120, r: 120,
        id: "north"
    },
    { 
        name: "East Luminance",
        color: "rgba(255, 71, 235, 0.55)",
        x: 550, y: 220, r: 130,
        id: "east"
    },
    { 
        name: "South Alloy Basin",
        color: "rgba(255, 180, 60, 0.55)",
        x: 350, y: 360, r: 150,
        id: "south"
    },
    { 
        name: "West Iron Frontier",
        color: "rgba(120, 255, 110, 0.55)",
        x: 150, y: 260, r: 130,
        id: "west"
    },
    { 
        name: "Central Core",
        color: "rgba(180, 110, 255, 0.55)",
        x: 350, y: 240, r: 90,
        id: "central"
    }
];

/* Region Data */
const regionData = {
  north: {
    name: "North Dominion",
    faiths: {
        "Cyber Oracle": "42%",
        "Psionic Union": "27%",
        "Quantum Throne": "18%",
        "Echo Memory Cult": "13%"
    }
  },
  east: {
    name: "East Luminance",
    faiths: {
        "Quantum Throne": "46%",
        "Cyber Oracle": "30%",
        "Psionic Union": "19%",
        "Echo Memory Cult": "5%"
    }
  },
  south: {
    name: "South Alloy Basin",
    faiths: {
        "Psionic Union": "51%",
        "Echo Memory Cult": "29%",
        "Quantum Throne": "14%",
        "Cyber Oracle": "6%"
    }
  },
  west: {
    name: "West Iron Frontier",
    faiths: {
        "Echo Memory Cult": "43%",
        "Cyber Oracle": "28%",
        "Quantum Throne": "21%",
        "Psionic Union": "8%"
    }
  },
  central: {
    name: "Central Core",
    faiths: {
        "Cyber Oracle": "40%",
        "Echo Memory Cult": "30%",
        "Psionic Union": "20%",
        "Quantum Throne": "10%"
    }
  }
};

/* ==========================================================
   DRAW FLUID BLOB (Via Simplex Noise Simulation)
========================================================== */

function drawBlob(region, t) {
    ctx.beginPath();
    const steps = 80;

    for (let i = 0; i <= steps; i++) {
        const angle = (Math.PI * 2 / steps) * i;

        const noise = Math.sin(i * 0.3 + t * 0.02) * 15 +
                      Math.cos(i * 0.5 + t * 0.03) * 10;

        const r = region.r + noise;

        const x = region.x + Math.cos(angle) * r;
        const y = region.y + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fillStyle = region.color;
    ctx.fill();
}

/* ==========================================================
   HOVER DETECTION
========================================================== */

function checkHover(mx, my) {
    for (let r of regions) {
        const dx = mx - r.x;
        const dy = my - r.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < r.r * 1.1) return r; // approx hit area
    }
    return null;
}

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const target = checkHover(mouseX, mouseY);

    const box = document.getElementById("mapInfo");

    if (target) {
        const data = regionData[target.id];

        box.style.display = "block";
        box.style.left = (mouseX + 20) + "px";
        box.style.top = (mouseY + 20) + "px";

        document.getElementById("infoTitle").textContent = data.name;

        let html = "";
        for (let f in data.faiths) {
            html += `<p><strong>${f}</strong>: ${data.faiths[f]}</p>`;
        }
        document.getElementById("infoContent").innerHTML = html;
    } else {
        box.style.display = "none";
    }
});

/* ==========================================================
   ANIMATION LOOP
========================================================== */

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    time++;

    regions.forEach(r => drawBlob(r, time));

    requestAnimationFrame(animate);
}

animate();
