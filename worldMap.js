function worldMapInit() {
    const width = 900;
    const height = 520;

    const svg = d3.select("#worldMap")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const projection = d3.geoNaturalEarth1()
        .scale(160)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const tooltip = d3.select("#mapTooltip");
    const infoBox = d3.select("#mapInfo");
    const infoTitle = d3.select("#infoTitle");
    const infoContent = d3.select("#infoContent");

    // ----- Utility: Random percentages that add to 100 -----
    function randomFaithData() {
        let a = Math.random();
        let b = Math.random();
        let c = Math.random();
        let d = Math.random();
        let total = a + b + c + d;
        return {
            "Cyber Oracle": ((a / total) * 100).toFixed(1) + "%",
            "Quantum Throne": ((b / total) * 100).toFixed(1) + "%",
            "Psionic Union": ((c / total) * 100).toFixed(1) + "%",
            "Echo Memory Cult": ((d / total) * 100).toFixed(1) + "%"
        };
    }

    // Store generated data so each country keeps its data consistent
    const countryFaithInfo = {};

    // ----- Load world map -----
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(world => {
            const countries = topojson.feature(world, world.objects.countries).features;

            // Add graticule (latitude/longitude lines)
            svg.append("path")
                .datum(d3.geoGraticule10())
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
                    tooltip.style("display", "block")
                        .style("left", event.pageX + 10 + "px")
                        .style("top", event.pageY + 10 + "px")
                        .html(`<strong>${d.properties.name}</strong>`);
                })
                .on("mouseleave", () => tooltip.style("display", "none"))
                .on("click", function (event, d) {
                    const country = d.properties.name;

                    // ignore Antarctica
                    if (!country || country === "Antarctica") return;

                    // Generate faith data if not already stored
                    if (!countryFaithInfo[country]) {
                        countryFaithInfo[country] = randomFaithData();
                    }

                    const faiths = countryFaithInfo[country];

                    infoTitle.text(country);
                    infoContent.html(`
                        <p><strong>Cyber Oracle:</strong> ${faiths["Cyber Oracle"]}</p>
                        <p><strong>Quantum Throne:</strong> ${faiths["Quantum Throne"]}</p>
                        <p><strong>Psionic Union:</strong> ${faiths["Psionic Union"]}</p>
                        <p><strong>Echo Memory Cult:</strong> ${faiths["Echo Memory Cult"]}</p>
                    `);

                    infoBox.style("display", "block");
                });
        });
}
