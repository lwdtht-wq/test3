/* ==========================================================
   ADVANCED LIQUID METAL MAP INTERACTION SYSTEM
========================================================== */

const regionColors = {
    north:  "#5ab4ff",
    east:   "#0077ff",
    south:  "#3bc6d4",
    west:   "#7d4bff",
    core:   "#75bfff"
};

/* 清除所有区域 active 状态 */
function clearActiveRegions() {
    document.querySelectorAll(".region").forEach(r => {
        r.classList.remove("active");
    });
}

/* 显示区域信息 + 动画增强 */
function showRegionInfo(regionName) {
    const infoBox = document.getElementById("mapInfo");
    const title = document.getElementById("infoTitle");
    const content = document.getElementById("infoContent");

    clearActiveRegions();
    const selected = document.getElementById(regionName);
    selected.classList.add("active");

    /* 动态改变信息面板边框颜色 */
    infoBox.classList.remove(
        "dynamic-core",
        "dynamic-north",
        "dynamic-east",
        "dynamic-south",
        "dynamic-west"
    );
    infoBox.classList.add("dynamic-" + regionName);

    /* 更新文字内容（你可以继续扩展） */
    const data = {
        north: {
            name: "North Crown",
            faiths: {
                "Cyber Oracle": "42%",
                "Psionic Union": "27%",
                "Quantum Throne": "18%",
                "Echo Memory Cult": "13%"
            }
        },
        east: {
            name: "East Shard",
            faiths: {
                "Quantum Throne": "49%",
                "Cyber Oracle": "31%",
                "Psionic Union": "14%",
                "Echo Memory Cult": "6%"
            }
        },
        south: {
            name: "South Rift",
            faiths: {
                "Psionic Union": "53%",
                "Echo Memory Cult": "22%",
                "Cyber Oracle": "15%",
                "Quantum Throne": "10%"
            }
        },
        west: {
            name: "West Fragment",
            faiths: {
                "Echo Memory Cult": "47%",
                "Cyber Oracle": "26%",
                "Quantum Throne": "19%",
                "Psionic Union": "8%"
            }
        },
        core: {
            name: "Central Core",
            faiths: {
                "Cyber Oracle": "35%",
                "Quantum Throne": "35%",
                "Psionic Union": "20%",
                "Echo Memory Cult": "10%"
            }
        }
    };

    title.textContent = data[regionName].name;

    let html = "";
    for (let f in data[regionName].faiths) {
        html += `<p><strong>${f}</strong>: ${data[regionName].faiths[f]}</p>`;
    }
    content.innerHTML = html;

    infoBox.style.display = "block";
    infoBox.style.borderColor = regionColors[regionName];
    infoBox.style.boxShadow = `0 0 20px ${regionColors[regionName]}55`;
}

