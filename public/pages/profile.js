const title = "Profile";
const url = `/profile/:userId`;
const content = `
    <article>
        <nav class="projectMenu" id="profileMenu">
            <ul>
                <li><a href="/profile/:userId/overview">Профиль</a></li>
                <li><a href="/profile/:userId/gallery">Личная галерея</a></li>
                <li><a href="/profile/:userId/favorite">Избранное</a></li>
            </ul>
        </nav>
        <div id="main"></div>
    </article>
`;

function initLinks(userId) {
    const profileMenu = document.getElementById("profileMenu");
    const links = profileMenu.querySelectorAll("a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        link.setAttribute("href", href.replace(":userId", userId));
    });
}
async function init(params) {    
    console.log("profile " + params.userId);
    initLinks(params.userId);        
}
export default {title, content, url, init};