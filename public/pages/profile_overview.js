let user;
export default {
    title: "Обзор профиля",
    content: 
    `
    <div id="subrouteContent">
        <h1>Профиль <span data-text="user.login"></span></h1>
        <div class="profile-layout">
            <div class="projects-table-container">
            <table id="currentTable">
                <thead>
                    <tr class="header-row">
                    <th colspan="4" class="project-header">
                        <div class="centered-header">
                            <h2 class="h2ProjectPage">Текущие проекты</h2>
                            <a href="addProject.html">
                                <img src="/svg/add.svg" class="add-icon">
                            </a>
                        </div>
                    </th>
                    </tr>
                    <tr>
                    <th>Название</th>
                    <th>Размер</th>
                    <th>Дата начала</th>
                    <th>Планируется вышить к</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="profile-info-container">
            <div class="imgSection">
                <img data-src="user.image" src="/svg/vyshivka.svg" alt="">
            </div>
            <div class="userSection">
                <ul class="unmarked-list">
                <li>
                        <span class="propValue" data-text="user.login"></span>
                    </li>
                    <li>
                        <span class="propName">Имя:</span>
                        <span class="propValue" data-text="user.userName"></span>
                    </li>
                    <li>
                        <span class="propName">Дата регистрации:</span>
                        <span class="propValue" data-text="user.registrationDate"></span>
                    </li>
                    <li>
                        <span class="propName">Город:</span>
                        <span class="propValue"><span data-text="user.city"></span>, <span data-text="user.country"></span></span>
                    </li>
                    <li>
                        <span class="propName">Возраст:</span>
                        <span class="propValue" data-text="user.birthDate"></span>
                    </li>
                </ul>
            </div>
        </div>
            </div>
            `,
    url: "/profile/:userId/overview",
    init: async function(params) {
        const options = new URLSearchParams({userId: params.userId});
        const res = await fetch(`/user?${options}`);
        const resProjects = await fetch(`/projects?${new URLSearchParams({userId: params.userId})}`);
        user = await res.json();
        const project = await resProjects.json();
        const content = document.getElementById("subrouteContent");
        const table = document.getElementById("currentTable");
        populateData(content, {user});
        populateProjects(table, project);
    }
};
function populateData(container, data) {
    const elements = container.querySelectorAll('[data-text]');
    elements.forEach(element => {
        const path = element.dataset.text;
        const [object, prop] = path.split(".");
        element.textContent = data[object][prop];
    });
    const images = container.querySelectorAll('[data-src]');
    images.forEach(element => {
        const path = element.dataset.src;
        const [object, prop] = path.split(".");
        element.src = data[object][prop];
    });
}

function populateProjects(table, projects) {
    let currentProjects = '';
        projects.forEach(item => {
        currentProjects += `
            <tr>
            <td class="td-center">${item.name}</td>
            <td class="td-center">${item.width} × ${item.height}</td>
            <td class="td-center">${item.startDate}</td>
            <td class="td-center">${item.finishDreamDate}</td>
            <td><div class="progressBar">
                    <div class="progressValue" style="width:${item.procent}%">
                        ${item.procent}%                 
                    </div>                                
                </div></td>
            </tr>
        `;
    });
    table.insertAdjacentHTML("beforeend", currentProjects);
}