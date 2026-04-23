import gallery from "../pages/gallery.js";
console.log(gallery);

const main = document.getElementById("content");
console.log(main);
const pages = new Map([
    ["home", {title: "Home", content: "Home Page", url: "/home"}],
    ["gallery", gallery],
    ["statistics", {title: "Statistics", content: "Statistics", url: "/statistics"}],
    ["login", {title: "Login", content: "Login", url: "/login"}],
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

navMenu.addEventListener('click', function(event) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    const pageName = url.split("/").pop();
    const page = pages.get(pageName);
    render(page);
    history.pushState(page, event.target.textContent, event.target.href);
});

window.addEventListener("popstate", (event) => {
    if(event.state) {
        main.textContent = event.state.content;
    }
})

initPage();