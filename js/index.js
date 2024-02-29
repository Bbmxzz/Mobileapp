const container = document.querySelector(".container");
const inputs = document.querySelector(".form-box input[type = 'password']");
const icons = [ ... document.querySelectorAll(".form-icon")];
const spans = [ ... document.querySelectorAll(".form-control p span")];
const section = document.querySelector("section");

spans.map((span) => {
    span.addEventListener("click", (e) => {
        const color = e.target.dataset.id;
        container.classList.toggle("active");
        section.classList.toggle("active");
        document.querySelector(":root").computedStyleMap.setProperty("--custom", color);
    });
});