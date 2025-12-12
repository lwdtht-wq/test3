const canvas = document.getElementById("liquidMetalCanvas");
if (canvas) {

const ctx = canvas.getContext("2d");
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const nodes = [];
const count = 120;

for (let i = 0; i < count; i++) {
    nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2
    });
}

function animate() {
    ctx.clearRect(0,0,w,h);

    for (let n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "#4af1ff55";
        ctx.shadowColor = "#4af1ff";
        ctx.shadowBlur = 8;
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < count; i++) {
        for (let j = i+1; j < count; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);

            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(74, 241, 255, ${(120 - dist) / 120})`;
                ctx.lineWidth = 1.5;
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();

}
