/* ==========================================================
   Liquid Metal Particle Simulation
   — Fully Interactive (Attract + Repel + Flow)
========================================================== */

const canvas = document.getElementById("liquidCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particles = [];
const particleCount = 220;        // Number of liquid particles
const interactionRadius = 140;    // Mouse attraction/repulsion distance
const forceStrength = 0.12;       // How strongly particles react

let mouse = {
    x: null,
    y: null,
    down: false,
    lastX: null,
    lastY: null,
    speed: 0
};

/* ==========================================================
   TRACK MOUSE SPEED (to determine attraction / repulsion)
========================================================== */
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (mouse.lastX !== null) {
        const dx = e.clientX - mouse.lastX;
        const dy = e.clientY - mouse.lastY;
        mouse.speed = Math.sqrt(dx * dx + dy * dy);
    }

    mouse.lastX = e.clientX;
    mouse.lastY = e.clientY;
});

window.addEventListener("mousedown", () => mouse.down = true);
window.addEventListener("mouseup", () => mouse.down = false);

/* ==========================================================
   CREATE PARTICLES
========================================================== */
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.baseX = this.x;
        this.baseY = this.y;

        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;

        this.size = 6 + Math.random() * 4;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2.3
        );
        gradient.addColorStop(0, "rgba(180,220,255,0.85)");
        gradient.addColorStop(1, "rgba(80,150,255,0.05)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Soft boundary bounce
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse Interaction
        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactionRadius) {
                let force = (interactionRadius - dist) / interactionRadius;

                // Repel when mouse moves quickly
                if (mouse.speed > 12) force *= 2.5;

                // Pull toward mouse when mouse is slow
                const directionX = dx / dist;
                const directionY = dy / dist;

                if (mouse.speed > 10) {
                    // Repulsion
                    this.x += directionX * force * 12;
                    this.y += directionY * force * 12;
                } else {
                    // Attraction
                    this.x -= directionX * force * 6;
                    this.y -= directionY * force * 6;
                }
            }
        }
    }
}

/* ==========================================================
   INIT PARTICLES
========================================================== */
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

initParticles();

/* ==========================================================
   ANIMATION LOOP
========================================================== */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Soft glow background
    ctx.fillStyle = "rgba(5, 10, 20, 0.28)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

/* ==========================================================
   HANDLE CANVAS RESIZE
========================================================== */
window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
});

