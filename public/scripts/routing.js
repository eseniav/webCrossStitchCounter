import gallery from "../pages/gallery.js";
import home from "../pages/home.js";
import statistics from "../pages/statistics.js";
import profile from "../pages/profile.js";
import notFound from "../pages/404.js";

const main = document.getElementById("content");
const routes = [
    { path: "/home", name: "home", component: home },
    { path: "/gallery", name: "gallery", component: gallery },
    { path: "/statistics", name: "statistics", component: statistics },
    { path: "/login", name: "login", component: { title: "Login", content: "Login", url: "/login" } },
    {
        path: "/profile/:userId",
        name: "profile",
        component: profile,
        params: ["userId"]
    }
];
const navMenu = document.getElementById("nav");
const defaultPage = "home";

function render(route) {
    main.innerHTML = route.content;
}

function initPage() {
    navigate(window.location.pathname);
}

function navigate(path, replace) {
    const { route, params } = parseUrl(path);
    render(route.component);
    route.component.init(params);
    const state = JSON.parse(JSON.stringify(route.component));
    const title  = route.component.title;
    if(replace)
        history.replaceState(state, title, path);
    else
        history.pushState(state, title, path);
};
function parseUrl(url) {
    const pathname = url.split("?")[0];

    for (const route of routes) {
        const pattern = route.path.replace(/:\w+/g, "(\\w+)");
        const regex = new RegExp(`^${pattern}$`);
        const match = pathname.match(regex);

        if (match) {
            const params = {};
            if (route.params) {
                route.params.forEach((param, index) => {
                    params[param] = match[index + 1];
                });
            }
            return { route, params };
        }
    }

    return { route: 
        {
            path: null,
            name: "notFound",
            component: notFound
        }, 
        params: {}
    };
}

document.addEventListener('navigation', (event) => {
    navigate(event.detail.path);
})
navMenu.addEventListener('click', function(event) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    if(!url)
        return;
    navigate(url);
});

window.addEventListener("popstate", (event) => {
    if (!event.state)
        return;
    navigate(location.pathname);
})

initPage();