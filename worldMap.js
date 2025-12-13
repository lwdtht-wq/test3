/* ==========================================================
   REAL EARTH MAP WITH HOVER + CLICK RELIGION DATA
========================================================== */

const svg = d3.select("#worldMap");
const tooltip = d3.select("#mapTooltip");
const infoBox = document.getElementById("mapInfo");
const infoTitle = document.getElementById("infoTitle");
const infoContent = document.getElementById("infoContent");

const width = 900;
const height = 520;

// Centered map projection
const projection = d3.geoNaturalEarth1()
    .scale(170)
    .translate([width / 2, height / 2]);

const path = d3.geoPath(projection);

// Create SVG size
svg.attr("viewBox", `0 0 ${width} ${height}`);

/* ==========================================================
   LOAD WORLD MAP
========================================================== */

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(worldData => {
        const countries = topojson.feature(worldData, worldData.objects.countries).features;

        // Draw graticule (经纬线)
        const graticule = d3.geoGraticule();

        svg.append("path")
            .attr("class", "graticule")
            .attr("d", path(graticule()));

        // Draw countries
        svg.selectAll("path.country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)
            .on("mousemove", function (event, d) {
                const [x, y] = d3.pointer(event);

                tooltip.style("display", "block")
                    .style("left", x + 15 + "px")
                    .style("top", y + "px")
                    .html(getCountryName(d));

                d3.select(this).style("stroke-width", "2.2");
            })
            .on("mouseleave", function () {
                tooltip.style("display", "none");
                d3.select(this).style("stroke-width", "1");
            })
            .on("click", function (event, d) {
                const country = getCountryName(d);
                const data = getFaithData(country);

                infoTitle.textContent = country;
                infoContent.innerHTML = data;
                infoBox.style.display = "block";
            });
    });


/* ==========================================================
   COUNTRY NAME HELPERS
========================================================== */

function getCountryName(feature) {
    return feature.properties.name || "Unknown";
}

/* ==========================================================
   RELIGION DATA PER COUNTRY (YOU CAN EDIT FREELY)
========================================================== */

function getFaithData(country) {
    const sample = {
        "China": {
            "Cyber Oracle": "40%",
            "Quantum Throne": "35%",
            "Psionic Union": "20%",
            "Echo Memory Cult": "5%"
        },
        "United States": {
            "Cyber Oracle": "55%",
            "Quantum Throne": "22%",
            "Psionic Union": "18%",
            "Echo Memory Cult": "5%"
        },
        "India": {
            "Cyber Oracle": "20%",
            "Quantum Throne": "30%",
            "Psionic Union": "40%",
            "Echo Memory Cult": "10%"
        }
    };

    if (sample[country]) {
        return Object.entries(sample[country])
            .map(([key, val]) => `<p><strong>${key}</strong>: ${val}</p>`)
            .join("");
    }

    return "No recorded data for this country.";
}
