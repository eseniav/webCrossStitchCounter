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
                <div class="statisticsCard">
                    <h3>Название</h3>
                    <p class="statisticsCardDescription">Описание</p>
                    <div class="statisticsImageBox"><img src="../../images/2248036369a45c1555a433.48884101.jpg" alt="Описание"></div>
                    <p class="statisticsCardAuthor">Автор</p>
                </div>
            </div>
            <h2 class="h2ProjectPage">Ежедневная активность сообщества</h2>
            <div class="imageStatistics"><img src="../../images/chart.png"></div>
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