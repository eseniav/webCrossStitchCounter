<template>
    <article>
      <search>
          <form name="searchForm" @submit.prevent>
              <div class="textCenter">
                  <div class="input-btn-group">
                      <input  class="searchBox" name="searchBox" type="search" placeholder="Поиск..."
                              v-model="searchCriteria.text" @search="handleFilterChange">
                      <button class="searchBtn" @click="onFilterChangeParams">Найти</button>
                  </div>
                  <select name="sort" class="sort" v-model="currentSort" @change="onSortingChangeParams">
                      <option v-for="opt in sortingOptions" :value="opt">{{ opt.value }}</option>                      
                  </select>
              </div>
              <details>
                  <summary>ТЕГИ</summary>
              <fieldset name="tags">
                      <p><label class="allTags">
                        <input type="checkbox"
                              name="allTagsCheckBox"
                              value="all"
                              @change="handleSelectAllTags($event)">
                        выбрать все
                      </label>
                      <label>
                        <input type="checkbox"
                            value="none"
                            @change="handleNoTags($event)">
                        без тегов
                      </label>
                      <template v-for="tag in availableTags" :key="tag">
                        <label>
                          <input type="checkbox"
                                :value="tag"
                                v-model="searchCriteria.tags"
                                @change="handleTagChange()">
                          {{ tag }}
                        </label>
                      </template></p>
              </fieldset>
          </details>
          </form>
      </search>
      <div class="gallery" id="gallery">
          <div class="card" v-for="card in projects" :key="card.id" @click="openProject(card.id, $event)">
            <div class="card-header">
                <h2 class="card-title">{{ card.name }}</h2>
                <img src="/images/noFav.png" alt="Не в избранном">
            </div>              
              <p class="cardDescription">{{ card.designer }}</p>
              <div class="imageBox"><img :src="card.image" alt="Описание" ignore @click="openImage(card.image)"></div>
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
async function getTags() {
    const res = await fetch("/api/tags");
    const data = await res.json();
    return data.map((item) => item.title);
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
function filter(criteria, data) {
    return data.filter(item => {
        return (item.name.toLowerCase().includes(criteria.text.toLowerCase())
        || item.designer.toLowerCase().includes(criteria.text.toLowerCase()))
        && (criteria.tags.length == 0 && !criteria.noTags || (item.tags.some(a => criteria.tags.includes(a)) ||
        (item?.tags?.length == 0 && criteria.noTags)));
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
      searchCriteria: {
        tags: [],
        text: "",
        noTags: null,
      },
      availableTags: []
    }
  },

  computed: {
    sortKey() {
      return this.$route.query.sortKey;
    },
    sortAsc() {
      try {
        return JSON.parse(this.$route.query.sortAsc);
      } catch {
        this.$route.query.sortAsc = true;        
      }      
    },
    searchText() {
      return this.$route.query.filterBy ?? "";
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
      this.projects = sort(this.currentSort, filter(this.searchCriteria, projects));
    },
    setDefaultSorting() {
      this.currentSort = this.sortingOptions[0];
      this.onSortingChangeParams();
    },
    onFilterChangeParams() {
      this.$router.replace({
        path: this.$route.path,
        query: {...this.$route.query, filterBy: this.searchCriteria.text == false ? undefined : this.searchCriteria.text}
      })
    },
    handleFilterChange() {
      this.onFilterChangeParams();
    },
    handleTagChange() {
      this.updateQueryParams();
    },
    updateQueryParams() {
      const query = { ...this.$route.query };

      // Теги в строку через запятую
      if (this.searchCriteria.tags.length > 0) {
        query.tags = this.searchCriteria.tags.join(',');
      } else if (query.tags) {
        delete query.tags;
      }

      // Флаг «без тегов»
      if (this.searchCriteria.noTags) {
        query.noTags = 'true';
      } else if (query.noTags) {
        delete query.noTags;
      }

      // Текст поиска
      if (this.searchCriteria.text) {
        query.filterBy = this.searchCriteria.text;
      } else if (query.filterBy) {
        delete query.filterBy;
      }

      this.$router.replace({ path: this.$route.path, query });
    },

    // Синхронизация с URL при загрузке
    syncTagsFromQuery() {
      const { tags, noTags } = this.$route.query;

      if (tags) {
        this.searchCriteria.tags = tags.split(',');
        // Если есть теги, снимаем «без тегов»
        this.searchCriteria.noTags = false;
      }

      if (noTags === 'true') {
        this.searchCriteria.noTags = true;
        // Если «без тегов», очищаем массив тегов
        this.searchCriteria.tags = [];
      }
    },
    handleSelectAllTags(event) {
    if (event.target.checked) {
      this.searchCriteria.tags = [...this.availableTags];
    } else {
      this.searchCriteria.tags = [];
    }
    // Автоматически снимаем «без тегов», если выбраны какие‑то теги
    this.searchCriteria.noTags = false;
    this.updateQueryParams();
  },

  // Обработка «без тегов»
  handleNoTags(event) {
    this.searchCriteria.noTags = event.target.checked;
    // Если «без тегов» включён, снимаем все остальные теги
    if (event.target.checked) {
      this.searchCriteria.tags = [];
    }
    this.updateQueryParams();
  },
  openProject(projectId, event) {
    if(event.target.hasAttribute("ignore"))
      return;
    this.$router.push({name: "project", params: {projectId}});
  }
  },

  async mounted() {
    this.sortingOptions = addSortOptions(sortOptions);
    if(Object.keys(this.$route.query).length) {
      this.currentSort = this.sortingOptions.find(item => 
      {
        return item.key == this.sortKey && item.asc === this.sortAsc;
      });
      this.searchCriteria.text = this.searchText;
    }
    if(!this.currentSort)
      this.setDefaultSorting();
    [this.availableTags, projects] = await Promise.all([getTags(), getProjects()]);
    this.syncTagsFromQuery();    
    this.handleData(projects);
  },

  watch: {
    '$route.query'(newQuery, oldQuery) {
      this.syncTagsFromQuery();
      this.handleData(projects);
    }
  }
}
</script>
  