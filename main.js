function enterWorld() {
    const screen = document.querySelector(".opening-screen");
    const nav = document.getElementById("sideNav");
    const home = document.getElementById("homeContent");

    // Start fade-out animation
    screen.style.transition = "opacity 0.8s ease";
    screen.style.opacity = "0";

    // After fade-out, remove from layout so it stops blocking clicks
    setTimeout(() => {
        screen.style.display = "none";

        // Show navigation + homepage content
        nav.classList.remove("hidden");
        home.classList.remove("hidden");
    }, 800);
}
