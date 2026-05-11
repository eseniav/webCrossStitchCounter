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
        params: ["userId"],
        abstract: true
    },
    {
        path: "/profile/:userId/overview",
        name: "profileOverview",
        component: profileOverview,
        params: ["userId"],
        parent: "profile",
        default: true
    },
    {
        path: "/profile/:userId/gallery",
        name: "profileGallery",
        component: profileGallery,
        params: ["userId"],
        parent: "profile",
    },
    {
        path: "/profile/:userId/favorite",
        name: "profileFavorite",
        component: profileFavorite,
        params: ["userId"],
        parent: "profile",
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
    if(parsed.length == 1 && route.abstract) {        
        const defaultSubroute = routes.find((item) => {
           return item?.parent == route.name && item.default;
        })
        
        let subroutePath = defaultSubroute.path;

        Object.keys(params).forEach(paramName => {
            const paramValue = params[paramName];
            subroutePath = subroutePath.replace(`:${paramName}`, paramValue);
        });

        return mountRoute(subroutePath);
    }
    render(content, route.component);
    route.component.init(params);
    if(parsed.length > 1) {
        const main = document.getElementById("main");
        const subroute = parsed[1].route;
        render(main, subroute.component);
    }
    return [route, path];
}

function navigate(url, replace) {
    const [route, path] = mountRoute(url);
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
})

initPage();