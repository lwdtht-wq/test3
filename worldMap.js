/* ==========================================================
   WORLD MAP SCRIPT — WITH COUNTRY DATA
   Now supports hover country name + click to show religion stats
========================================================== */

const svg = d3.select("#worldMap");
const tooltip = d3.select("#mapTooltip");
const infoBox = document.getElementById("mapInfo");
const infoTitle = document.getElementById("infoTitle");
const infoContent = document.getElementById("infoContent");

/* ==========================================================
   FAKE RELIGION DATA FOR SELECTED COUNTRIES
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
    },
    "United States": {
        name: "United States",
        faiths: {
            "Cyber Oracle Network": "31%",
            "Quantum Throne Sect": "29%",
            "Psionic Union": "25%",
            "Echo Memory Cult": "15%"
        }
    },
    "Brazil": {
        name: "Brazil",
        faiths: {
            "Cyber Oracle Network": "22%",
            "Quantum Throne Sect": "33%",
            "Psionic Union": "28%",
            "Echo Memory Cult": "17%"
        }
    },
    "India": {
        name: "India",
        faiths: {
            "Cyber Oracle Network": "28%",
            "Quantum Throne Sect": "21%",
            "Psionic Union": "34%",
            "Echo Memory Cult": "17%"
        }
    },
    "Australia": {
        name: "Australia",
        faiths: {
            "Cyber Oracle Network": "35%",
            "Quantum Throne Sect": "24%",
            "Psionic Union": "20%",
            "Echo Memory Cult": "21%"
        }
    }
};

/* ==========================================================
   LOAD WORLD MAP WITH D3
========================================================== */
Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
]).then(([world]) => {

    const projection = d3.geoMercator()
        .scale(120)
        .translate([400, 250]);

    const path = d3.geoPath().projection(projection);

    const graticule = d3.geoGraticule();

    // Draw graticule (latitude/longitude lines)
    svg.append("path")
        .datum(graticule())
        .attr("class", "graticule")
        .attr("d", path);

    // Draw countries
    const countries = topojson.feature(world, world.objects.countries).features;

    svg.selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .on("mousemove", function (event, d) {

            const countryName = d.properties.name || "Unknown";

            tooltip.style("display", "block")
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px")
                .html(countryName);

        })
        .on("mouseleave", () => {
            tooltip.style("display", "none");
        })
        .on("click", function (event, d) {

            const countryName = d.properties.name;

            if (religionData[countryName]) {

                const data = religionData[countryName];
                infoTitle.textContent = data.name;

                let html = "";
                for (let f in data.faiths) {
                    html += `<p><strong>${f}</strong>: ${data.faiths[f]}</p>`;
                }
                infoContent.innerHTML = html;

                infoBox.style.display = "block";

            } else {

                infoTitle.textContent = countryName;
                infoContent.innerHTML = `
                    <p>No techno-spiritual data available.</p>
                `;
                infoBox.style.display = "block";
            }
        });
});
