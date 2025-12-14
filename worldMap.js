function worldMapInit() {
    const width = 900;
    const height = 520;

    const svg = d3.select("#worldMap")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoNaturalEarth1()
        .scale(165)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const tooltip = document.getElementById("mapTooltip");
    const infoBox = document.getElementById("mapInfo");
    const infoTitle = document.getElementById("infoTitle");
    const infoContent = document.getElementById("infoContent");

    /* ===============================
       Techno-Faith Data
    =============================== */
    const religionData = {
        "China": {
            title: "China — Eastern Nexus",
            data: {
                "Cyber Oracle Network": "33%",
                "Quantum Throne Sect": "27%",
                "Psionic Union": "22%",
                "Echo Memory Cult": "18%"
            }
        },
        "United States": {
            title: "United States — Western Singularity Zone",
            data: {
                "Cyber Oracle Network": "41%",
                "Quantum Throne Sect": "32%",
                "Psionic Union": "15%",
                "Echo Memory Cult": "12%"
            }
        },
        "India": {
            title: "India — Southern Resonance Field",
            data: {
                "Cyber Oracle Network": "22%",
                "Quantum Throne Sect": "18%",
                "Psionic Union": "40%",
                "Echo Memory Cult": "20%"
            }
        },
        "Brazil": {
            title: "Brazil — Amazonian Echo Domain",
            data: {
                "Cyber Oracle Network": "28%",
                "Quantum Throne Sect": "24%",
                "Psionic Union": "26%",
                "Echo Memory Cult": "22%"
            }
        },
        "Germany": {
            title: "Germany — Central Quantum Loop",
            data: {
                "Cyber Oracle Network": "38%",
                "Quantum Throne Sect": "33%",
                "Psionic Union": "14%",
                "Echo Memory Cult": "15%"
            }
        }
    };

    /* ===============================
       LOAD WORLD MAP
    =============================== */
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(worldData => {
            const countries = topojson.feature(worldData, worldData.objects.countries).features;

            // Draw graticule (经纬线)
            const graticule = d3.geoGraticule();
            svg.append("path")
                .attr("class", "graticule")
                .attr("d", path(graticule()));

            // Draw countries
            svg.selectAll(".country")
                .data(countries)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", "rgba(90,110,150,0.4)")
                .attr("stroke", "#4af1ff88")
                .attr("stroke-width", 1)

                /* Hover tooltip */
                .on("mousemove", (event, d) => {
                    const name = d.properties.name;
                    tooltip.style.display = "block";
                    tooltip.style.left = event.pageX + 12 + "px";
                    tooltip.style.top = event.pageY + 12 + "px";
                    tooltip.innerHTML = name;
                })
                .on("mouseleave", () => {
                    tooltip.style.display = "none";
                })

                /* CLICK COUNTRY — 100% FIXED */
                .on("click", (event, d) => {
                    const name = d.properties.name;

                    infoBox.style.display = "block";

                    if (religionData[name]) {
                        infoTitle.textContent = religionData[name].title;

                        let html = "";
                        for (let faith in religionData[name].data) {
                            html += `<p><strong>${faith}</strong>: ${religionData[name].data[faith]}</p>`;
                        }
                        infoContent.innerHTML = html;
                    } else {
                        infoTitle.textContent = name;
                        infoContent.textContent = "No techno-faith projection available.";
                    }
                });
        });
}
