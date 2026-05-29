<template>
  <div class="project-container">
    <nav class="projectMenu">
      <ul>
        <li>
          <router-link
            :to="{ name: 'project-main', params: { projectId } }"
            class="projectPage"
          >
            Проект
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'project-comments', params: { projectId } }"
          >
            Комментарии
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'project-photo-progress', params: { projectId } }"
          >
            Фото прогресса
          </router-link>
        </li>
        <li id="userProjects">
          <router-link
            :to="{ name: 'project-profile', params: { projectId } }"
          >
            Профиль
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view
      :project-id="projectId"
      class="project-content"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.params.projectId;
</script>
