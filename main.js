/* ==========================================================
   HIDE NAV ONLY ON INDEX PAGE (GitHub Pages Safe Version)
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("sideNav");
    if (!nav) return;

    const path = window.location.pathname;

    const isIndex =
        path === "/" ||
        path.endsWith("/index.html") ||
        path.endsWith("/test3/") ||
        path.endsWith("/test3/index.html");

    if (isIndex) {
        nav.classList.add("hidden");
    }
});

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
    if (nav) {
        const path = window.location.pathname;

        const isIndex =
            path === "/" ||
            path.endsWith("/index.html") ||
            path.endsWith("/test3/") ||
            path.endsWith("/test3/index.html");

        if (!isIndex) {
            nav.classList.remove("hidden");
            nav.style.opacity = "1";
        }
    }

    /* Page fade-in animation */
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

    /* Tooltip preparation */
    const tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);

    /* Initialize Page3 World Map (if JS file loaded) */
    if (typeof worldMapInit === "function") {
        worldMapInit();
    }
});

/* ==========================================================
   D3 LINE/BAR TOOLTIP (Used in Page1 & Page2)
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
   ❌ REMOVED: showRegionInfo() — no longer used
   (This function caused the map to update only once)
========================================================== */

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
