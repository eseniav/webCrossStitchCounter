let users = [];
const title = "Gallery";
const url = "/gallery";
const content = `
<article>
    <search>
        <form name="searchForm">
            <div class="textCenter">
                <div class="input-btn-group">
                    <input class="searchBox" name="searchBox" type="search" placeholder="Поиск...">
                    <button class="searchBtn">Найти</button>
                </div>
                <select name="sort" class="sort">
                    <option value="dateAdd_up">по дате добавления &#8593;</option>
                    <option value="dateAdd_down">по дате добавления &#8595;</option>
                    <option value="name_up">по имени &#8593;</option>
                    <option value="name_down">по имени &#8595;</option>
                    <option value="totalCross_up">по количеству крестиков &#8593;</option>
                    <option value="totalCross_down">по количеству крестиков &#8595;</option>
                    <option value="remains_up">по остатку &#8593;</option>
                    <option value="remains_down">по остатку &#8595;</option>
                    <option value="update_up">по дате обновления &#8593;</option>
                    <option value="update_down">по дате обновления &#8595;</option>
                </select>
            </div>
            <details>
                <summary>ТЕГИ</summary>
            <fieldset name="tags">
                    <p><label class="allTags">
                        <input type="checkbox" name="allTagsCheckBox" value="all"> выбрать все
                    </label>
                    <label>
                        <input type="checkbox" value="none"> без тегов
                    </label>
                    <label>
                        <input type="checkbox" value="праздники"> праздники
                    </label>
                    <label>
                        <input type="checkbox" value="животные"> животные
                    </label>
                    <label>
                        <input type="checkbox" value="природа"> природа
                    </label>
                    <label>
                        <input type="checkbox" value="зима"> зима
                    </label>
                    <label>
                        <input type="checkbox" value="люди"> люди
                    </label>
                    <label>
                        <input type="checkbox" value="цветы"> цветы
                    </label>
                    <label>
                        <input type="checkbox" value="новый год"> новый год
                    </label>
                    <label>
                        <input type="checkbox" value="птицы"> птицы
                    </label>
                    <label>
                        <input type="checkbox" value="вода
                        if(a[property] == b[property])"> вода
                    </label>
                    <label>
                        <input type="checkbox" value="лес"> лес
                    </label>
                    <label>
                        <input type="checkbox" value="осень"> осень
                    </label></p>
            </fieldset>
        </details>
        </form>
    </search>
    <div class="gallery" id="gallery">
        <div class="card">
            <h2>Название</h2>
            <p class="cardDescription">Описание</p>
            <div class="imageBox"><img src="images/2248036369a45c1555a433.48884101.jpg" alt="Описание"></div>
            <p class="cardAuthor">Автор</p>
        </div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
    </div>
</article>
`;

async function getProjects() {
    const res = await fetch("/projects");
    const data = await res.json();
    return data;
}

function getUserLoginByUserId(userId) {
    const user = users.find(user => user.id === userId);
    return user ? user.login : 'Неизвестный пользователь';
}

async function getUsers() {
    const res = await fetch("/users");
    return res.json();
}

function render(data, container) {
    container.innerHTML = "";
    data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${item.name}</h2>
                <img src="images/noFav.png" alt="Не в избранном">
            </div>
            <p>${item.designer}</p>
            <div class="imageBox"><img src="${item.image}" alt="Изображение проекта" onclick="openModal('${item.image}')"></div>
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
    const projects = await getProjects();
    users = await getUsers();
    console.log(users);
    const gallery = document.getElementById("gallery");
    render(projects, gallery);
    console.log(projects);
}

export default {title, content, url, init};