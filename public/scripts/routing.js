import gallery from "../pages/gallery.js";
import home from "../pages/home.js";
import statistics from "../pages/statistics.js";
import profile from "../pages/profile.js";
console.log(gallery);

const main = document.getElementById("content");
console.log(main);
const pages = new Map([
    ["home", home],
    ["gallery", gallery],
    ["statistics", statistics],
    ["login", {title: "Login", content: "Login", url: "/login"}],
    ["profile", profile],
]);
const navMenu = document.getElementById("nav");
const defaultPage = "home";

function render(route) {
    main.innerHTML = route.content;
}

function initPage() {
    const url = window.location.pathname;
    const pageName = url.split("/").pop() || defaultPage;
    const page = pages.get(pageName);
    render(page);
    page.init();
    history.replaceState(JSON.parse(JSON.stringify(page)), page.title, page.url);
}

document.addEventListener('navigation', (event) => {
    const path = event.detail.path;
    const pageName = event.detail.route;
    const page = pages.get(pageName);
    render(page);
    page.init();
    history.pushState(JSON.parse(JSON.stringify(page)), page.title, path);
})
navMenu.addEventListener('click', function(event) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    const pageName = url.split("/").pop();
    const page = pages.get(pageName);
    render(page);
    page.init();
    history.pushState(JSON.parse(JSON.stringify(page)), event.target.textContent, event.target.href);
});

window.addEventListener("popstate", (event) => {
    if (event.state) {
        console.log(event.state);
        const route = event.state.url.split("/")[1];
        const page = pages.get(route);
        main.innerHTML = page.content;
        page.init();
        document.title = page.title;
    }
})

initPage();