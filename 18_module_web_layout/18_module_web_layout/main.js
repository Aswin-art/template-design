function main() {
    const toggle = document.getElementById("toggle");
    const navItems = document.getElementById("nav-items");

    toggle.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            navItems.classList.add("visible");
            navItems.classList.remove("invisible"); 
            return;
        }

        navItems.classList.add("invisible");
        navItems.classList.remove("visible")
    })
}

window.onload = main