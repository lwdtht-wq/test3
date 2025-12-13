/* ==========================================================
   WORLD MAP SCRIPT — AUTO-GENERATE RELIGION DATA FOR ALL COUNTRIES
   Using ISO_A3 country codes (because your map uses iso_a3)
========================================================== */

const svg = d3.select("#worldMap");
const tooltip = d3.select("#mapTooltip");
const infoBox = document.getElementById("mapInfo");
const infoTitle = document.getElementById("infoTitle");
const infoContent = document.getElementById("infoContent");

/* ==========================================================
   FIXED DATA FOR CHINA (ISO3: CHN)
========================================================== */
const religionData = {
    "CHN": {
        name: "China",
        faiths: {
            "Cyber Oracle Network": "38%",
            "Quantum Throne Sect": "26%",
            "Psionic Union": "22%",
            "Echo Memory Cult": "14%"
        }
    }
};

/* ==========================================================
   RANDOM GENERATION FOR ALL OTHER COUNTRIES
========================================================== */
function generateRandomFaiths(iso3, countryName) {
    if (religionData[iso3]) return religionData[iso3];

    let r1 = Math.random();
    let r2 = Math.random();
    let r3 = Math.random();
    let r4 = Math.random();
    let total = r1 + r2 + r3 + r4;

    religionData[iso3] = {
        name: countryName,
        faiths: {
            "Cyber Oracle Network": Math.round((r1 / total) * 100) + "%",
            "Quantum Throne Sect": Math.round((r2 / total) * 100) + "%",
            "Psionic Union": Math.round((r3 / total) * 100) + "%",
            "Echo Memory Cult": Math.round((r4 / total) * 100) + "%"
        }
    };

    return religionData[iso3];
}

/* ==========================================================
   LOAD WORLD MAP
========================================================== */
Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
]).then(([world]) => {

    const countries = topojson.feature(world, world.objects.countries).features;

    // Mercator projection
    const projection = d3.geoMercator()
        .scale(125)
        .translate([400, 250]);

    const path = d3.geoPath().projection(projection);

    // Draw graticule
    const graticule = d3.geoGraticule();
    svg.append("path")
        .datum(graticule())
        .attr("class", "graticule")
        .attr("d", path);

    // Draw all countries
    svg.selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .on("mousemove", function (event, d) {
            const name = d.properties.name;
            tooltip.style("display", "block")
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 25 + "px")
                .html(name);
        })
        .on("mouseleave", () => {
            tooltip.style("display", "none");
        })
        .on("click", function (event, d) {
            const iso3 = d.properties.iso_a3;  // key fix
            const name = d.properties.name;

            const data = religionData[iso3] || generateRandomFaiths(iso3, name);

            infoTitle.textContent = data.name;

            let html = "";
            for (let f in data.faiths) {
                html += `<p><strong>${f}</strong>: ${data.faiths[f]}</p>`;
            }

            infoContent.innerHTML = html;
            infoBox.style.display = "block";
        });
});
