/* ==========================================================
   GLOBAL PAGE ENTRY ANIMATION – Index Page Only
========================================================== */
function enterWorld() {
    const opening = document.querySelector(".opening-screen");
    const nav = document.getElementById("sideNav");
    const homeContent = document.getElementById("homeContent");

    if (!opening || !nav || !homeContent) return;

    opening.style.transition = "1.2s";
    opening.style.opacity = "0";

    setTimeout(() => {
        opening.style.display = "none";

        nav.classList.remove("hidden");
        homeContent.classList.remove("hidden");

        nav.style.opacity = "1";
        homeContent.style.opacity = "1";
    }, 1200);
}


/* ==========================================================
   SHOW NAV ON ALL NORMAL PAGES
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("sideNav");

    // ⬅ 安全检查，避免首页隐藏状态残留
    if (nav) {
        nav.classList.remove("hidden");
        nav.style.opacity = "1";
    }

    /* Page fade-in */
    const contentPanels = document.querySelectorAll(".page-panel, .story-text");

    contentPanels.forEach(panel => {
        panel.style.opacity = 0;
        panel.style.transform = "translateY(30px)";
    });

    setTimeout(() => {
        contentPanels.forEach(panel => {
            panel.style.transition = "1.1s ease-out";
            panel.style.opacity = 1;
            panel.style.transform = "translateY(0)";
        });
    }, 300);

    /* Tooltip container */
    const tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);

    /* =====================================================
       INIT PAGE 3 MAP — FIXED (no errors if file missing)
    ====================================================== */
    if (typeof worldMapInit === "function") {
        worldMapInit();
    }
});


/* ==========================================================
   D3 TOOLTIP DOTS
========================================================== */
function enableChartTooltip(svg, data, xScale, yScale, keyName) {
    const tooltip = document.querySelector(".chart-tooltip");
    if (!tooltip) return;

    svg.selectAll(".dot-" + keyName)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot-" + keyName)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d[keyName]))
        .attr("r", 6)
        .attr("fill", "#4af1ff")
        .attr("stroke", "#fff")
        .style("cursor", "pointer")
        .on("mousemove", (event, d) => {
            tooltip.style.display = "block";
            tooltip.style.left = event.pageX + "px";
            tooltip.style.top = event.pageY - 20 + "px";
            tooltip.innerHTML = `
                <strong>${keyName}</strong><br>
                Year: ${d.year}<br>
                Value: ${d[keyName]}%
            `;
        })
        .on("mouseleave", () => {
            tooltip.style.display = "none";
        });
}


/* ==========================================================
   PAGE 3 MAP INTERACTION (USED BY worldMapInit)
========================================================== */
function showRegionInfo(regionName) {
    const box = document.getElementById("mapInfo");
    const title = document.getElementById("infoTitle");
    const content = document.getElementById("infoContent");

    if (!box || !title || !content) return;

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
        }
    };

    const data = regionData[regionName];
    if (!data) return;

    title.textContent = data.name;

    let html = "";
    for (let f in data.faiths) {
        html += `<p><strong>${f}</strong>: ${data.faiths[f]}</p>`;
    }
    content.innerHTML = html;

    box.style.display = "block";
}


/* ==========================================================
   OPTIONAL MOUSE LIGHT EFFECT
========================================================== */
document.addEventListener("mousemove", (e) => {
    const ripple = document.querySelector(".ripple");
    if (ripple) {
        ripple.style.left = e.clientX + "px";
        ripple.style.top = e.clientY + "px";
    }
});
