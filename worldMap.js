/* ==========================================================
   WORLD MAP — Cyber Faith Global Distribution (Neon Edition)
   Fully compatible with your existing page3.html & style.css
========================================================== */

function worldMapInit() {
    const width = document.getElementById("worldMap").clientWidth;
    const height = 500;

    const svg = d3.select("#worldMap")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("*").remove(); // reset map before drawing again

    const projection = d3.geoNaturalEarth1()
        .scale(width / 6.4)
        .translate([width / 2, height / 1.9]);

    const path = d3.geoPath().projection(projection);

    const tooltip = d3.select("#mapTooltip");
    const infoBox = d3.select("#mapInfo");
    const infoTitle = d3.select("#infoTitle");
    const infoContent = d3.select("#infoContent");

    /* =====================================================
       FUTURE FAITH COLORS (Neon Cyberpunk)
    ===================================================== */
    const FAITH_COLORS = {
        cyber: [74, 0, 255],       // Cyber Oracle — neon purple-blue
        quantum: [255, 215, 0],    // Quantum Throne — bright gold
        psionic: [0, 255, 200],    // Psionic Union — teal green
        echo: [255, 80, 190]       // Echo Memory Cult — pink-magenta
    };

    /* =====================================================
       AUTO GENERATE FAITH DATA FOR ALL COUNTRIES
    ===================================================== */
    function randomFaithProfile() {
        let a = Math.random();
        let b = Math.random();
        let c = Math.random();
        let d = Math.random();
        let sum = a + b + c + d;

        return {
            cyber: Math.round((a / sum) * 100),
            quantum: Math.round((b / sum) * 100),
            psionic: Math.round((c / sum) * 100),
            echo: Math.round((d / sum) * 100)
        };
    }

    /* =====================================================
       RGB COLOR MIXING BASED ON FAITH PROPORTIONS
    ===================================================== */
    function mixColor(profile) {
        const total = profile.cyber + profile.quantum + profile.psionic + profile.echo;

        const r =
            (FAITH_COLORS.cyber[0] * profile.cyber +
            FAITH_COLORS.quantum[0] * profile.quantum +
            FAITH_COLORS.psionic[0] * profile.psionic +
            FAITH_COLORS.echo[0] * profile.echo) / total;

        const g =
            (FAITH_COLORS.cyber[1] * profile.cyber +
            FAITH_COLORS.quantum[1] * profile.quantum +
            FAITH_COLORS.psionic[1] * profile.psionic +
            FAITH_COLORS.echo[1] * profile.echo) / total;

        const b =
            (FAITH_COLORS.cyber[2] * profile.cyber +
            FAITH_COLORS.quantum[2] * profile.quantum +
            FAITH_COLORS.psionic[2] * profile.psionic +
            FAITH_COLORS.echo[2] * profile.echo) / total;

        return `rgb(${r}, ${g}, ${b})`;
    }

    /* =====================================================
       SPECIAL CASES: Arctic & Antarctic
    ===================================================== */
    const SPECIAL_CASES = {
        "Antarctica": {
            title: "Antarctica",
            text: "No humans — No religious data available."
        },
        "Arctic": {
            title: "Arctic",
            text: "No humans — No religious data available."
        }
    };

    /* =====================================================
       LOAD WORLD MAP TOPOJSON
    ===================================================== */
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(world => {
            const countries = topojson.feature(world, world.objects.countries).features;

            /* =====================================================
               Assign faith data to each country
            ===================================================== */
            const countryData = {};
            countries.forEach(c => {
                const name = c.properties.name;
                countryData[name] = randomFaithProfile();
            });

            /* =====================================================
               DRAW GRATICULE (Longitude & Latitude Lines)
            ===================================================== */
            const graticule = d3.geoGraticule();

            svg.append("path")
                .datum(graticule())
                .attr("class", "graticule")
                .attr("d", path);

            /* =====================================================
               DRAW COUNTRIES
            ===================================================== */
            svg.selectAll(".country")
                .data(countries)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", d => {
                    const name = d.properties.name;

                    if (SPECIAL_CASES[name]) return "rgba(180,180,180,0.25)";

                    return mixColor(countryData[name]);
                })
                .on("mousemove", function (event, d) {
                    const name = d.properties.name;
                    tooltip.style("display", "block")
                        .style("left", event.pageX + 15 + "px")
                        .style("top", event.pageY + 15 + "px")
                        .text(name);
                })
                .on("mouseleave", function () {
                    tooltip.style("display", "none");
                })
                .on("click", function (event, d) {
                    const name = d.properties.name;

                    // Reset Info Box for each click
                    infoBox.style("display", "block");

                    if (SPECIAL_CASES[name]) {
                        infoTitle.text(SPECIAL_CASES[name].title);
                        infoContent.html(`<p>${SPECIAL_CASES[name].text}</p>`);
                        return;
                    }

                    const f = countryData[name];

                    infoTitle.text(name);
                    infoContent.html(`
                        <p><strong>Cyber Oracle:</strong> ${f.cyber}%</p>
                        <p><strong>Quantum Throne:</strong> ${f.quantum}%</p>
                        <p><strong>Psionic Union:</strong> ${f.psionic}%</p>
                        <p><strong>Echo Memory Cult:</strong> ${f.echo}%</p>
                    `);
                });
        });
}
