<template>
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
          <div class="card" v-for="card in projects" :key="card.id">
              <h2>{{ card.name }}</h2>
              <p class="cardDescription">{{ card.designer }}</p>
              <div class="imageBox"><img :src="card.image" alt="Описание"></div>
              <p class="cardAuthor">{{ card.userName }}</p>
          </div>          
      </div>
  </article>
</template>
<script>
async function getProjects() {
    const res = await fetch("/api/projects");
    console.log(res);
    const data = await res.json();
    return data;
}
export default {
  data() {
    return {
      projects: [],
    }
  },

  methods: {
    
  },

  async mounted() {    
    this.projects = await getProjects();
    console.log(this.projects);
  }
}
</script>
  