/* ==========================================================
   WORLD MAP SCRIPT — AUTO-GENERATE RELIGION DATA FOR ALL COUNTRIES
========================================================== */

const svg = d3.select("#worldMap");
const tooltip = d3.select("#mapTooltip");
const infoBox = document.getElementById("mapInfo");
const infoTitle = document.getElementById("infoTitle");
const infoContent = document.getElementById("infoContent");

/* ==========================================================
   EXPLICIT DATA FOR CHINA (WILL NOT BE RANDOMIZED)
========================================================== */
const religionData = {
    "China": {
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
   RANDOM GENERATOR FOR ALL OTHER COUNTRIES
========================================================== */

function generateRandomFaiths(countryName) {
    // Avoid regenerating if already created
    if (religionData[countryName]) return religionData[countryName];

    // Create 4 random numbers
    let a = Math.random();
    let b = Math.random();
    let c = Math.random();
    let d = Math.random();

    let total = a + b + c + d;

    const faiths = {
        "Cyber Oracle Network": Math.round((a / total) * 100) + "%",
        "Quantum Throne Sect": Math.round((b / total) * 100) + "%",
        "Psionic Union": Math.round((c / total) * 100) + "%",
        "Echo Memory Cult": Math.round((d / total) * 100) + "%"
    };

    religionData[countryName] = {
        name: countryName,
        faiths: faiths
    };

    return religionData[countryName];
}

/* ==========================================================
   LOAD WORLD MAP
========================================================== */
Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
]).then(([world]) => {

    const projection = d3.geoMercator()
        .scale(120)
        .translate([400, 250]);

    const path = d3.geoPath().projection(projection);

    const graticule = d3.geoGraticule();

    // Draw graticule
    svg.append("path")
        .datum(graticule())
        .attr("class", "graticule")
        .attr("d", path);

    const countries = topojson.feature(world, world.objects.countries).features;

    // Draw countries
    svg.selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .on("mousemove", function (event, d) {
            const name = d.properties.name || "Unknown";

            tooltip.style("display", "block")
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px")
                .html(name);
        })
        .on("mouseleave", () => {
            tooltip.style("display", "none");
        })
        .on("click", function (event, d) {
            const name = d.properties.name;

            // Get existing or generate new random data
            const data = religionData[name] || generateRandomFaiths(name);

            infoTitle.textContent = data.name;

            let html = "";
            for (let f in data.faiths) {
                html += `<p><strong>${f}</strong>: ${data.faiths[f]}</p>`;
            }

            infoContent.innerHTML = html;
            infoBox.style.display = "block";
        });
});
