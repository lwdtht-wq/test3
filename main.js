/* ==========================================================
   GLOBAL INTERACTION / 全站交互控制
========================================================== */

/* ========== 首页 Opening Screen ========== */

function enterWorld() {
    const opening = document.querySelector(".opening-screen");
    const nav = document.getElementById("mainNav");
    const home = document.querySelector(".home-section");

    // 添加淡出动画
    opening.style.transition = "1.2s";
    opening.style.opacity = "0";

    setTimeout(() => {
        opening.style.display = "none";
        nav.classList.remove("hidden");
        home.classList.remove("hidden");

        nav.style.opacity = 1;
        home.style.opacity = 1;
    }, 1200);
}

/* ========== 页面淡入效果 ========== */
document.addEventListener("DOMContentLoaded", () => {
    const panels = document.querySelectorAll(".page-panel, .story-text");

    panels.forEach(panel => {
        panel.style.opacity = 0;
        panel.style.transform = "translateY(30px)";
    });

    setTimeout(() => {
        panels.forEach(panel => {
            panel.style.transition = "1.2s ease-out";
            panel.style.opacity = 1;
            panel.style.transform = "translateY(0)";
        });
    }, 600);
});


/* ==========================================================
   PAGE 3 · 虚构世界地图交互
========================================================== */

function showRegionInfo(regionName) {
    const infoBox = document.getElementById("mapInfo");
    const title = document.getElementById("infoTitle");
    const content = document.getElementById("infoContent");

    // 根据区域名加载宗教数据
    const regionData = {
        "north": {
            name: "北境区 · North Dominion",
            faiths: {
                "赛博先知教（Cyber Oracle）": "42%",
                "灵能融合派（Psionic Union）": "27%",
                "量子圣庭（Quantum Throne）": "18%",
                "记忆回响教（Echo Memory Cult）": "13%"
            }
        },
        "east": {
            name: "东光区 · East Luminance",
            faiths: {
                "量子圣庭（Quantum Throne）": "46%",
                "赛博先知教（Cyber Oracle）": "30%",
                "灵能融合派（Psionic Union）": "19%",
                "记忆回响教（Echo Memory Cult）": "5%"
            }
        },
        "south": {
            name: "南域区 · South Alloy Basin",
            faiths: {
                "灵能融合派（Psionic Union）": "51%",
                "记忆回响教（Echo Memory Cult）": "29%",
                "量子圣庭（Quantum Throne）": "14%",
                "赛博先知教（Cyber Oracle）": "6%"
            }
        },
        "west": {
            name: "西原区 · West Iron Frontier",
            faiths: {
                "记忆回响教（Echo Memory Cult）": "43%",
                "赛博先知教（Cyber Oracle）": "28%",
                "量子圣庭（Quantum Throne）": "21%",
                "灵能融合派（Psionic Union）": "8%"
            }
        }
    };

    const data = regionData[regionName];

    title.innerText = data.name;

    // 构建设HTML字符串
    let html = "";
    for (let faith in data.faiths) {
        html += `<p>${faith}：<b>${data.faiths[faith]}</b></p>`;
    }

    content.innerHTML = html;
    infoBox.style.display = "block";
}


/* ==========================================================
   PAGE 4 · 液态金属模拟（占位，实际脚本写在 page4.html 内）
========================================================== */

// 这里无需写代码，真正的液态模拟在 page4.html 内运行
// 保留接口，便于未来扩展


/* ==========================================================
   Cursor Liquid Light / 鼠标流动光
========================================================== */

document.addEventListener("mousemove", (e) => {
    const ripple = document.querySelector(".ripple");
    if (ripple) {
        ripple.style.left = e.clientX + "px";
        ripple.style.top = e.clientY + "px";
    }
});
