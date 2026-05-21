<template>
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
                <div class="statisticsCard" v-for="card in projects" :key="card.id">
                  <div class="card-header">
                    <h3 class="card-title">{{ card.name }}</h3>
                    <img src="/images/noFav.png" alt="Не в избранном">
                  </div>
                    <p class="statisticsCardDescription">{{ card.designer }}</p>
                    <p class="statisticsTop">{{ card.stitchedVal }} крестиков</p>
                    <div class="statisticsImageBox"><img :src="card.image" alt="Описание"></div>
                    <p class="statisticsCardAuthor">{{ card.userName }}</p>
                </div>
            </div>
            <h2 class="h2ProjectPage">Ежедневная активность сообщества</h2>
            <div class="imageStatistics"><img src="../../public/images/chart.png"></div>
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
            <table class="usersTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Логин</th>
                  <th>Завершённых проектов</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.login }}</td>
                  <td>{{ user.finishedProjects }}</td>
                </tr>
              </tbody>
            </table>            
            <div id="topUsersFinishProjectsTable"></div>
        </article>
</template>
<script>
async function getProjects() {
    const res = await fetch("/api/projects");
    console.log(res);
    const data = await res.json();
    return data;
}
async function getUsers() {
    const res = await fetch("/api/users");
    return res.json();
}
export default {
  data() {
    return {
      projects: [],
      users: [],
    }
  },

  methods: {
    increment() {
      
    }
  },

  async mounted() {    
    this.projects = await getProjects();
    this.users = await getUsers();
    console.log(this.projects);
  }
}
</script>