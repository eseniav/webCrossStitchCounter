<template>
    <article>
      <search>
          <form name="searchForm">
              <div class="textCenter">
                  <div class="input-btn-group">
                      <input class="searchBox" name="searchBox" type="search" placeholder="Поиск...">
                      <button class="searchBtn">Найти</button>
                  </div>
                  <select name="sort" class="sort" v-model="currentSort" @change="onSortingChangeParams">
                      <option v-for="opt in sortingOptions" :value="opt">{{ opt.value }}</option>                      
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
            <div class="card-header">
                <h2 class="card-title">{{ card.name }}</h2>
                <img src="/images/noFav.png" alt="Не в избранном">
            </div>              
              <p class="cardDescription">{{ card.designer }}</p>
              <div class="imageBox"><img :src="card.image" alt="Описание" @click="openImage(card.image)"></div>
              <p class="cardAuthor">{{ card.userName }}</p>
          </div>          
      </div>
  </article>
</template>
<script>
async function getProjects() {
    const res = await fetch("/api/projects");    
    const data = await res.json();
    return data;
}
function addSortOptions(source) {
  const target = [];
  source.forEach(element => {
    target.push({key: element.key, asc: true, value: element.value + ' ↑'});
    target.push({key: element.key, asc: false, value: element.value + ' ↓'});
  });
  return target;
}
function sort(criteria, data) {
    return data.toSorted((a, b) => {
        if(a[criteria.key] > b[criteria.key])
            return criteria.asc ? -1 : 1;
        if(a[criteria.key] < b[criteria.key])
            return criteria.asc  ? 1 : -1;
        return 0;
    })
}
const sortOptions = [
  {key: "dateAdd", value: "по дате добавления"},
  {key: "name", value: "по имени"},
  {key: "totalCross", value: "по количеству крестиков"},
  {key: "remains", value: "по остатку"},
  {key: "update", value: "по дате обновления"},
];
let projects = [];
export default {
  data() {
    return {
      projects: [],
      sortingOptions: [],
      currentSort: null,
    }
  },

  methods: {
    openImage(path) {
      openModal(path);
    },
    onSortingChangeParams() {      
      this.$router.replace({
        path: this.$route.path,
        query: {...this.$route.query, sortKey: this.currentSort.key, sortAsc: this.currentSort.asc}
      })
    },
    handleData(projects) {
      this.projects = sort(this.currentSort, projects);
    },
  },

  async mounted() {
    this.sortingOptions = addSortOptions(sortOptions);
    this.currentSort = this.sortingOptions[0];
    this.onSortingChangeParams();
    projects = await getProjects();
    this.handleData(projects);
  },

  watch: {
    '$route.query'(newQuery, oldQuery) {
      console.log(newQuery);
      this.handleData(projects);
    }
  }
}
</script>
  