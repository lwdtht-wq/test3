function worldMapInit() {
    const width = 900;
    const height = 520;

    const svg = d3.select("#worldMap")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoNaturalEarth1()
        .scale(170)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const tooltip = document.getElementById("mapTooltip");
    const infoBox = document.getElementById("mapInfo");
    const infoTitle = document.getElementById("infoTitle");
    const infoContent = document.getElementById("infoContent");

    // ⬇ 全新的未来宗教数据（你指定的四个国家 + 中国）
    const religionData = {
        "China": {
            title: "China – Eastern Nexus",
            data: {
                "Cyber Oracle Network": "33%",
                "Quantum Throne Sect": "27%",
                "Psionic Union": "22%",
                "Echo Memory Cult": "18%"
            }
        },
        "United States": {
            title: "United States – Western Singularity Zone",
            data: {
                "Cyber Oracle Network": "41%",
                "Quantum Throne Sect": "32%",
                "Psionic Union": "15%",
                "Echo Memory Cult": "12%"
            }
        },
        "India": {
            title: "India – Southern Resonance Field",
            data: {
                "Cyber Oracle Network": "22%",
                "Quantum Throne Sect": "18%",
                "Psionic Union": "40%",
                "Echo Memory Cult": "20%"
            }
        },
        "Brazil": {
            title: "Brazil – Amazonian Echo Domain",
            data: {
                "Cyber Oracle Network": "28%",
                "Quantum Throne Sect": "24%",
                "Psionic Union": "26%",
                "Echo Memory Cult": "22%"
            }
        },
        "Germany": {
            title: "Germany – Central Quantum Loop",
            data: {
                "Cyber Oracle Network": "38%",
                "Quantum Throne Sect": "33%",
                "Psionic Union": "14%",
                "Echo Memory Cult": "15%"
            }
        }
    };

    // Draw map
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(worldData => {
            const countries = topojson.feature(worldData, worldData.objects.countries).features;

            // Draw graticule (经纬线)
            const graticule = d3.geoGraticule();
            svg.append("path")
                .attr("class", "graticule")
                .attr("d", path(graticule()));

            // Draw all countries
            svg.selectAll(".country")
                .data(countries)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", "rgba(90,110,150,0.4)")
                .attr("stroke", "#4af1ff88")
                .attr("stroke-width", 1)

                // Hover tooltip
                .on("mousemove", function (event, d) {
                    const name = d.properties.name;
                    tooltip.style.display = "block";
                    tooltip.style.left = event.pageX + 12 + "px";
                    tooltip.style.top = event.pageY + 12 + "px";
                    tooltip.innerHTML = name;
                })
                .on("mouseleave", function () {
                    tooltip.style.display = "none";
                })

                // CLICK — Show country info (✨ FIXED!)
                .on("click", function (event, d) {
                    const name = d.properties.name;  // ← 保证每次点击都能读取正确国家名

                    infoBox.style.display = "block";

                    if (religionData[name]) {
                        // Title
                        infoTitle.innerHTML = religionData[name].title;

                        // Body
                        let html = "";
                        const block = religionData[name].data;
                        for (let faith in block) {
                            html += `<p><strong>${faith}</strong>: ${block[faith]}</p>`;
                        }
                        infoContent.innerHTML = html;
                    } else {
                        // Countries without data
                        infoTitle.innerHTML = name;
                        infoContent.innerHTML = "No projected techno-faith data available.";
                    }
                });
        });
}
