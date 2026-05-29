<template>
    <div class="project-container">
      <nav class="projectMenu">
        <ul>
          <li><router-link to="/project" class="projectPage">Проект</router-link></li>
          <li><router-link to="/project/comments">Комментарии</router-link></li>
          <li><router-link to="/project/photo-progress">Фото прогресса</router-link></li>
          <li id="userProjects"><router-link to="/project/profile">Профиль</router-link></li>
        </ul>
      </nav>
      <router-view class="project-content" />
    </div>
  </template>