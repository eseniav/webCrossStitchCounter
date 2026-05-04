const title = "Profile";
const url = `/profile/:userId`;
const content = `
    <article>
        <nav class="projectMenu">
            <ul>
                <li><a class="projectPage">Профиль</a></li>
                <li><a>Личная галерея</a></li>
                <li><a href="admin.html">Избранное</a></li>
            </ul>
        </nav>
    </article>
`;
async function init() {    
    console.log("profile");
}
export default {title, content, url, init};