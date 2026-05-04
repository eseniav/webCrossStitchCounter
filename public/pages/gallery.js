let users = [];
let projects;
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

function goToProfile(userId) {
    document.dispatchEvent(new CustomEvent("navigation", {
        bubbles: true,
        cancelable: true,
        detail: {route: "profile", path: `/profile/${userId}`}
    }))
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
            <div class="imageBox"><img src="${item.image}" alt="Изображение проекта" onclick="openModal('${item.image}')" data-action></div>
            <p class="cardAuthor" data-action="profile">${getUserLoginByUserId(item.userId)}</p>
        `;
        card.addEventListener("click", function(event){
            if(event.target.dataset.action == "profile") {
                goToProfile(item.userId);
                return;
            }
            if (!event.target.hasAttribute("data-action"))
                window.location.href = `project.html?id=${item.id}`;
        });
        container.append(card);
    }); 
}

async function init() {
    projects = await getProjects();
    users = await getUsers();
    console.log(users);
    const gallery = document.getElementById("gallery");
    render(projects, gallery);
    setListeners();
    console.log(projects);
}

function setListeners() {
    document.searchForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const text = event.target.searchBox.value.trim();
        const noTags = event.target.tags.querySelector("[value='none']").checked;
        const tags = Array.from(event.target.tags.elements).slice(2)
            .filter(item => item.checked)
            .map(item => item.value);
        const searchCriteria = {
            tags,
            text,
            noTags,
        };
        const searchResult = filter(searchCriteria, projects);
        const [property, direction] = event.target.sort.value.split("_");
        const sortCriteria = {property, direction};
        const sortResult = sort(sortCriteria, searchResult);
        render(sortResult, gallery);
    });
    document.searchForm.tags.addEventListener("click", event => {
        const target =  event.target.tagName == "LABEL" ? event.target.children[0] : event.target;
        if (target.name == "allTagsCheckBox") {
            Array.from(event.currentTarget.elements).forEach(item => {
            item.checked = target.checked;
            })
        } else if (!target.checked) {
            target.form.allTagsCheckBox.checked = false;
        } else {                    
            event.target.form.allTagsCheckBox.checked = 
                Array.from(target.form.tags.elements).slice(1).every(item => item.checked);
        }
        const submit = new Event("submit", {cancelable: true});
        target.form.dispatchEvent(submit);
    })
    document.searchForm.sort.addEventListener("change", event => {
        const submit = new Event("submit", {cancelable: true});
        event.target.form.dispatchEvent(submit);
    })
}

function sort(criteria, data) {
    return data.sort((a, b) => {
        if(a[criteria.property] > b[criteria.property])
            return criteria.direction == "up" ? -1 : 1;
        if(a[criteria.property] < b[criteria.property])
            return criteria.direction == "up" ? 1 : -1;
        return 0;
    })
}
function filter(criteria, data) {
    return data.filter(item => {
        return (item.name.toLowerCase().includes(criteria.text.toLowerCase())
        || item.designer.toLowerCase().includes(criteria.text.toLowerCase()))
        && (criteria.tags.length == 0 && !criteria.noTags || (item.tags.some(a => criteria.tags.includes(a)) ||
        (item?.tags?.length == 0 && criteria.noTags)));
    })
}
export default {title, content, url, init};