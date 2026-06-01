<template>
  <div>
    <div class="projectParams">
                <div class="imgSection">
                    <img :src="project.image" alt="" @click="openImage(project.image)">
                    <div class="userProjectPage">{{project.login}}</div>
                    <div class="tagsContainer">
                      <div class="tag" v-for="tag in project.tags" :key="tag">
                        {{tag}}
                      </div>
                    </div>
                </div>
                <div class="infoSection">
                    <h2 class="h2ProjectPage">О проекте</h2>
                    <ul>
                        <li>
                            <span class="propName">Автор дизайна:</span>
                            <span class="propValue">{{project.designer}}</span>
                        </li>
                        <li>
                            <span class="propName">Размер:</span>
                            <span class="propValue">{{project.width}} × {{project.height}}</span>
                        </li>
                        <li>
                            <span class="propName">Всего крестиков:</span>
                            <span class="propValue">{{project.totalCross}}</span>
                        </li>
                        <li>
                            <span class="propName">Вышито до регистрации:</span>
                            <span class="propValue">{{project.stitchedCrossBeforeRegistration}}</span>
                        </li>
                        <li>
                            <span class="propName">Дата начала:</span>
                            <span class="propValue">{{project.startDate}}</span>
                        </li>
                        <li>
                            <span class="propName">Планируется вышить к:</span>
                            <span class="propValue">{{project.finishDreamDate}}</span>
                        </li>
                    </ul>
                    <h2 class="h2ProjectPage">Статистика</h2>
                    <ul>
                        <li>
                            <span class="propName">Вышито:</span>
                            <span class="propValue">{{project.stitchedVal}}</span>
                        </li>
                        <li>
                            <span class="propName">Осталось:</span>
                            <span class="propValue">{{project.remains}}</span>
                        </li>
                        <li>
                            <span class="propName">Средняя скорость:</span>
                            <span class="propValue">{{project.avgSpeedVal}} кр./день</span>
                        </li>
                        <li>
                            <span class="propName">Прогноз окончания:</span>
                            <span class="propValue">{{project.prognosisVal}}</span>
                        </li>
                        <li>
                            <span class="propName">Вышито в процентах:</span>
                            <span class="propValue">{{project.procent}}%</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="progressBar">
                <div class="progressValue" :style="{width: project.procent + '%'}">
                    {{project.procent}}%
                </div>                                
            </div>
            <h2 class="h2ProjectPage">Прогресс</h2>
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>За день</th>
                        <th>Вышито</th>
                        <th>Осталось</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="progressItem in project.progress" :key="progressItem.date">
                    <td>{{progressItem.date}}</td>
                    <td>{{progressItem.crossQuantity}}</td>
                    <td>{{progressItem.done}}</td>
                    <td>{{progressItem.remains}}</td>
                  </tr>
                </tbody>
            </table>
          </div>
</template>

<script>
async function getProject(projectId) {
    const res = await fetch(`/api/project/${projectId}`);
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
        project: {},
        users: [],
        }
    },

  methods: {
    openImage(path) {
      openModal(path);
    },
  },
  computed: {
    projectId(){return this.$route.params.projectId}
  },

  async mounted() {
    this.project = await getProject(this.projectId);
    console.log(this.project);
  }
}
</script>
