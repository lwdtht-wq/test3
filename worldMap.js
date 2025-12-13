/* ==========================================================
   CYBER FAITH WORLD MAP — REAL CONTINENTS + HOVER DATA
========================================================== */

const svg = d3.select("#worldMap");
const width = 1000;
const height = 520;

svg.attr("width", width).attr("height", height);

/* ==========================================================
   PROJECTION + PATH
========================================================== */

const projection = d3.geoMercator()
    .scale(150)
    .translate([width / 2, height / 1.45]);

const path = d3.geoPath().projection(projection);

/* ==========================================================
   CONTINENT COLORS (FLUID GLOW STYLE)
========================================================== */
const regionColors = {
    "Asia":      "rgba(74,241,255,0.55)",
    "North America": "rgba(255,61,242,0.55)",
    "Europe":    "rgba(140,199,255,0.55)",
    "Africa":    "rgba(255,180,80,0.55)",
    "South America": "rgba(80,255,140,0.55)"
};

const regionGlow = {
    "Asia": "#4af1ff",
    "North America": "#ff3df2",
    "Europe": "#8cc7ff",
    "Africa": "#ffb347",
    "South America": "#7dffb0"
};

/* ==========================================================
   2150 RELIGION DATA — OPTION A (五大洲)
========================================================== */

const religionData = {
    "Asia": {
        "Quantum Throne": "69%",
        "Cyber Oracle": "17%",
        "Psionic Union": "8%",
        "Echo Memory Cult": "6%"
    },
    "North America": {
        "Cyber Oracle": "72%",
        "Quantum Throne": "14%",
        "Echo Memory Cult": "9%",
        "Psionic Union": "5%"
    },
    "Europe": {
        "Echo Memory Cult": "61%",
        "Cyber Oracle": "19%",
        "Quantum Throne": "11%",
        "Psionic Union": "9%"
    },
    "Africa": {
        "Psionic Union": "58%",
        "Echo Memory Cult": "22%",
        "Cyber Oracle": "11%",
        "Quantum Throne": "9%"
    },
    "South America": {
        "Echo Memory Cult": "47%",
        "Psionic Union": "33%",
        "Quantum Throne": "12%",
        "Cyber Oracle": "8%"
    }
};

/* ==========================================================
   TOOLTIP
========================================================== */
const tooltip = document.getElementById("mapTooltip");

/* ==========================================================
   LOAD WORLD MAP
========================================================== */
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(world => {

    const countries = topojson.feature(world, world.objects.countries).features;

    /* ======================= Draw Graticule (经纬网格) ======================= */
    const graticule = d3.geoGraticule();
    svg.append("path")
        .datum(graticule())
        .attr("class", "graticule")
        .attr("d", path);

    /* ======================= Load Continent Data ======================= */
    d3.json("https://raw.githubusercontent.com/lwdtht-wq/test3/main/continents.json")
      .then(continentData => {

        svg.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", d => {
                const cont = continentData[d.id];
                return regionColors[cont] || "#333";
            })
            .attr("stroke", d => {
                const cont = continentData[d.id];
                return regionGlow[cont] || "#555";
            })
            .attr("stroke-width", 1.3)
            .on("mousemove", (event, d) => {
                const cont = continentData[d.id];
                if (!cont) return;

                tooltip.style.display = "block";
                tooltip.style.left = event.pageX + 15 + "px";
                tooltip.style.top = event.pageY - 10 + "px";

                let html = `<strong>${cont}</strong><br>`;
                let faiths = religionData[cont];
                for (let k in faiths) {
                    html += `${k}: ${faiths[k]}<br>`;
                }

                tooltip.innerHTML = html;
            })
            .on("mouseleave", () => {
                tooltip.style.display = "none";
            });
      });
  });
