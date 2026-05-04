const title = "Statistics";
const url = "/statistics";
let projects;
let users = [];
const content = `
    <article>
            <h2 class="h2ProjectPage">Топ 5 проектов по добавленным крестикам</h2>
            <search>
                <form name="searchForm">
                    <p class="textCenter">
                        <select name="sort" class="sort">
                            <option value="day">за день</option>
                            <option value="week">за неделю</option>
                            <option value="month">за месяц</option>
                        </select>
                    </p>
                </form>
            </search>
            <div class="statisticsGallery" id="topQuantity">
                <div class="statisticsCard">
                    <h3>Название</h3>
                    <p class="statisticsCardDescription">Описание</p>
                    <div class="statisticsImageBox"><img src="images/2248036369a45c1555a433.48884101.jpg" alt="Описание"></div>
                    <p class="statisticsCardAuthor">Автор</p>
                </div>
            </div>
            <h2 class="h2ProjectPage">Ежедневная активность сообщества</h2>
            <div class="imageStatistics"><img src="images/chart.png"></div>
            <h2 class="h2ProjectPage">Топ 5 пользователей по добавленным крестикам</h2>
            <search>
                <form name="searchForm">
                    <p class="textCenter">
                        <select name="sort" class="sort">
                            <option value="day">за день</option>
                            <option value="week">за неделю</option>
                            <option value="month">за месяц</option>
                            <option value="year">за год</option>
                        </select>
                    </p>
                </form>
            </search>
            <div id="topUsersTable"></div>
            <h2 class="h2ProjectPage">Топ 5 пользователей по завершенным проектам</h2>
            <search>
                <form name="searchForm">
                    <p class="textCenter">
                        <select name="sort" class="sort">
                            <option value="week">за неделю</option>
                            <option value="month">за месяц</option>
                            <option value="year">за год</option>
                        </select>
                    </p>
                </form>
            </search>
            <div id="topUsersFinishProjectsTable"></div>
        </article>
`;

async function getProjects() {
    const res = await fetch("/projects");
    const data = await res.json();
    return data;
}
async function getUsers() {
    const res = await fetch("/users");
    return res.json();
}

function getUserLoginByUserId(userId) {
    const user = users.find(user => user.id === userId);
    return user ? user.login : 'Неизвестный пользователь';
}
function renderTopUsers() {
    let topUsersHTML = '<table><thead><tr><th>Имя</th><th>Количество крестиков</th></tr></thead><tbody>';
    users.forEach(item => {
        const randomNumber = Math.floor(Math.random() * 1001) + 50;
        topUsersHTML += `<tr><td>${item.login}</td><td>${randomNumber}</td></tr>`;
    });
    topUsersHTML += '</tbody></table>';
    document.getElementById('topUsersTable').innerHTML = topUsersHTML;
}
function renderTopUsersFinishProjects() {
    let topUsersHTML = '<table><thead><tr><th>Имя</th><th>Количество завершенных работ</th></tr></thead><tbody>';
    users.forEach(item => {
        const randomNumber = Math.floor(Math.random() * 11) + 50;
        topUsersHTML += `<tr><td>${item.login}</td><td>${randomNumber}</td></tr>`;
    });
    topUsersHTML += '</tbody></table>';
    document.getElementById('topUsersFinishProjectsTable').innerHTML = topUsersHTML;
}
    
function render(data, container) {
    const urlParams = new URLSearchParams(window.location.search);
    const article = document.querySelector("article");
    container.innerHTML = "";
    data.forEach((item) => {
        const card = document.createElement("div");
        const firstCrossQuantity = item.progress && item.progress.length > 0
                                    ? item.progress[0].crossQuantity
                                    : 'Нет данных';
        card.className = "statisticsCard";
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.designer}</p>
            <p class="statisticsTop">${firstCrossQuantity} крестиков</p>
            <div class="imageBox"><img src="${item.image}" alt="Описание" onclick="openModal('${item.image}')"></div>
            <p class="cardAuthor">${getUserLoginByUserId(item.userId)}</p>
        `;
        card.addEventListener("click", function(event){                                   
            if (event.target.tagName != "IMG")
                window.location.href = `project.html?id=${item.id}`;
        });
        container.append(card);
    });
}


async function init() {
    projects = await getProjects();
    users = await getUsers();
    const topQuantity = document.getElementById("topQuantity"); 
    render(projects.slice(0, 5), topQuantity);
    renderTopUsers();
    renderTopUsersFinishProjects();
}

export default {title, content, url, init};