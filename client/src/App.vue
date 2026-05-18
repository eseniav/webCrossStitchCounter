<script setup>
// Здесь можно добавить логику компонента
</script>

<template>
  
    <header>
      <nav id="nav">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/gallery">Галерея</router-link></li>
          <li><router-link to="/statistics">Статистика</router-link></li>
        </ul>
        <ul>
          <li id="loginLink"><router-link to="/login">Вход</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer></footer>
    <dialog id="imageModal" aria-labelledby="modalTitle" aria-describedby="modalContent">
      <button class="close-btn" aria-label="Закрыть" onclick="closeModal()">×</button>
      <img id="modalImage" alt="Полное изображение проекта">
    </dialog>
  
</template>

<style scoped>
/* Стили для App.vue */
</style>
