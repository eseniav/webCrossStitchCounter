import gallery from "../pages/gallery.js";
import home from "../pages/home.js";
import statistics from "../pages/statistics.js";
import profile from "../pages/profile.js";
import notFound from "../pages/404.js";
import profileOverview from "../pages/profile_overview.js";
import profileGallery from "../pages/profile_gallery.js";
import profileFavorite from "../pages/profile_favorite.js";

const content = document.getElementById("content");
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
    },
    {
        path: "/profile/:userId/overview",
        name: "profileOverview",
        component: profileOverview,
        params: ["userId"]
    },
    {
        path: "/profile/:userId/gallery",
        name: "profileGallery",
        component: profileGallery,
        params: ["userId"]
    },
    {
        path: "/profile/:userId/favorite",
        name: "profileFavorite",
        component: profileFavorite,
        params: ["userId"]
    },
];
const navMenu = document.getElementById("nav");
const defaultPage = "home";

function render(container, route) {
    container.innerHTML = route.content;
}

function initPage() {
    navigate(window.location.pathname);
}

function mountRoute(path) {
    const parsed = parseUrl(path);
    const { route, params } = parsed[0];
    render(content, route.component);
    route.component.init(params);
    if(parsed.length > 1) {
        const main = document.getElementById("main");
        const subroute = parsed[1].route;
        console.log(main);
        render(main, subroute.component);
    }
    return route;
}

function navigate(path, replace) {
    const route = mountRoute(path);
    const state = JSON.parse(JSON.stringify(route.component));
    const title  = route.component.title;
    if(replace)
        history.replaceState(state, title, path);
    else
        history.pushState(state, title, path);
};

function parseUrl(url) {
    const pathname = url.split("?")[0];
    const matches = [];

    for (const route of routes) {
        const pattern = route.path.replace(/:\w+/g, "(\\w+)");
        const regex = new RegExp(`^${pattern}`);
        const match = pathname.match(regex);
        console.log(match);
        if (match) {
            const params = {};
            if (route.params) {
                route.params.forEach((param, index) => {
                    params[param] = match[index + 1];
                });
            }
            matches.push({ route, params });
        }
    }
    console.log(matches);
    if (matches.length != 0) {
        return matches;
    }

    return [{ route: 
        {
            path: null,
            name: "notFound",
            component: notFound
        }, 
        params: {}
    }];
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
    mountRoute(location.pathname);
    //navigate(location.pathname);
})

initPage();